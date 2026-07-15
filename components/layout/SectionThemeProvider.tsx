import React from 'react';

interface SectionThemeProviderProps {
  theme: 'cafe' | 'screening' | 'gaming';
  children: React.ReactNode;
}

/**
 * Wraps children with a data-theme attribute that scopes CSS custom properties.
 * Used in section-specific layouts to automatically theme all child components.
 */
export default function SectionThemeProvider({ theme, children }: SectionThemeProviderProps) {
  return (
    <div data-theme={theme} className="min-h-screen">
      {children}
    </div>
  );
}
