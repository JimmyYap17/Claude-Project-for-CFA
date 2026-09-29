# CFA Flashcards

Installable web app (GitHub Pages) for CFA Level I flashcards, synced through the owner's Firebase project. See README.md for features and setup.

## Creating cards from chat

When the user asks for a card ("create a card under Corporate Issuers: Entrenchment"):

1. Write an accurate, exam-focused card for the CFA Level I curriculum. Front: a clear question. Back: a concise answer. Formulas go between `$$ … $$` (own line) or `\( … \)` (inline) in LaTeX; never use a single `$` as a delimiter. Use one of the curriculum topic names: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, Portfolio Management.
2. Send it with `CFA_INBOX_KEY=<key> python3 scripts/send_cards.py -` and a JSON list of `{"topic","front","back"}` on stdin. The app moves inbox cards into the deck within seconds.
3. The inbox key is in the app under Manage cards → Add cards from Claude. Ask the user for it if you don't have it this session. Never write the key into any file in this repository (it is public).
4. Show the user the card you sent.
