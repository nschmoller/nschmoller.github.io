# Project Agent Notes

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (BrowserSync):

```bash
npx gulp dev
```

Run `npx gulp dev` in a separate terminal and keep it running.

## Build assets

```bash
npx gulp build
```

If you only need specific steps:

```bash
npx gulp css
npx gulp js
```

## Verify with DevTools MCP

1. Start the dev server (always use the dev server for MCP verification):

```bash
npx gulp dev
```

Keep `npx gulp dev` running in a separate terminal while verifying.

2. Use the DevTools MCP to open and validate the page:

```bash
open http://localhost:3000
```

3. In the DevTools MCP session, take a snapshot and confirm key sections render
	(masthead, specialisaties, ervaring, contact, footer) and no console errors appear.


## Notes

- This is a static site. Main entry is `index.html`.
- Gulp tasks are defined in `gulpfile.js`.
