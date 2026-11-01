'use client';

import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label: string;
}

// Opens the browser's print dialog, which also offers "Save as PDF". The page
// decides what prints through its print styles (see .print-sheet in globals.css).
export const PrintButton = ({ label }: PrintButtonProps) => (
  <button
    type="button"
    onClick={() => window.print()}
    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white print:hidden"
  >
    <Printer className="h-4 w-4" aria-hidden="true" />
    {label}
  </button>
);
