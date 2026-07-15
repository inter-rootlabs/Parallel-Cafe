import React from 'react';
import SectionThemeProvider from '@/components/layout/SectionThemeProvider';

export default function GamingLayout({ children }: { children: React.ReactNode }) {
  return <SectionThemeProvider theme="gaming">{children}</SectionThemeProvider>;
}
