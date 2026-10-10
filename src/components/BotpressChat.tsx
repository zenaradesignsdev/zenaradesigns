'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { useFirstInteraction } from '@/hooks';

type Botpress = {
  on: (event: string, handler: () => void) => void;
  open: () => void;
  close: () => void;
  initialized: boolean;
  // Live getter: 'initial' | 'opened' | 'closed'
  state: string;
};

declare global {
  interface Window {
    botpress?: Botpress;
  }
}

const GREETING_DISMISSED_KEY = 'zenari-greeting-dismissed';
const GREETING_DELAY_MS = 4000;
// Webchat v5 emits no opened/closed events, so poll its state to hide our
// launcher while the chat window (which has its own close button) is open.
const STATE_POLL_MS = 100;
const SHADOW_STYLE_ID = 'zenari-webchat-style';

// Botpress renders both its round launcher and the chat window inside
// #fab-root's shadow root, so page CSS can't reach them. Inject a style that:
// - hides only Botpress's launcher (.bpFabWrapper), not the chat window;
// - replaces the instant close with a fade + slight drop/shrink towards our
//   launcher. Botpress marks the closed window with an inline
//   `pointer-events: none` and blanks its inner content immediately, so the
//   inner content is held visible while the outer window does the fade.
const SHADOW_CSS = `
.bpFabWrapper { display: none !important; }
@media (prefers-reduced-motion: no-preference) {
  .bpFABWebchat {
    transform-origin: bottom right !important;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease !important;
  }
  .bpFABWebchat[style*="pointer-events: none"] {
    opacity: 0 !important;
    transform: translateY(16px) scale(0.96) !important;
  }
  .bpFABWebchat[style*="pointer-events: none"] > div {
    opacity: 1 !important;
    filter: none !important;
  }
}
`;

function styleWebchat() {
  const shadow = document.getElementById('fab-root')?.shadowRoot;
  if (!shadow || shadow.getElementById(SHADOW_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = SHADOW_STYLE_ID;
  style.textContent = SHADOW_CSS;
  shadow.appendChild(style);
}

// Botpress webchat (Zenari). The bot config calls window.botpress.init(),
// so it must only load after inject.js has finished. Botpress's own launcher
// is hidden (see styleWebchat) and replaced by the branded one below, which
// renders straight away and doesn't depend on Botpress having loaded.
export default function BotpressChat() {
  const [mounted, setMounted] = useState(false);
  // inject.js is ~520 KB gzipped, so it is only fetched once the visitor
  // interacts with the page (or taps the launcher).
  const hasInteracted = useFirstInteraction();
  const [launcherTapped, setLauncherTapped] = useState(false);
  const shouldLoad = hasInteracted || launcherTapped;
  const [injected, setInjected] = useState(false);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const handleInjected = () => {
    window.botpress?.on('webchat:initialized', () => setReady(true));
    setInjected(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Launcher tapped before Botpress finished loading: open once it's ready.
  useEffect(() => {
    if (!ready || !pendingOpen) return;
    setPendingOpen(false);
    window.botpress?.open();
    setIsOpen(true);
  }, [ready, pendingOpen]);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      styleWebchat();
      setIsOpen(window.botpress?.state === 'opened');
    }, STATE_POLL_MS);
    return () => clearInterval(interval);
  }, [ready]);

  useEffect(() => {
    if (!mounted) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(GREETING_DISMISSED_KEY) === '1';
    } catch {
      // Storage unavailable (private mode etc.) — just show the greeting.
    }
    if (dismissed) return;
    const timer = setTimeout(() => setShowGreeting(true), GREETING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [mounted]);

  const dismissGreeting = () => {
    setShowGreeting(false);
    try {
      sessionStorage.setItem(GREETING_DISMISSED_KEY, '1');
    } catch {
      // Ignore storage errors.
    }
  };

  const openChat = () => {
    dismissGreeting();
    if (!ready) {
      setLauncherTapped(true);
      setPendingOpen(true);
      return;
    }
    window.botpress?.open();
    setIsOpen(true);
  };

  return (
    <>
      {shouldLoad && (
        <Script
          src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"
          strategy="afterInteractive"
          onLoad={handleInjected}
        />
      )}
      {injected && (
        <Script
          src="https://files.bpcontent.cloud/2026/10/10/19/20261010195750-18Z296E0.js"
          strategy="afterInteractive"
        />
      )}

      {mounted && !isOpen && (
        // Delayed so the launcher rises in as the chat window finishes fading out.
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-300 delay-150 fill-mode-backwards motion-reduce:animate-none sm:bottom-6 sm:right-6">
          {/* Not on phones: there it would cover the hero CTAs. */}
          {showGreeting && (
            <div className="relative hidden max-w-[240px] sm:block rounded-2xl rounded-br-sm border border-white/10 bg-slate-900/95 px-4 py-3 text-sm text-slate-100 shadow-xl backdrop-blur animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
              <button
                type="button"
                onClick={dismissGreeting}
                aria-label="Dismiss message"
                className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-slate-800 text-slate-300 before:absolute before:-inset-2.5 before:content-[''] hover:text-white"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button type="button" onClick={openChat} className="text-left">
                <span className="font-semibold">Hi, I&apos;m Zenari! 👋</span>
                <br />
                Questions about pricing or getting a website? Ask me.
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={openChat}
            aria-label="Chat with Zenari, our AI assistant"
            aria-busy={pendingOpen}
            className="group rounded-full bg-gradient-primary p-[2px] shadow-lg shadow-violet-500/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <span className="flex items-center gap-3 rounded-full bg-slate-900 p-1.5 sm:pr-5">
              <span className="relative block h-12 w-12 shrink-0">
                <span className="block h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500/40 to-cyan-400/30">
                  <Image
                    src="/images/zenari-wave.png"
                    alt=""
                    width={48}
                    height={65}
                    className="zenari-bob mx-auto mt-1 h-auto w-10"
                  />
                </span>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-900 ring-2 ring-slate-900">
                  {pendingOpen ? (
                    <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                  ) : (
                    <MessageCircle className="h-3 w-3" aria-hidden="true" />
                  )}
                </span>
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-semibold leading-tight text-white">
                  Chat with Zenari
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  AI assistant · replies instantly
                </span>
              </span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
