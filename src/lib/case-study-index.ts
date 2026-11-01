// Slugs of the published case studies at /projects/[slug], for pages that only
// need to know whether a project has one. Kept apart from case-studies.ts,
// which pulls in five next/font families and Lucide icons, so linking to a
// case study doesn't add that weight to unrelated pages.
//
// Keep in sync with `caseStudies` in src/lib/case-studies.ts.
export const CASE_STUDY_SLUGS: readonly string[] = [
  'fungen-events',
  'pattys-delights',
  'ashcam-cutting-solutions',
  'ik-smart-solution',
  'jb-loans',
  'heroes-catering',
];

export const hasCaseStudy = (slug: string) => CASE_STUDY_SLUGS.includes(slug);
