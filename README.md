# Tan Can — portfolio

Production: [7ancc.github.io](https://7ancc.github.io/)

Repository: [7ancc/7ancc.github.io](https://github.com/7ancc/7ancc.github.io)

## Develop and preview

Use Node.js 24 (`nvm use` when nvm is installed).

```sh
npm ci
npm run dev
```

To verify the actual static release:

```sh
npm run check
npm audit --omit=dev
npm run build
npm run preview
```

Open `http://127.0.0.1:3002`. The export is in `out/`; no application server is deployed.

## Publish updates

Edit this independent release checkout, then double-click **Publish.command** on macOS or run `npm run publish`.

The command installs the locked dependencies, checks public files and types, audits production dependencies, exports the site, commits reviewed source and pushes `main`. GitHub Actions then builds and deploys automatically. Check the repository's **Actions → Deploy portfolio to GitHub Pages** run for the result.

Authenticate once with the GitHub CLI using the repository owner's account:

```sh
gh auth login --hostname github.com --git-protocol https --web --scopes repo,workflow
```

In repository **Settings → Pages**, the source must be **GitHub Actions**.

Changes made in another development checkout or a hosted editor do not sync automatically. Compare and merge those changes into this release checkout before publishing; do not replace release configuration or import another repository's Git history.

## Public-file policy

Keep original CV PDFs, unredacted documents, archives, credentials, environment files and private platform settings outside this repository. Add new public materials only after reviewing their contents and display permission. CVs use the existing online image-page reader; published papers keep their existing PDF links.

The website's viewing controls do not prevent screenshots, network capture or saving publicly served content.

See [deployment notes](docs/DEPLOYMENT.md) for migration scope and verification requirements.
