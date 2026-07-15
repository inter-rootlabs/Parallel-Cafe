import React from 'react';
import SectionThemeProvider from '@/components/layout/SectionThemeProvider';

export default function CafeLayout({ children }: { children: React.ReactNode }) {
  return <SectionThemeProvider theme="cafe">{children}</SectionThemeProvider>;
}
