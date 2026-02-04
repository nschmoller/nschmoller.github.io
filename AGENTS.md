# Project Agent Notes

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (Vite):

```bash
npm run dev
```

Run `npm run dev` in a separate terminal and keep it running.

## Build assets

```bash
npm run build
```

If you need a local preview of the production build:

```bash
npm run preview
```

## Verify with DevTools MCP

1. Start the dev server (always use the dev server for MCP verification):

```bash
npm run dev
```

Keep `npm run dev` running in a separate terminal while verifying.

2. Use the DevTools MCP to open and validate the page:

```bash
open http://localhost:5173
```

3. In the DevTools MCP session, take a snapshot and confirm key sections render
	(masthead, specialisaties, ervaring, contact, footer) and no console errors appear.


## Notes

- This is a static site. Main entry is `index.html`.
- Vite handles dev/build tasks.
- When offering choices to the user, number each option (1, 2, 3, ...).
