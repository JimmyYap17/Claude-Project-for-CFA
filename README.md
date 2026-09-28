# CFA Flashcards

A live flashcard app for CFA Level I study.

- **Study**: flip cards (Space), mark "Review again" (1) or "Got it" (2). Cards you miss come back sooner; your progress is kept in your own browser.
- **Manage cards**: add, edit and delete cards, or bulk-import many at once.
- **Live sync**: when opened as a published Claude artifact, cards are stored in a shared database and every change appears instantly for everyone who has the page open.

## Bulk import format

One card per line:

```
Topic | Question | Answer
```

or a JSON array of `{"topic": "...", "front": "...", "back": "..."}` objects (same shape as `cards.json`). Use `\n` for a line break inside a line.

## Running locally

Outside the artifact, the app runs in offline mode: it loads `cards.json` once and saves edits in your browser.

```
python3 -m http.server 8000
# open http://localhost:8000
```
