// Team data — single source of truth for the About page (rendering) and the
// About route (server-rendered Person / Organization E-E-A-T schema).
//
// Plain module (no 'use client') so both the client component and the server
// route can import it. Pratik and Kavin are the founders; Ryan is a contract
// designer (a real collaborator) — only the founders are declared as
// Organization founders in schema, which keeps the markup honest.

export interface TeamMember {
  name: string;
  initials: string;
  role: string;
  school: string;
  degree: string;
  bio: string;
  /** True for company founders. Contract collaborators are omitted from founder/employee schema. */
  founder?: boolean;
  /** Honest skill areas (derived from role) for Person.knowsAbout — an E-E-A-T signal. */
  knowsAbout: string[];
}

export const team: TeamMember[] = [
  {
    name: 'Pratik Mistry',
    initials: 'PM',
    role: 'Lead Developer & Co-Founder',
    school: 'University of Ottawa',
    degree: 'Computer Engineering',
    bio: '4–5 years building scalable web applications. Obsessed with clean architecture, performance, and shipping products that actually work.',
    founder: true,
    knowsAbout: ['Web Development', 'Software Architecture', 'Web Performance', 'Next.js'],
  },
  {
    name: 'Kavin Mural',
    initials: 'KM',
    role: 'Lead Developer & Co-Founder',
    school: 'University of Waterloo',
    degree: 'Computer Science',
    bio: '4–5 years across full-stack development. Specializes in modern web tech, developer tooling, and turning complex requirements into elegant solutions.',
    founder: true,
    knowsAbout: ['Full-Stack Development', 'TypeScript', 'Developer Tooling', 'Web Applications'],
  },
  {
    name: 'Ryan Honeybone',
    initials: 'RH',
    role: 'UX / UI Designer',
    school: 'McGill University',
    degree: 'Design',
    bio: '3 years crafting interfaces that convert. Bridges the gap between brand identity and user behaviour — no templates, no shortcuts.',
    knowsAbout: ['UX Design', 'UI Design', 'Brand Identity', 'Conversion Optimization'],
  },
];
