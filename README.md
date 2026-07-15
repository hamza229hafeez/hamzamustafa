# Senior Engineer Portfolio

A fully static, prerendered React portfolio built with Vite, TypeScript, Framer Motion, Lucide, and React Router.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run typecheck
npm run build
```

The build creates real HTML for the homepage, every project route, and the 404 page. It also generates `sitemap.xml` and `robots.txt`. Set `SITE_URL` to the production origin during the build; Vercel can define it in Project Settings → Environment Variables.

## Personalize before launch

- Contact details, social links, location, profile image, and the supplied résumé are configured for Hamza Mustafa.
- Replace each conceptual `ProjectVisual` with approved screenshots when available.
- Replace testimonial placeholder copy with verified quotes.
- Activate FormSubmit from the one-time confirmation email sent after the first test submission.
- Set `SITE_URL` so canonical URLs, Open Graph URLs, the sitemap, and `robots.txt` use the final domain.

## Deploy

Vercel reads `vercel.json` automatically. GitHub Pages deployment runs from `.github/workflows/deploy.yml` on pushes to `main`; enable Pages with **GitHub Actions** as the source.

Create the repository as `hamzamustafa`. Then push the `main` branch and select **Settings → Pages → Source: GitHub Actions**. The portfolio will be published at `https://hamza229hafeez.github.io/hamzamustafa/`.
