import React from 'react';
import SectionThemeProvider from '@/components/layout/SectionThemeProvider';

export default function ScreeningLayout({ children }: { children: React.ReactNode }) {
  return <SectionThemeProvider theme="screening">{children}</SectionThemeProvider>;
}
