# German Cakes — Bindayaka, Jaipur

Premium bakery website built with Vite + React + TypeScript + Tailwind, ready for GitHub and Vercel hosting.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to your local environment file and fill in the three backend values.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. Under **Environment Variables**, add the three keys from `.env.example`:
   - `VITE_SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
5. Click **Deploy**.

The included `vercel.json` handles SPA routing so deep links (e.g. `/catalog`, `/admin`) work on refresh.

## Connect a custom domain on Vercel

1. Vercel project → **Settings → Domains** → **Add**.
2. Enter your domain (e.g. `germancakes.in`).
3. At your registrar, add the DNS records Vercel shows you:
   - **A record** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Wait for DNS to propagate; Vercel issues SSL automatically.

## Notes

- Never upload or commit local environment files; they are git-ignored.
- Keep only `package-lock.json`; this makes Vercel use npm without package-manager warnings.
- Do not upload `node_modules`, `dist`, `.workspace`, `.vercel`, or `*.tsbuildinfo` files.
- Admin-uploaded cake images are stored in the backend storage, not in the repo.
