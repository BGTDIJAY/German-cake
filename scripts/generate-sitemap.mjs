/**
 * Generate public/sitemap.xml at build time.
 * Pulls every cake from Supabase and emits one URL per cake plus all static routes.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://premium-cake-forge.lovable.app";
const SUPABASE_URL = "https://fhfixoprgxwxrbfzjgzu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZml4b3ByZ3h3eHJiZnpqZ3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MzQxOTQsImV4cCI6MjA5MTQxMDE5NH0.epmf9LYjo3FfkkypPSgghdKbthBOwuU1RBAD6noLfN8";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/catalog", changefreq: "weekly", priority: "0.9" },
  { path: "/custom-cake", changefreq: "monthly", priority: "0.9" },
  { path: "/gallery", changefreq: "weekly", priority: "0.7" },
  { path: "/reviews", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
];

async function fetchCakes() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/cakes?select=id,created_at&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) {
      console.warn(`[sitemap] Cakes fetch failed: ${res.status}. Falling back to static routes only.`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn("[sitemap] Could not reach Supabase, generating static-only sitemap:", err);
    return [];
  }
}

function urlEntry(loc, changefreq, priority, lastmod) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${String(lastmod).slice(0, 10)}</lastmod>` : "",
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const cakes = await fetchCakes();
  const today = new Date().toISOString().slice(0, 10);

  const staticUrls = STATIC_ROUTES.map((r) =>
    urlEntry(`${SITE_URL}${r.path}`, r.changefreq, r.priority, today)
  );
  const cakeUrls = cakes.map((c) =>
    urlEntry(`${SITE_URL}/cake/${c.id}`, "weekly", "0.6", c.created_at)
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...cakeUrls,
    "</urlset>",
    "",
  ].join("\n");

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const out = resolve(__dirname, "..", "public", "sitemap.xml");
  writeFileSync(out, xml, "utf8");
  console.log(
    `[sitemap] Wrote ${out} with ${STATIC_ROUTES.length} static + ${cakes.length} cake URLs.`
  );
}

main().catch((err) => {
  console.error("[sitemap] Generation failed:", err);
  process.exit(0);
});
