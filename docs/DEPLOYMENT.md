# Deployment record

## Source and scope

The website source matches the latest published reference, version 18, at source commit `87231a5055395bc2083151d10427705ffb259554`. The independent release checkout was brought up to date before migration. No development-repository Git history was imported.

The deployment build uses Next.js static export. The portfolio has one root route with client-side section navigation, project dialogs, document previews and video players. No live database, API, sign-in or server action is required by the portfolio. Unused platform scaffolding was removed from this release checkout.

## Public materials

- CVs are rendered page previews in the existing online reader. Original CV PDFs are excluded.
- The three existing published-paper PDFs remain available under `public/papers`.
- Selected images and videos retain the existing display controls and redaction choices.
- Original plans, contracts, archives, source-provenance JSON, personal identity documents and private development configuration are excluded.
- Company seals in the selected agreement previews remain visible; personal signatures and contact details have been removed.
- Photo and fieldwork-video display consent was supplied by the website owner.

Display controls discourage casual downloads; public web content can still be captured or saved. They are not access control or copy protection.

## Build checks

`npm run check` runs TypeScript, public-file regression checks and a guard for common credentials, private configuration, raw document types, unexpected PDFs and oversized public files. The publishing command also validates actual staged blobs against the release-path allowlist. This guard supports review; it does not replace manual review of new media.

Production dependency vulnerabilities are checked with `npm audit --omit=dev`. Dependency fixes use compatible updates, followed by a fresh export and browser verification.

GitHub Actions builds on Node.js 24 with the committed lockfile and deploys only `out/` through the official Pages artifact and deployment actions. Source maps are disabled.

## References

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Local verification — 13 October 2026

- Clean lockfile installation, TypeScript checks and public-file guard passed.
- Production audit: zero reported vulnerabilities after compatible dependency updates.
- Static export: root HTML, 404 HTML, JavaScript/CSS and 518 public assets verified; no browser source maps.
- Desktop browser: latest project 10 copy and financial tab, project 11 case selection and four fieldwork previews, CV Hub with two CVs (two research pages and one consulting/finance page), and capability/scenario linkage verified.
- Video modal: native controls and custom seek timeline verified; silent footage retains no fabricated audio or transcript. Local preview supports HTTP byte ranges for seeking.
- Responsive browser: 390-pixel homepage and navigation verified without document overflow; project dialog fits the viewport.
- Browser console during this check: no warnings or JavaScript errors.
- Repository origin is the requested user-site repository; Pages source is GitHub Actions.

Production deployment and live-site verification must be confirmed from the matching Actions run and `deployment.json` commit marker, not inferred from a local successful build.
