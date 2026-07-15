'use client';

/**
 * Embedded Sanity Studio at /studio
 * This renders the full Sanity Studio UI for content editing.
 * Authentication is handled by Sanity's own auth system.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
