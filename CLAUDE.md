# CFA Flashcards

Installable web app (GitHub Pages) for CFA Level I flashcards, synced through the owner's Firebase project. See README.md for features and setup.

## Creating cards from chat

When the user asks for a card ("create a card under Corporate Issuers: Entrenchment"):

1. Write an accurate, exam-focused card for the CFA Level I curriculum. Front: a clear question. Back: a concise answer. Formulas go between `$$ … $$` (own line) or `\( … \)` (inline) in LaTeX; never use a single `$` as a delimiter. Use one of the curriculum topic names: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, Portfolio Management.
2. Send it with `CFA_INBOX_KEY=<key> python3 scripts/send_cards.py -` and a JSON list of `{"topic","front","back"}` on stdin. The app moves inbox cards into the deck within seconds.
3. The inbox key is in the app under Manage cards → Add cards from Claude. Ask the user for it if you don't have it this session. Never write the key into any file in this repository (it is public).
4. Show the user the card you sent.

## Adding refresher readings

When the user asks for a new refresher topic, add it to `refreshers.md` under the matching `# Area` heading (one of the ten topic names above). Start it with `## Title`, use `### ` section headings, `-` lists, `| tables |` and `**bold**`, and the same formula delimiters as cards. End with an `### Exam traps` section. The reading's id comes from its title, so don't rename existing titles (that drops them from users' saved lists). Bump `CACHE` in `sw.js`, then commit and push; the app picks it up on next open.
