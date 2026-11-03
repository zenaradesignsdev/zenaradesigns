#!/usr/bin/env python3
"""
UserPromptSubmit hook (zenaradesigns repo only): Google Search Console + Keyword Planner.

When a prompt mentions one of these services, check its session with the project CLI:
  - active   -> tell Claude it can use the CLI right away
  - login    -> both CLIs share one gcloud login, so open ONE Google sign-in page in the user's
                browser (detached, at most once every 4 minutes) and tell Claude to wait for it
  - setup    -> pass the reason to Claude (e.g. service account not yet added to Google Ads)

Everything printed to stdout becomes context for Claude. Prompts that mention neither service
return instantly and print nothing. No tokens are printed or stored; the only state files are
timestamps under $TMPDIR/zenara-google/.
"""
import json
import os
import re
import subprocess
import sys
import time

SERVICES = [
    {
        "key": "gsc",
        "label": "Google Search Console",
        "cli": "scripts/gsc/gsc",
        "skill": ".claude/skills/gsc/SKILL.md",
        "commands": "reads: status, site, query, compare, sitemaps, sitemap, inspect; writes: submit-sitemap, delete-sitemap",
        "trigger": re.compile(
            r"search[\s-]*console|\bgsc\b|webmaster|\bimpressions?\b|click[\s-]*through|\bctr\b|"
            r"\bindex(ed|ing)\b|\bdeindex|\bsitemaps?\b|\brankings?\b|\branking for\b|\bserps?\b|"
            r"\bseo (data|numbers|performance|report|opportunit)|organic (traffic|search|clicks)", re.I),
    },
    {
        "key": "gads",
        "label": "Google Ads Keyword Planner",
        "cli": "scripts/gads/gads",
        "skill": ".claude/skills/keyword-planner/SKILL.md",
        "commands": "read-only: status, accounts, geo, ideas, volume, history, opportunities",
        "trigger": re.compile(
            r"keyword[\s-]*planner|\bgads\b|google[\s-]*ads|keyword[\s-]*(research|ideas?|volumes?|data|"
            r"difficulty|opportunit|gap|list)|search[\s-]*volumes?|monthly[\s-]*searches|how many (people )?search|"
            r"\bcpc\b|cost[\s-]*per[\s-]*click|top[\s-]*of[\s-]*page[\s-]*bid|seasonality|\bseo (opportunit)", re.I),
    },
]
OK_TTL = 10 * 60
LOGIN_COOLDOWN = 4 * 60


def main():
    try:
        data = json.load(sys.stdin)
    except ValueError:
        return 0
    prompt = data.get("prompt") or ""
    hits = [s for s in SERVICES if s["trigger"].search(prompt)]
    if not hits:
        return 0

    root = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()
    state = os.path.join(os.environ.get("TMPDIR") or "/tmp", "zenara-google")
    os.makedirs(state, exist_ok=True)
    login_file = os.path.join(state, "login-started")
    login_log = os.path.join(state, "login.log")
    now = time.time()

    def fresh(path, ttl):
        return os.path.exists(path) and now - os.path.getmtime(path) < ttl

    def touch(path):
        with open(path, "a"):
            os.utime(path, None)

    lines, needs_login = [], []
    for s in hits:
        cli = os.path.join(root, s["cli"])
        if not os.path.exists(cli):
            continue
        usage = "Project CLI: %s (%s). Workflow guide: %s." % (s["cli"], s["commands"], s["skill"])
        ok_file = os.path.join(state, s["key"] + "-ok")
        if fresh(ok_file, OK_TTL):
            lines.append("%s access is active (verified in the last 10 minutes). %s" % (s["label"], usage))
            continue
        try:
            r = subprocess.run([sys.executable, cli, "status", "--quiet"], capture_output=True, text=True,
                               timeout=20 if len(hits) == 1 else 11, stdin=subprocess.DEVNULL)
            code, detail = r.returncode, " ".join((r.stdout + r.stderr).split())
        except subprocess.TimeoutExpired:
            code, detail = 4, "the status check timed out"
        if code == 0:
            touch(ok_file)
            lines.append("%s access is active: %s %s" % (s["label"], detail, usage))
            continue
        if os.path.exists(ok_file):
            os.remove(ok_file)
        if code == 2:
            needs_login.append(s)
            lines.append("%s access is waiting on a Google sign-in (the gcloud login for admin@zenaradesigns.com "
                         "is missing or expired). `%s status --wait 240` waits for the sign-in and exits 0 when "
                         "access works. %s" % (s["label"], s["cli"], usage))
        else:
            lines.append("%s access check failed (exit %d): %s `%s status` shows details. %s"
                         % (s["label"], code, detail or "no detail.", s["cli"], usage))

    if needs_login:
        if fresh(login_file, LOGIN_COOLDOWN):
            lines.append("A Google sign-in page was already opened in the user's browser %d seconds ago; one "
                         "sign-in covers both Search Console and Keyword Planner." % (now - os.path.getmtime(login_file)))
        else:
            cli = os.path.join(root, needs_login[0]["cli"])
            with open(login_log, "w") as log:
                subprocess.Popen([sys.executable, cli, "login"], cwd=root, stdin=subprocess.DEVNULL,
                                 stdout=log, stderr=subprocess.STDOUT, start_new_session=True)
            touch(login_file)
            lines.append("The project hook just opened a Google sign-in page for admin@zenaradesigns.com in the "
                         "user's browser; one sign-in covers both Search Console and Keyword Planner. If no browser "
                         "window appeared, the sign-in URL is in %s." % login_log)

    if lines:
        print("\n".join(lines))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as e:  # never block the user's prompt because of this hook
        print("Google session hook error: %s" % e)
        sys.exit(0)
