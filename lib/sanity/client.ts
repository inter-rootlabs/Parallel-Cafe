import { createClient } from 'next-sanity';

/**
 * Read-only Sanity client for fetching content.
 * Uses environment variables — replace placeholder values in .env.local
 * with your real Sanity project ID to connect to a live dataset.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for read-only, public content
  // Never expose a write token here — this is a read-only client
});

/**
 * Check if Sanity is configured with a real project ID.
 * Used by the fallback pattern: try Sanity first, fall back to seed data.
 */
export function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !!projectId && projectId !== 'placeholder-project-id';
}
