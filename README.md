# CFA Flashcards

An installable flashcard app for CFA Level I study. Add it to your iPad Home Screen and it opens full screen like a regular app. Cards and study progress are stored in your own Firebase project, so they sync live between your iPad, phone and computer.

**App address (after step 3 below):** https://jimmyyap17.github.io/Claude-Project-for-CFA/

## What it does

- **Study:** tap a card to see the answer. Then swipe right (or tap **Got it**) if you knew it, or swipe left (or tap **Review again**) if you didn't. Cards you miss come back a few cards later. You can filter by topic and track how many cards are New, Learning and Mastered.
- **Quick add:** tap the round **+** button anywhere in the app. The topic stays filled in, so you can type card after card.
- **Add from notes:** under **Manage cards**, type or paste your notes and tap **Import**:

  ```
  # Fixed Income
  Q: When does a bond trade at a discount?
  A: When its coupon rate is below its YTM.

  Q: Macaulay duration
  A: Weighted average time to receive
  the bond's cash flows.
  ```

  One card per line also works: `Topic | Question | Answer`. So does a JSON list in the same shape as `cards.json`.
- **Formulas:** put a formula between `$$` signs, for example `$$V_0 = \frac{D_1}{r - g}$$`, and it's typeset on the card. Use `\( … \)` for a formula inside a sentence. A single `$` stays as text, so prices like $5 million are safe.
- **Handwriting tab:** write with your Apple Pencil (or use a photo), tap **Copy handwriting**, then **Open Claude**. In the [CFA Handwriting Converter](https://claude.ai/artifact/UeaZWHpa52rLk4FfkvkMF8), tap the paste box and choose **Paste**; it converts on your own Claude plan at no extra cost. Tap **Copy for import**, come back to the app and tap **Paste from Claude**. Check the typeset preview, fill in the question, and tap **Add to deck**. The converter's source is in `converter/`.
- **Works offline:** you can study and add cards without a connection. Changes sync the next time you're online.
- **Edit or delete:** tap any card in the list, or tap **Edit card** while studying.

## One-time setup (about 10 minutes)

You can do all of this in Safari on your iPad.

### 1. Create the Firebase project

1. Go to <https://console.firebase.google.com> and sign in with your Google account.
2. Tap **Create a project**. Name it something like `cfa-flashcards`. Google Analytics isn't needed.
3. **Turn on sign-in:** go to **Build → Authentication → Get started → Sign-in method**. Choose **Email/Password**, switch on **Enable**, and save. The app signs in with a username and password, and uses Firebase's Email/Password option behind the scenes.
4. **Create the database:** go to **Build → Firestore Database → Create database**. Pick a location near you and start in **production mode**.
5. **Set the security rules:** in Firestore, open the **Rules** tab. Replace everything there with the contents of [`firestore.rules`](firestore.rules) and tap **Publish**. These rules let each signed-in person read and write only their own cards.
6. **Get the web config:** open **Project settings** (the gear icon) and scroll to **Your apps**. Tap the web icon `</>`, name the app `CFA Cards` and register it. You don't need Firebase Hosting. Firebase then shows a `firebaseConfig` block of values.

### 2. Paste the config into the app

Open [`firebase-config.js`](firebase-config.js) on GitHub. Tap the pencil icon, replace the placeholder values with your `firebaseConfig` values, and commit the change.

These values only identify your project; they are not passwords. The rules from step 1.5 are what keep your data private.

### 3. Turn on GitHub Pages

In this repository on GitHub, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch `claude/cfa-flashcard-app-qvxl3g` and folder `/ (root)`, and save. A minute or two later the app is live at the address at the top of this file.

### 4. Install it on your iPad

1. Open the app address in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. Open **CFA Cards** from your Home Screen. Choose a username and a password of at least 4 characters, then tap **Enter**. The first time, this creates your deck.
4. On any other device, open the same address and enter the same username and password to see the same deck.

There's no password reset, because usernames aren't linked to an email address. If you forget your password, you can delete the user under **Authentication → Users** in the Firebase console and start again with the same username. That starts a new, empty deck.

A new deck is empty. Tap **Load 20 example cards** to try the app, then delete the examples when you've added your own.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css`, `app.js` | The app |
| `firebase-config.js` | Your Firebase project settings (step 2) |
| `firestore.rules` | Database security rules (step 1.5) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Home Screen install and offline support |
| `cards.json` | The 20 example cards |

## Running it on a computer

```
python3 -m http.server 8000
# then open http://localhost:8000
```
