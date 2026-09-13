# Dawn Vocab Daily — your own copy

A fully working clone of the "Dawn Vocab Daily" vocabulary app: same layout,
colors, fonts and feature set (word lists, flashcards, pictures, memory game,
tap-to-translate article view, AI story, AI summary, practice quiz, spaced
repetition review, speaking practice, offline saves, dashboard).

**Zero backend, zero hosting cost, zero platform fee.** It's three static
files — open `index.html` in a browser and it runs. All the "AI" features
(word extraction, Urdu meanings, story/summary generation, quizzes, pictures)
call the AI provider **you** choose, using **your own API key**, directly
from your browser. Nothing is billed through this app — you only pay your
provider's normal per-use rate (many providers, incl. Gemini, have a free
tier that's plenty for personal use).

## Files

- `index.html` — page shell
- `styles.css` — the visual theme (cream/olive gradient, forest green, gold
  badge, Playfair Display + Poppins — matched to your screenshots)
- `app.js` — everything else: state, AI calls, article fetching, all screens

## 1. Run it locally (fastest way to try it)

Just double-click `index.html`, or serve the folder with any static server:

```bash
cd dawn-vocab-app
python3 -m http.server 8080
# then open http://localhost:8080
```

## 2. Put in your API key

Open the app → tap the gear icon (top right) → **Settings**:

1. Pick a provider: **OpenAI**, **Gemini**, **Claude**, or **Grok (xAI)** —
   or **Custom** for any other OpenAI-compatible `/chat/completions` endpoint.
2. Paste your API key (get one from platform.openai.com, aistudio.google.com,
   console.anthropic.com, or console.x.ai).
3. Optionally override the model name (defaults are filled in as
   placeholders — check your provider's docs for current model names/pricing,
   since these change over time).
4. Tap **Test connection**.
5. Optionally add a **Tavily** API key (tavily.com) just below — if set, it's
   used for article search and full-article-text extraction instead of the
   free RSS relay, which is generally faster and more reliable.
6. **Other API keys**: a free-form list at the bottom of Settings where you
   can store any other keys you pick up (a search API, an image API, etc.)
   for your own reference — they're saved with everything else even though
   the app doesn't call them yet.

The key is sent only straight to the provider's API from your browser —
never anywhere else. It's also **saved automatically** in this browser
(see "Saving your progress" below), so you only enter it once per browser.

## 3. Deploy it for free, permanently

Any static host works, e.g.:

- **GitHub Pages** — push this folder to a repo, enable Pages, done.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder in
  their dashboard, or connect the repo. Free tier is plenty.

No build step, no server, no database required.

## Saving your progress (deck, offline lessons, story, speaking history)

Everything (settings/keys, deck, offline lessons, story chapters, speaking
history) auto-saves to this browser's `localStorage` as you use the app —
close the tab, come back later, and it's all still there, no re-entering
your key. If a browser/environment blocks local storage, Settings tells you
plainly and the app still works for that session — use **Export data** to
download a JSON backup and **Import data** to restore it, e.g. when moving
to a different browser or device.

## How the pieces work

- **Articles**: pulled live from Dawn.com's public RSS feeds via the free
  `rss2json.com` relay (needed because browsers can't fetch cross-origin RSS
  directly). Search uses a Google News RSS query scoped to `site:dawn.com`.
  A best-effort full-text fetch (`allorigins.win` proxy) grabs the full
  article body where possible; if any of this is blocked on your network,
  use **"paste an article manually"** (shown on the home screen and behind
  the "Word story" button) — every other feature works identically on pasted
  text.
- **Word extraction, meanings, story, summary, quiz, lookups**: one shared
  `callAI()` function that speaks OpenAI/Grok's Chat Completions format or
  Gemini's `generateContent` format depending on what you picked in
  Settings, and asks the model to reply in strict JSON.
- **Pictures**: OpenAI (`gpt-image-1`) or Grok (`grok-2-image`) image
  generation if you're on one of those providers; otherwise (or if it fails)
  a clean colored placeholder tile is shown instead so the screen never
  breaks.
- **Pronunciation / "Read aloud" / "Listen"**: the browser's built-in
  `speechSynthesis` API — free, no API key needed.
- **Speaking practice**: the browser's `SpeechRecognition` API (Chrome/Edge)
  compares what you said to the target word and scores similarity.
- **Spaced repetition**: a simple Leitner box system (1/2/4/8/16/32-day
  intervals) drives the Review screen.
- **Word story**: a persistent, cumulative story built only from words in
  your deck, across sessions. "Add new words" writes a new chapter using
  whatever's been saved since the last chapter; "Rewrite story" starts over
  using every saved word. Vocabulary is highlighted, chapters are dated, and
  there's a one-tap whole-story Urdu translation.
- **My deck**: browse everything you've saved as rich flashcards (meaning,
  article quote, bilingual example, synonyms, antonyms, a memory-trick tip)
  with Prev/Flip/Saved/Next controls — the same card design used for a
  lesson's own Flashcards tab.

## Responsive layout

The layout is mobile-first (matching the original design) but adapts at
~700px and ~1000px wide: wider containers, multi-column nav/picture/memory
grids, and larger type — so it's equally usable as a phone app or a desktop
tab.

## Notes & honest limitations

- Dawn.com's exact RSS paths were mapped from public knowledge and may
  shift; if a category ever 404s, hit **Refresh**, try another category, or
  paste an article manually — the app degrades gracefully either way.
- Client-side API keys are visible to anyone with access to your browser's
  dev tools on your own device — this is normal for "bring your own key"
  apps and is the same trade-off the original app's model implies. Don't
  deploy a build with your key hard-coded into a public URL; always type it
  into Settings on your own device/browser.
- Image generation costs vary a lot by provider/model — check current
  pricing before hitting "Generate all" on a big word list.
