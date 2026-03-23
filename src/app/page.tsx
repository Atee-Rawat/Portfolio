import HomeClient from '@/components/HomeClient'

/**
 * This is a SERVER component — it renders on the server first (SSR).
 * Next.js will:
 *   1. Pre-render the HTML on the server (visible to search engine crawlers)
 *   2. Send the HTML + metadata to the browser
 *   3. Hydrate the client components (HomeClient) for interactivity
 *
 * SEO metadata is exported from layout.tsx and injected into <head> automatically.
 */
export default function Home() {
  return <HomeClient />
}
