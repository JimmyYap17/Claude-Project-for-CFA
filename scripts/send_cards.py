#!/usr/bin/env python3
"""Send flashcards to the app's card inbox; the app moves them into the deck.

Usage:
  CFA_INBOX_KEY=cfa-... python3 scripts/send_cards.py cards.json
  CFA_INBOX_KEY=cfa-... python3 scripts/send_cards.py - <<'JSON'
  [{"topic": "Corporate Issuers", "front": "...", "back": "..."}]
  JSON

The inbox key is shown in the app under Manage cards -> Add cards from Claude.
Never commit it: the repository is public.
"""
import json, os, re, sys, time, urllib.request

CONFIG = open(os.path.join(os.path.dirname(__file__), "..", "firebase-config.js")).read()
API_KEY = re.search(r'apiKey:\s*"([^"]+)"', CONFIG).group(1)
PROJECT = re.search(r'projectId:\s*"([^"]+)"', CONFIG).group(1)


def send(key, card):
    url = (f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)"
           f"/documents/inbox/{key}/cards?key={API_KEY}")
    body = {"fields": {
        "topic": {"stringValue": card["topic"].strip()},
        "front": {"stringValue": card["front"].strip()},
        "back": {"stringValue": card["back"].strip()},
        "createdAt": {"integerValue": str(int(time.time() * 1000))},
    }}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST",
                                 headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req).read()
    except urllib.error.HTTPError as e:
        sys.exit(f"Failed to send '{card['front'][:50]}': {e.code} {e.read().decode()[:300]}")


def main():
    key = os.environ.get("CFA_INBOX_KEY", "").strip()
    if not key.startswith("cfa-"):
        sys.exit("Set CFA_INBOX_KEY to the inbox key shown in the app.")
    src = sys.argv[1] if len(sys.argv) > 1 else "-"
    cards = json.load(sys.stdin if src == "-" else open(src))
    if isinstance(cards, dict):
        cards = [cards]
    for c in cards:
        send(key, c)
        print(f"Sent: [{c['topic']}] {c['front'][:70]}")


if __name__ == "__main__":
    main()
