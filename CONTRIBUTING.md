# Contributing

Thanks for helping organize IROS 2026.

## Workflow

1. Create a branch: `git checkout -b add-speaker-name`
2. Make your edits (see below).
3. Push and open a pull request.
4. A preview deployment is built automatically for every pull request.
5. Once merged to `main`, the change goes live at https://space-robots.org/events/iros2026/

## Common edits

**Add a speaker or organizer** — edit the lists near the top of `src/pages/index.tsx`.
Photos go in `static/images/iros2026/people/`
and are referenced as `/images/iros2026/people/name.jpg`.

**Update the schedule** — edit the agenda entries in `src/pages/index.tsx`.

**Change dates or the call for papers** — same file; search for the section heading you want.

## Before you open a pull request

```bash
npm run build
```

If the build passes locally it will pass in CI.

## Questions

Open an issue in this repository.
