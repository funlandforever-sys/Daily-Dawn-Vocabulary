/* =========================================================================
   DAWN VOCAB DAILY — a fully client-side vocabulary learning app
   No backend, no server costs. You bring your own AI API key
   (OpenAI, Gemini, or Grok/xAI) and it runs entirely in your browser.

   Persistence: this app deliberately avoids localStorage/sessionStorage
   (some sandboxed previews block it). Instead, use Settings → Export data
   to save a JSON snapshot of your deck/settings, and Import data to
   restore it next time. Keep that file safe — it also contains your API
   key if you choose to export it.
   ========================================================================= */

/* ---------------------------- ICONS ---------------------------- */
const ICONS = {
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5v1A3 3 0 0 0 4 10.5 3 3 0 0 0 6 16v.5A3.5 3.5 0 0 0 9.5 20h1V3h-1Z"/><path d="M14.5 3a3.5 3.5 0 0 1 3.5 3.5v1A3 3 0 0 1 20 10.5 3 3 0 0 1 18 16v.5a3.5 3.5 0 0 1-3.5 3.5h-1V3h1Z"/></svg>',
  bar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v13m0 0-4-4m4 4 4-4"/><path d="M4 19.5h16"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.5-2-3.4-2.4.8a8 8 0 0 0-1.8-1l-.4-2.5H9.2l-.4 2.5a8 8 0 0 0-1.8 1l-2.4-.8-2 3.4L4.6 11a7.9 7.9 0 0 0 0 2l-2 1.5 2 3.4 2.4-.8a8 8 0 0 0 1.8 1l.4 2.5h5.6l.4-2.5a8 8 0 0 0 1.8-1l2.4.8 2-3.4-2-1.5Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5m0 0 6 6m-6-6 6-6"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 8a5 5 0 0 1 0 8"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.1 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z"/></svg>',
  starFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.5l-5.9 3.1 1.3-6.6-4.9-4.6 6.6-.8L12 2.5Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11A8 8 0 1 0 18.5 16"/><path d="M20 5v6h-6"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
};

/* ---------------------------- PROVIDER DEFAULTS ---------------------------- */
const PROVIDER_INFO = {
  openai: { label: 'OpenAI', defaultModel: 'gpt-4o-mini', help: 'Uses the Chat Completions API. Model examples: gpt-4o-mini, gpt-4o, gpt-4.1-mini.' },
  gemini: { label: 'Gemini', defaultModel: 'gemini-2.5-flash', help: 'Uses Google AI Studio API keys. Model examples: gemini-2.5-flash, gemini-2.5-pro.' },
  grok: { label: 'Grok (xAI)', defaultModel: 'grok-4-fast', help: 'Uses the xAI Chat Completions API (OpenAI-compatible).' },
};

const CATEGORY_FEEDS = {
  top: 'https://www.dawn.com/feeds/home',
  pakistan: 'https://www.dawn.com/feeds/pakistan',
  world: 'https://www.dawn.com/feeds/world',
  business: 'https://www.dawn.com/feeds/business',
  sport: 'https://www.dawn.com/feeds/sport',
  opinion: 'https://www.dawn.com/feeds/opinion',
};
const CATEGORY_LABELS = { top: 'Top', pakistan: 'Pakistan', world: 'World', business: 'Business', sport: 'Sport', opinion: 'Opinion' };

/* ---------------------------- STATE ---------------------------- */
const state = {
  settings: { provider: 'openai', apiKey: '', model: '', customEndpoint: '' },
  difficulty: 'Advanced',
  wordCount: 10,
  category: 'top',
  articles: [],
  articlesLoading: false,
  articlesError: null,
  view: 'home',
  currentArticle: null,   // {title, link, content, source}
  currentWords: null,     // array or null (not generated yet)
  wordsLoading: false,
  wordsError: null,
  currentTab: 'wordlist',
  story: { text: null, loading: false, error: null },
  summary: { text: null, loading: false, error: null },
  quiz: { items: null, loading: false, error: null, index: 0, score: 0, answered: null },
  pictures: {},           // word -> url|'placeholder'|'loading'
  picturesBusy: false,
  deck: [],               // {word,partOfSpeech,ipa,difficulty,meaningUrdu,meaningEnglish,example,savedAt,box,nextReviewAt}
  offlineArticles: [],    // {id,title,link,content,words,story,summary,savedAt}
  speakingHistory: [],    // {word,transcript,score,at}
  recording: false,
  lastSpeakTarget: null,
  lastSpeakResult: null,
  flashIndex: 0,
  flashFlipped: false,
  memory: null,
  reviewIndex: 0,
  reviewShowBack: false,
  searchBoxValue: '',
  toastMsg: null,
  modal: null,            // 'settings' | null
  lookupPopover: null,    // {word, loading, data, error}
};

function uid(){ return Math.random().toString(36).slice(2, 10); }
function now(){ return Date.now(); }
function stripHtml(html){ const d = document.createElement('div'); d.innerHTML = html || ''; return (d.textContent || '').replace(/\s+/g,' ').trim(); }
function escapeHtml(s){ return (s==null?'':String(s)).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function esc(s){ return escapeHtml(s); }

/* ---------------------------- TOAST ---------------------------- */
let toastTimer = null;
function toast(msg){
  state.toastMsg = msg;
  renderToast();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ state.toastMsg = null; renderToast(); }, 3200);
}
function renderToast(){
  const root = document.getElementById('toast-root');
  root.innerHTML = state.toastMsg ? `<div class="toast">${esc(state.toastMsg)}</div>` : '';
}

/* ---------------------------- AI LAYER ---------------------------- */
function hasKey(){ return !!(state.settings.apiKey && state.settings.apiKey.trim()); }

async function safeText(res){ try { return await res.text(); } catch(e){ return ''; } }

async function callAI(systemPrompt, userPrompt, opts = {}) {
  const { provider, apiKey, model, customEndpoint } = state.settings;
  if (!apiKey) { const e = new Error('No API key set. Add one in Settings.'); e.code = 'NO_KEY'; throw e; }

  if (provider === 'openai' || provider === 'grok' || provider === 'custom') {
    const url = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions'
              : provider === 'grok' ? 'https://api.x.ai/v1/chat/completions'
              : customEndpoint;
    if (!url) { const e = new Error('Custom endpoint URL is empty. Set it in Settings.'); throw e; }
    const body = {
      model: model || PROVIDER_INFO[provider]?.defaultModel || 'gpt-4o-mini',
      messages: [ { role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt } ],
      temperature: 0.7,
    };
    if (opts.json) body.response_format = { type: 'json_object' };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey }, body: JSON.stringify(body) });
    if (!res.ok) { const t = await safeText(res); throw new Error(`AI request failed (${res.status}): ${t.slice(0,220)}`); }
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? '';
  }

  if (provider === 'gemini') {
    const mdl = model || PROVIDER_INFO.gemini.defaultModel;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(mdl)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const combined = systemPrompt + '\n\n' + userPrompt + (opts.json ? '\n\nRespond ONLY with valid JSON. No markdown code fences, no commentary before or after.' : '');
    const body = { contents: [ { role: 'user', parts: [ { text: combined } ] } ], generationConfig: { temperature: 0.7 } };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { const t = await safeText(res); throw new Error(`AI request failed (${res.status}): ${t.slice(0,220)}`); }
    const data = await res.json();
    return (data.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
  }

  throw new Error('Unknown provider: ' + provider);
}

function extractJSON(text){
  if (text == null) throw new Error('Empty AI response');
  let t = String(text).trim();
  t = t.replace(/^```(?:json)?/i, '').replace(/```$/,'').trim();
  try { return JSON.parse(t); } catch(e){}
  const starts = [t.indexOf('{'), t.indexOf('[')].filter(i => i >= 0);
  const start = starts.length ? Math.min(...starts) : -1;
  const end = Math.max(t.lastIndexOf('}'), t.lastIndexOf(']'));
  if (start >= 0 && end > start) {
    try { return JSON.parse(t.slice(start, end + 1)); } catch(e){}
  }
  throw new Error('Could not parse the AI response as JSON.');
}

async function callAIJSON(systemPrompt, userPrompt){
  const raw = await callAI(systemPrompt, userPrompt, { json: true });
  return extractJSON(raw);
}

async function generateImageForWord(word, meaning){
  const { provider, apiKey } = state.settings;
  const prompt = `A simple, clean, colorful flat-illustration icon representing the concept of "${word}" (meaning: ${meaning}). Minimal, no text, no watermark, friendly educational style, centered composition.`;
  try {
    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/images/generations', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey }, body: JSON.stringify({ model: 'gpt-image-1', prompt, size: '512x512' }) });
      if (!res.ok) throw new Error('image request failed');
      const data = await res.json();
      const item = data.data?.[0];
      if (item?.b64_json) return 'data:image/png;base64,' + item.b64_json;
      if (item?.url) return item.url;
      throw new Error('no image in response');
    }
    if (provider === 'grok') {
      const res = await fetch('https://api.x.ai/v1/images/generations', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey }, body: JSON.stringify({ model: 'grok-2-image', prompt }) });
      if (!res.ok) throw new Error('image request failed');
      const data = await res.json();
      const url = data.data?.[0]?.url;
      if (url) return url;
      throw new Error('no image in response');
    }
  } catch (e) {
    console.warn('Image generation unavailable, using placeholder tile:', e.message);
  }
  return null; // caller shows a designed placeholder instead
}

/* ---------------------------- ARTICLE FETCHING ---------------------------- */
async function rss2json(feedUrl){
  const api = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);
  const res = await fetch(api);
  if (!res.ok) throw new Error('Feed service unreachable (' + res.status + ')');
  const data = await res.json();
  if (data.status !== 'ok') throw new Error(data.message || 'Feed error');
  return data.items || [];
}

async function fetchArticles(category){
  const items = await rss2json(CATEGORY_FEEDS[category]);
  return items.slice(0, 12).map(it => ({
    title: stripHtml(it.title),
    link: it.link,
    snippet: stripHtml(it.description || it.content || '').slice(0, 220),
    content: stripHtml(it.content || it.description || ''),
    pubDate: it.pubDate,
    source: 'feed',
  }));
}

async function searchArticles(query){
  const gnews = `https://news.google.com/rss/search?q=${encodeURIComponent(query + ' site:dawn.com')}&hl=en-PK&gl=PK&ceid=PK:en`;
  const items = await rss2json(gnews);
  return items.slice(0, 12).map(it => ({
    title: stripHtml(it.title).replace(/\s*-\s*Dawn.*$/i, ''),
    link: it.link,
    snippet: stripHtml(it.description || '').slice(0, 220),
    content: stripHtml(it.description || ''),
    pubDate: it.pubDate,
    source: 'search',
  }));
}

async function fetchFullArticleText(url){
  try {
    const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
    const res = await fetch(proxy);
    if (!res.ok) throw new Error('proxy failed');
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const selectors = ['.story__content', '.content-inner', 'article', '.story-inner', '#content-area', '.story__body'];
    let text = '';
    for (const sel of selectors) {
      const el = doc.querySelector(sel);
      if (el && el.innerText && el.innerText.trim().length > 200) { text = el.innerText.trim(); break; }
    }
    if (!text) {
      const paras = Array.from(doc.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t.length > 40);
      text = paras.join('\n\n');
    }
    return text || null;
  } catch (e) {
    console.warn('Could not fetch full article text:', e.message);
    return null;
  }
}

/* ---------------------------- FEATURE: WORD EXTRACTION ---------------------------- */
async function extractWordsForArticle(articleText, difficulty, count){
  const sys = `You are an English vocabulary curriculum designer creating learning material for Pakistani ESL learners reading Dawn newspaper. Always respond with strictly valid JSON and nothing else — no markdown fences, no commentary.`;
  const usr = `From the article text below, choose exactly ${count} vocabulary words or short phrases worth learning, matching difficulty level "${difficulty}" (if "Mixed", vary difficulty across Easy/Medium/Hard). Only choose words/phrases that literally appear in the article text, favoring the most useful and less common ones.

Return a JSON array (top-level array, no wrapper object). Each item must have exactly these fields:
- "word": the word or phrase exactly as it appears in the article
- "partOfSpeech": short label, e.g. "Noun", "Verb", "Adjective"
- "ipa": a simple phonetic respelling using capitals for the stressed syllable, like "uhn-SANGK-shuhnd"
- "difficulty": one of "Easy", "Medium", "Hard"
- "meaningUrdu": the meaning written in Urdu script (a few Urdu synonyms separated by commas is ideal)
- "meaningEnglish": a concise one-sentence English definition
- "example": ONE new example sentence using the word, different from how it's used in the article

Article:
"""${articleText.slice(0, 6000)}"""`;
  const parsed = await callAIJSON(sys, usr);
  const arr = Array.isArray(parsed) ? parsed : (parsed.words || parsed.items || []);
  return arr.filter(w => w && w.word);
}

async function lookupWord(word, contextSentence){
  const sys = `You are a dictionary assistant for Pakistani English learners. Respond with strictly valid JSON only, no markdown fences.`;
  const usr = `Give a brief dictionary-style lookup for the word/phrase "${word}" as used in this context: "${contextSentence}".
Return JSON: {"word":"...","partOfSpeech":"...","meaningUrdu":"...","meaningEnglish":"..."}`;
  return await callAIJSON(sys, usr);
}

async function generateStoryForWords(words){
  const sys = `You write short, vivid stories for English learners that naturally use a given vocabulary list. Respond with strictly valid JSON only, no markdown fences.`;
  const usr = `Write a short story (140-220 words) in simple, engaging English that naturally uses ALL of these words at least once: ${words.map(w => w.word).join(', ')}.
Wrap every occurrence of each target word in double asterisks, e.g. **word**.
Return JSON: {"story": "..."}`;
  const parsed = await callAIJSON(sys, usr);
  return parsed.story || parsed.text || '';
}

async function generateSummaryForArticle(articleText, words){
  const sys = `You summarize news articles for English learners concisely and accurately. Respond with strictly valid JSON only, no markdown fences.`;
  const usr = `Summarize the article below in about 100-140 words of simple, clear English. Wrap any occurrence of these vocabulary words in double asterisks like **word**: ${words.map(w => w.word).join(', ')}.
Return JSON: {"summary": "..."}

Article:
"""${articleText.slice(0, 6000)}"""`;
  const parsed = await callAIJSON(sys, usr);
  return parsed.summary || '';
}

async function generateQuizForWords(words){
  const sys = `You create multiple-choice vocabulary quizzes for English learners. Respond with strictly valid JSON only, no markdown fences.`;
  const usr = `Create one multiple-choice question per word testing understanding of its meaning, for these words: ${JSON.stringify(words.map(w => ({ word: w.word, meaning: w.meaningEnglish })))}.
Return a JSON array where each item has: {"word":"...","question":"...","options":["...","...","...","..."],"correctIndex":0}
Vary which option index is correct. Keep questions short.`;
  const parsed = await callAIJSON(sys, usr);
  return Array.isArray(parsed) ? parsed : (parsed.questions || []);
}

/* ---------------------------- SPEECH ---------------------------- */
function speak(text, lang){
  if (!('speechSynthesis' in window)) { toast('Speech playback is not supported in this browser.'); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang || 'en-US';
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

function levenshtein(a, b){
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}
function similarityScore(a, b){
  a = a.trim().toLowerCase(); b = b.trim().toLowerCase();
  if (!a.length && !b.length) return 100;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}

function startSpeakingPractice(targetWord){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toast('Speech recognition needs Chrome or Edge on this device.'); return; }
  const rec = new SR();
  rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 3;
  state.recording = true; state.lastSpeakTarget = targetWord; state.lastSpeakResult = null;
  render();
  rec.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    const score = similarityScore(transcript, targetWord);
    state.speakingHistory.unshift({ word: targetWord, transcript, score, at: now() });
    state.lastSpeakResult = { transcript, score };
    state.recording = false;
    render();
  };
  rec.onerror = () => { state.recording = false; toast("Couldn't hear that clearly — try again."); render(); };
  rec.onend = () => { state.recording = false; render(); };
  try { rec.start(); } catch (e) { state.recording = false; toast('Microphone unavailable.'); render(); }
}

/* ---------------------------- DECK / SPACED REPETITION ---------------------------- */
const BOX_INTERVALS_DAYS = [0, 1, 2, 4, 8, 16, 32];

function isWordSaved(word){ return state.deck.some(d => d.word.toLowerCase() === word.toLowerCase()); }

function saveWordToDeck(w){
  if (isWordSaved(w.word)) return;
  state.deck.unshift({
    word: w.word, partOfSpeech: w.partOfSpeech, ipa: w.ipa, difficulty: w.difficulty,
    meaningUrdu: w.meaningUrdu, meaningEnglish: w.meaningEnglish, example: w.example,
    savedAt: now(), box: 1, nextReviewAt: now(),
  });
  toast(`Saved "${w.word}" to your deck`);
}
function removeWordFromDeck(word){
  state.deck = state.deck.filter(d => d.word.toLowerCase() !== word.toLowerCase());
  render();
}
function toggleSaveWord(w){
  if (isWordSaved(w.word)) removeWordFromDeck(w.word); else saveWordToDeck(w);
  render();
}
function dueWords(){
  const t = now();
  return state.deck.filter(d => (d.nextReviewAt || 0) <= t);
}
function rateReviewWord(word, rating){
  const item = state.deck.find(d => d.word === word);
  if (!item) return;
  if (rating === 'again') item.box = 1;
  else if (rating === 'good') item.box = Math.min(item.box + 1, BOX_INTERVALS_DAYS.length - 1);
  else if (rating === 'easy') item.box = Math.min(item.box + 2, BOX_INTERVALS_DAYS.length - 1);
  const days = BOX_INTERVALS_DAYS[item.box] || 1;
  item.nextReviewAt = now() + days * 24 * 60 * 60 * 1000;
  state.reviewShowBack = false;
  render();
}

/* ---------------------------- OFFLINE SAVE ---------------------------- */
function isArticleOffline(link){ return state.offlineArticles.some(a => a.link === link); }
function saveArticleOffline(){
  const a = state.currentArticle;
  if (!a) return;
  if (isArticleOffline(a.link)) {
    state.offlineArticles = state.offlineArticles.filter(x => x.link !== a.link);
    toast('Removed from offline');
  } else {
    state.offlineArticles.unshift({
      id: uid(), title: a.title, link: a.link, content: a.content,
      words: state.currentWords, story: state.story.text, summary: state.summary.text,
      savedAt: now(),
    });
    toast('Saved offline');
  }
  render();
}
function openOfflineArticle(id){
  const a = state.offlineArticles.find(x => x.id === id);
  if (!a) return;
  state.currentArticle = { title: a.title, link: a.link, content: a.content, source: 'offline' };
  state.currentWords = a.words;
  state.story = { text: a.story, loading: false, error: null };
  state.summary = { text: a.summary, loading: false, error: null };
  state.pictures = {};
  state.currentTab = 'wordlist';
  state.view = 'article';
  render();
}

/* ---------------------------- EXPORT / IMPORT ---------------------------- */
function exportData(){
  const data = { settings: state.settings, deck: state.deck, offlineArticles: state.offlineArticles, speakingHistory: state.speakingHistory, exportedAt: now() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'dawn-vocab-daily-backup.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast('Backup file downloaded');
}
function importData(file){
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data.settings) Object.assign(state.settings, data.settings);
      if (Array.isArray(data.deck)) state.deck = data.deck;
      if (Array.isArray(data.offlineArticles)) state.offlineArticles = data.offlineArticles;
      if (Array.isArray(data.speakingHistory)) state.speakingHistory = data.speakingHistory;
      toast('Backup restored');
      render();
    } catch (e) { toast('That file could not be read.'); }
  };
  reader.readAsText(file);
}

/* ---------------------------- NAVIGATION ---------------------------- */
function setView(v){
  state.view = v;
  if (v === 'home' && state.articles.length === 0 && !state.articlesLoading) loadArticles();
  render();
  window.scrollTo(0,0);
}
function backHome(){ setView('home'); }

async function loadArticles(){
  state.articlesLoading = true; state.articlesError = null; render();
  try {
    state.articles = state.searchBoxValue.trim() ? await searchArticles(state.searchBoxValue.trim()) : await fetchArticles(state.category);
  } catch (e) {
    state.articlesError = e.message || 'Could not load articles.';
  }
  state.articlesLoading = false; render();
}
function selectCategory(cat){
  state.category = cat; state.searchBoxValue = '';
  loadArticles();
}
function runSearch(){
  if (!state.searchBoxValue.trim()) { loadArticles(); return; }
  loadArticles();
}

async function openArticle(idx){
  const a = state.articles[idx];
  if (!a) return;
  state.currentArticle = { title: a.title, link: a.link, content: a.content, source: a.source };
  state.currentWords = null; state.wordsError = null;
  state.story = { text: null, loading: false, error: null };
  state.summary = { text: null, loading: false, error: null };
  state.quiz = { items: null, loading: false, error: null, index: 0, score: 0, answered: null };
  state.pictures = {}; state.currentTab = 'wordlist';
  state.view = 'article';
  render();
  window.scrollTo(0,0);

  // try to get the fuller article body in the background for better AI results
  const fuller = await fetchFullArticleText(a.link);
  if (fuller && fuller.length > (state.currentArticle.content || '').length) {
    state.currentArticle.content = fuller;
  }
  generateWordsForCurrentArticle();
}

function openManualArticle(title, text, link){
  state.currentArticle = { title: title || 'Pasted article', content: text, link: link || '', source: 'manual' };
  state.currentWords = null; state.wordsError = null;
  state.story = { text: null, loading: false, error: null };
  state.summary = { text: null, loading: false, error: null };
  state.quiz = { items: null, loading: false, error: null, index: 0, score: 0, answered: null };
  state.pictures = {}; state.currentTab = 'wordlist';
  state.view = 'article';
  render();
  generateWordsForCurrentArticle();
}

async function generateWordsForCurrentArticle(){
  if (!hasKey()) { state.wordsError = 'NO_KEY'; render(); return; }
  state.wordsLoading = true; state.wordsError = null; render();
  try {
    const words = await extractWordsForArticle(state.currentArticle.content, state.difficulty, state.wordCount);
    state.currentWords = words;
  } catch (e) {
    state.wordsError = e.message;
  }
  state.wordsLoading = false; render();
}

function setTab(tab){
  state.currentTab = tab;
  render();
  if (tab === 'story' && !state.story.text && !state.story.loading) generateStoryTab();
  if (tab === 'summary' && !state.summary.text && !state.summary.loading) generateSummaryTab();
  if (tab === 'practice' && !state.quiz.items && !state.quiz.loading) generateQuizTab();
  if (tab === 'memory' && !state.memory) setupMemoryGame();
}

async function generateStoryTab(){
  if (!state.currentWords?.length) return;
  state.story.loading = true; state.story.error = null; render();
  try { state.story.text = await generateStoryForWords(state.currentWords); }
  catch (e) { state.story.error = e.message; }
  state.story.loading = false; render();
}
async function generateSummaryTab(){
  state.summary.loading = true; state.summary.error = null; render();
  try { state.summary.text = await generateSummaryForArticle(state.currentArticle.content, state.currentWords || []); }
  catch (e) { state.summary.error = e.message; }
  state.summary.loading = false; render();
}
async function generateQuizTab(){
  if (!state.currentWords?.length) return;
  state.quiz.loading = true; state.quiz.error = null; render();
  try { state.quiz.items = await generateQuizForWords(state.currentWords); state.quiz.index = 0; state.quiz.score = 0; state.quiz.answered = null; }
  catch (e) { state.quiz.error = e.message; }
  state.quiz.loading = false; render();
}
function answerQuiz(choiceIdx){
  if (state.quiz.answered != null) return;
  state.quiz.answered = choiceIdx;
  const q = state.quiz.items[state.quiz.index];
  if (choiceIdx === q.correctIndex) state.quiz.score++;
  render();
}
function nextQuiz(){
  state.quiz.index++; state.quiz.answered = null;
  render();
}
function restartQuiz(){ state.quiz.items = null; generateQuizTab(); }

function setupMemoryGame(){
  const words = (state.currentWords || []).slice(0, 6);
  const tiles = [];
  words.forEach((w, i) => {
    tiles.push({ id: 'w'+i, pairId: i, kind: 'word', label: w.word, revealed: false, matched: false });
    tiles.push({ id: 'm'+i, pairId: i, kind: 'meaning', label: w.meaningEnglish, revealed: false, matched: false });
  });
  for (let i = tiles.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1)); [tiles[i], tiles[j]] = [tiles[j], tiles[i]]; }
  state.memory = { tiles, selected: [], moves: 0, startedAt: now(), done: false };
}
function memoryTileClick(id){
  const m = state.memory; if (!m) return;
  const tile = m.tiles.find(t => t.id === id);
  if (!tile || tile.revealed || tile.matched || m.selected.length === 2) return;
  tile.revealed = true; m.selected.push(tile.id);
  render();
  if (m.selected.length === 2) {
    m.moves++;
    const [a, b] = m.selected.map(id2 => m.tiles.find(t => t.id === id2));
    if (a.pairId === b.pairId) {
      a.matched = true; b.matched = true; m.selected = [];
      if (m.tiles.every(t => t.matched)) { m.done = true; toast('Matched them all! 🎉'); }
      render();
    } else {
      setTimeout(() => { a.revealed = false; b.revealed = false; m.selected = []; render(); }, 700);
    }
  }
}

/* Word lookup popover (Article tab tap-any-word) */
async function lookupTappedWord(word, sentence){
  state.lookupPopover = { word, loading: true, data: null, error: null };
  render();
  try {
    const data = await lookupWord(word, sentence);
    state.lookupPopover = { word, loading: false, data, error: null };
  } catch (e) {
    state.lookupPopover = { word, loading: false, data: null, error: e.message };
  }
  render();
}
function closeLookup(){ state.lookupPopover = null; render(); }

/* Pictures */
async function generateAllPictures(){
  if (!state.currentWords?.length) return;
  if (!hasKey()) { toast('Add an API key in Settings first.'); return; }
  state.picturesBusy = true; render();
  for (const w of state.currentWords) {
    if (state.pictures[w.word]) continue;
    state.pictures[w.word] = 'loading'; render();
    const url = await generateImageForWord(w.word, w.meaningEnglish);
    state.pictures[w.word] = url || 'placeholder';
    render();
  }
  state.picturesBusy = false; render();
}

/* ---------------------------- RENDER: HOME ---------------------------- */
function renderHome(){
  const catChips = Object.keys(CATEGORY_FEEDS).map(c =>
    `<button class="chip ${state.category===c && !state.searchBoxValue ? 'active':''}" data-act="selectCategory" data-arg="${c}">${CATEGORY_LABELS[c]}</button>`
  ).join('') + `<button class="chip" data-act="refreshArticles">${ICONS.refresh} Refresh</button>`;

  const diffs = ['Beginner','Intermediate','Advanced','Mixed'];
  const diffPills = diffs.map(d => `<button class="pill-choice ${state.difficulty===d?'selected':''}" data-act="setDifficulty" data-arg="${d}">${d}</button>`).join('');

  let articleList;
  if (state.articlesLoading) {
    articleList = `<div class="loading-row"><div class="spinner"></div> Fetching fresh articles from Dawn…</div>`;
  } else if (state.articlesError) {
    articleList = `<div class="empty-state"><div class="big-emoji">📡</div>${esc(state.articlesError)}<div class="mt-14"><button class="btn btn-outline btn-sm" data-act="refreshArticles">Try again</button></div>
      <div class="mt-14"><button class="btn btn-ghost btn-sm" data-act="openManualPrompt">Or paste an article manually →</button></div></div>`;
  } else if (!state.articles.length) {
    articleList = `<div class="empty-state"><div class="big-emoji">📰</div>No articles yet — hit refresh.</div>`;
  } else {
    articleList = state.articles.map((a, i) => `
      <div class="article-card" data-act="openArticle" data-arg="${i}">
        <div class="article-kicker">${a.source==='search'?'Search result':'Fresh from Dawn'}</div>
        <div class="article-title">${esc(a.title)}</div>
        ${a.snippet ? `<div class="article-snippet">${esc(a.snippet)}</div>` : ''}
        <div class="article-meta">${a.pubDate ? new Date(a.pubDate).toLocaleDateString(undefined,{month:'short',day:'numeric'}) : ''}</div>
      </div>`).join('');
  }

  const dueCount = dueWords().length;

  return `
    <div class="topbar">
      <div class="brandmark"><div class="logo">D</div><div class="name">Dawn Vocab Daily</div></div>
      <div class="topbar-actions">
        <button class="icon-btn" data-act="setView" data-arg="settings" title="Settings">${ICONS.gear}</button>
      </div>
    </div>

    <div class="eyebrow">DAWN VOCAB DAILY</div>
    <h1 class="hero-title">Learn today's English<br>from today's news</h1>
    <p class="hero-sub">Fresh Dawn articles with Urdu meanings, real-voice pronunciation, speaking practice, flashcards, streaks and stories that tie every word together.</p>

    <div class="nav-grid">
      <div class="nav-pill" data-act="setView" data-arg="review">${ICONS.brain} Review ${dueCount ? `<span class="badge">${dueCount}</span>`:''}</div>
      <div class="nav-pill" data-act="setView" data-arg="dashboard">${ICONS.bar} Dashboard</div>
      <div class="nav-pill" data-act="setView" data-arg="deck">${ICONS.layers} My deck <span class="badge">${state.deck.length}</span></div>
      <div class="nav-pill" data-act="openManualPrompt">${ICONS.book} Word story</div>
      <div class="nav-pill" data-act="setView" data-arg="speaking">${ICONS.mic} Speaking history</div>
      <div class="nav-pill" data-act="setView" data-arg="offline">${ICONS.download} Offline <span class="badge">${state.offlineArticles.length}</span></div>
    </div>

    <hr class="divider">

    <div class="search-row">
      <input type="text" id="searchInput" placeholder="Search any topic — economy, cricket…" value="${esc(state.searchBoxValue)}">
      <button class="btn btn-primary" data-act="runSearch">Search</button>
    </div>

    <div class="chip-row">${catChips}</div>

    <div class="card">
      <div class="card-label">WORD DIFFICULTY</div>
      <div class="pill-row">${diffPills}</div>
      <div class="slider-row">
        <div class="card-label">WORDS</div>
        <input type="range" min="5" max="20" step="1" value="${state.wordCount}" id="wordCountSlider">
        <div class="slider-value">${state.wordCount}</div>
      </div>
    </div>

    ${!hasKey() ? `<div class="status-banner status-info">${ICONS.gear} No AI key set yet — <a href="#" data-act="setView" data-arg="settings">add one in Settings</a> to unlock word meanings, stories, quizzes and pictures.</div>` : ''}

    <h2 class="section-title">${state.searchBoxValue ? `Results for "${esc(state.searchBoxValue)}"` : 'Fresh from Dawn today'}</h2>
    ${articleList}

    <div class="footnote">Articles are pulled live from Dawn.com's public RSS feeds. AI features run on the provider you configured in Settings, using your own API key — nothing is billed through this app.</div>
  `;
}

/* ---------------------------- RENDER: ARTICLE ---------------------------- */
const TABS = [
  ['wordlist','Word list'], ['flashcards','Flashcards'], ['pictures','Pictures'],
  ['memory','Memory game'], ['article','Article'], ['practice','Practice'],
  ['story','Story'], ['summary','Summary'],
];

function tagClass(diff){ return diff==='Easy' ? 'tag-easy' : diff==='Hard' ? 'tag-hard' : 'tag-medium'; }

function renderWordList(){
  if (state.wordsLoading) return `<div class="loading-row"><div class="spinner"></div> Reading the article and picking vocabulary…</div>`;
  if (state.wordsError === 'NO_KEY') return renderNoKeyPanel();
  if (state.wordsError) return renderErrorPanel(state.wordsError, 'generateWordsForCurrentArticle');
  if (!state.currentWords?.length) return `<div class="empty-state"><div class="big-emoji">📝</div>No words yet.</div>`;

  return state.currentWords.map(w => {
    const saved = isWordSaved(w.word);
    return `
    <div class="word-card">
      <div class="word-card-head">
        <div>
          <div class="word-title">${esc(w.word)}</div>
          <div class="word-meta">/${esc(w.ipa||'')}/ <span class="dot">·</span> ${esc(w.partOfSpeech||'')} <span class="dot">·</span> <span class="tag ${tagClass(w.difficulty)}">${esc(w.difficulty||'Medium')}</span></div>
        </div>
        <button class="speaker-btn" data-act="speakWord" data-arg="${esc(w.word)}">${ICONS.speaker}</button>
      </div>
      <div class="urdu-meaning">${esc(w.meaningUrdu||'')}</div>
      <div class="en-def">${esc(w.meaningEnglish||'')}</div>
      <div class="example-sentence">${esc(w.example||'')}</div>
      <div class="word-actions">
        <button class="star-btn ${saved?'saved':''}" data-act="toggleSaveWordUI" data-arg="${esc(w.word)}">${saved?ICONS.starFill:ICONS.star} ${saved?'Saved':'Save'}</button>
      </div>
    </div>`;
  }).join('');
}

function renderFlashcards(){
  if (state.wordsLoading) return `<div class="loading-row"><div class="spinner"></div> Preparing flashcards…</div>`;
  if (!state.currentWords?.length) return `<div class="empty-state">Generate word list first.</div>`;
  const i = Math.min(state.flashIndex, state.currentWords.length - 1);
  const w = state.currentWords[i];
  return `
    <div class="flash-wrap">
      <div class="flashcard ${state.flashFlipped?'flipped':''}" data-act="flipFlash">
        <div class="flashcard-inner">
          <div class="flashcard-face front">
            <div class="fc-word">${esc(w.word)}</div>
            <div class="fc-pos">${esc(w.partOfSpeech||'')} · /${esc(w.ipa||'')}/</div>
          </div>
          <div class="flashcard-face back">
            <div class="fc-urdu">${esc(w.meaningUrdu||'')}</div>
            <div class="fc-def">${esc(w.meaningEnglish||'')}</div>
          </div>
        </div>
      </div>
      <div class="flash-controls">
        <button class="btn btn-outline btn-sm" data-act="flashPrev">← Prev</button>
        <div class="flash-progress">${i+1} / ${state.currentWords.length}</div>
        <button class="btn btn-outline btn-sm" data-act="flashNext">Next →</button>
      </div>
      <button class="btn btn-ghost btn-sm" data-act="flashShuffle">Shuffle</button>
    </div>`;
}

function renderPictures(){
  if (!state.currentWords?.length) return `<div class="empty-state">Generate word list first.</div>`;
  const tiles = state.currentWords.map(w => {
    const pic = state.pictures[w.word];
    const colors = ['#1c4a34','#8a5a12','#9b3a22','#2b6b3d','#4a5238','#12261c'];
    const color = colors[Math.abs(hashStr(w.word)) % colors.length];
    let media;
    if (pic === 'loading') media = `<div class="pic-fallback" style="background:${color}"><div class="spinner" style="border-color:rgba(255,255,255,.35);border-top-color:#fff;"></div></div>`;
    else if (pic === 'placeholder' || !pic) media = `<div class="pic-fallback" style="background:${color}">${esc(w.word[0]?.toUpperCase()||'?')}</div>`;
    else media = `<img src="${pic}" alt="${esc(w.word)}">`;
    return `<div class="pic-tile">${media}<div class="pic-word">${esc(w.word)}</div></div>`;
  }).join('');
  return `
    <div class="hint-text">A picture for every word — visual memory makes vocabulary stick far longer.</div>
    <button class="btn btn-primary mt-8" data-act="generateAllPictures" ${state.picturesBusy?'disabled':''}>${ICONS.sparkle} ${state.picturesBusy?'Generating…':'Generate all ('+state.currentWords.length+')'}</button>
    <div class="pic-grid mt-20">${tiles}</div>`;
}
function hashStr(s){ let h=0; for (let i=0;i<s.length;i++){ h = (h<<5)-h+s.charCodeAt(i); h|=0; } return h; }

function renderMemory(){
  if (!state.currentWords?.length) return `<div class="empty-state">Generate word list first.</div>`;
  if (!state.memory) setupMemoryGame();
  const m = state.memory;
  const tiles = m.tiles.map(t => `
    <div class="memory-tile ${t.revealed||t.matched?'revealed':''} ${t.matched?'matched':''}" data-act="memoryTileClick" data-arg="${t.id}">
      ${t.revealed || t.matched ? esc(t.label) : '?'}
    </div>`).join('');
  return `
    <div class="memory-stats"><span>Moves: ${m.moves}</span><span>${m.done ? 'Completed! 🎉' : 'Match each word to its meaning'}</span></div>
    <div class="memory-grid">${tiles}</div>
    <button class="btn btn-outline btn-sm mt-20" data-act="resetMemory">Shuffle again</button>`;
}

function sentenceContext(content, word){
  const idx = content.toLowerCase().indexOf(word.toLowerCase());
  if (idx < 0) return content.slice(0, 200);
  const start = Math.max(0, content.lastIndexOf('.', idx) + 1);
  let end = content.indexOf('.', idx);
  if (end < 0) end = Math.min(content.length, idx + 200);
  return content.slice(start, end + 1).trim();
}

function renderArticleTab(){
  const content = state.currentArticle.content || '';
  const words = state.currentWords || [];
  const curatedSet = new Set(words.map(w => w.word.toLowerCase()));
  const shown = content.slice(0, 4000);
  // Tokenize the RAW text first (word tokens vs everything else), then escape
  // each piece individually — escaping the whole string first and then
  // regex-matching "words" would also match inside HTML entities (e.g. "amp"
  // inside "&amp;"), corrupting them.
  const tokens = shown.split(/([A-Za-z][A-Za-z'-]{2,})/g);
  const html = tokens.map((tok, i) => {
    if (i % 2 === 1) {
      const isCurated = curatedSet.has(tok.toLowerCase());
      const cls = isCurated ? 'w' : 'tapword';
      return `<span class="${cls}" data-act="tapAnyWord" data-arg="${esc(tok)}">${esc(tok)}</span>`;
    }
    return esc(tok);
  }).join('');
  return `
    <div class="panel-head">
      <h2>Original article extract</h2>
      <button class="pill-audio" data-act="speakArticle">${ICONS.speaker} Read aloud</button>
    </div>
    <div class="hint-text">Tap any word to see its detailed Urdu meaning and save it to your deck.</div>
    <div class="reading-text">${html}${content.length>4000?'…':''}</div>
    ${renderLookupPopover()}
  `;
}
function renderLookupPopover(){
  const p = state.lookupPopover;
  if (!p) return '';
  let body;
  if (p.loading) body = `<div class="loading-row"><div class="spinner"></div> Looking up "${esc(p.word)}"…</div>`;
  else if (p.error) body = `<div class="status-banner status-bad">${esc(p.error)}</div>`;
  else if (p.data) {
    const saved = isWordSaved(p.data.word || p.word);
    body = `
    <div class="word-title">${esc(p.data.word||p.word)}</div>
    <div class="word-meta">${esc(p.data.partOfSpeech||'')}</div>
    <div class="urdu-meaning">${esc(p.data.meaningUrdu||'')}</div>
    <div class="en-def">${esc(p.data.meaningEnglish||'')}</div>
    <div class="word-actions"><button class="star-btn ${saved?'saved':''}" data-act="saveLookupWord">${saved?ICONS.starFill:ICONS.star} ${saved?'Saved':'Save to deck'}</button></div>`;
  }
  return `
    <div class="modal-backdrop" data-act="closeLookup">
      <div class="modal-sheet" onclick="event.stopPropagation()">
        <div class="modal-head"><h2>Word lookup</h2><button class="icon-btn" data-act="closeLookup">${ICONS.close}</button></div>
        ${body}
      </div>
    </div>`;
}

function renderPractice(){
  if (state.quiz.loading) return `<div class="loading-row"><div class="spinner"></div> Building your quiz…</div>`;
  if (state.quiz.error) return renderErrorPanel(state.quiz.error, 'restartQuiz');
  if (!state.quiz.items?.length) return `<div class="empty-state">Generate word list first.</div>`;
  if (state.quiz.index >= state.quiz.items.length) {
    return `<div class="center">
      <div class="quiz-score">${state.quiz.score} / ${state.quiz.items.length}</div>
      <div class="hint-text">Quiz complete!</div>
      <button class="btn btn-primary" data-act="restartQuiz">Try again</button>
    </div>`;
  }
  const q = state.quiz.items[state.quiz.index];
  const answered = state.quiz.answered;
  const opts = q.options.map((opt, i) => {
    let cls = '';
    if (answered != null) { if (i === q.correctIndex) cls = 'correct'; else if (i === answered) cls = 'wrong'; }
    return `<button class="quiz-opt ${cls}" data-act="answerQuiz" data-arg="${i}" ${answered!=null?'disabled':''}>${esc(opt)}</button>`;
  }).join('');
  return `
    <div class="quiz-progress">Question ${state.quiz.index+1} of ${state.quiz.items.length} · Score: ${state.quiz.score}</div>
    <div class="quiz-q">${esc(q.question)}</div>
    ${opts}
    ${answered!=null ? `<button class="btn btn-primary mt-14" data-act="nextQuiz">${state.quiz.index+1>=state.quiz.items.length?'See score':'Next'}</button>` : ''}
  `;
}

function mdBoldToHighlight(text){
  return esc(text).replace(/\*\*(.+?)\*\*/g, '<span class="w">$1</span>');
}

function renderStory(){
  if (state.story.loading) return `<div class="loading-row"><div class="spinner"></div> Writing a story with your words…</div>`;
  if (state.story.error) return renderErrorPanel(state.story.error, 'generateStoryTab');
  if (!state.story.text) return `<div class="empty-state">Generate word list first.</div>`;
  return `
    <div class="panel-head"><h2>A story with all your words</h2><button class="pill-audio" data-act="speakStory">${ICONS.speaker} Read aloud</button></div>
    <div class="reading-text">${mdBoldToHighlight(state.story.text)}</div>`;
}
function renderSummary(){
  if (state.summary.loading) return `<div class="loading-row"><div class="spinner"></div> Summarizing the article…</div>`;
  if (state.summary.error) return renderErrorPanel(state.summary.error, 'generateSummaryTab');
  if (!state.summary.text) return `<div class="empty-state">Generate word list first.</div>`;
  return `
    <div class="panel-head"><h2>Article summary</h2><button class="pill-audio" data-act="speakSummary">${ICONS.speaker} Listen</button></div>
    <div class="reading-text">${mdBoldToHighlight(state.summary.text)}</div>`;
}

function renderNoKeyPanel(){
  return `<div class="status-banner status-info">${ICONS.gear} Add your AI API key in Settings to generate word meanings, stories, quizzes and pictures.</div>
    <button class="btn btn-primary" data-act="setView" data-arg="settings">Open Settings</button>`;
}
function renderErrorPanel(msg, retryAct){
  return `<div class="status-banner status-bad">⚠️ ${esc(msg)}</div><button class="btn btn-outline btn-sm" data-act="${retryAct}">Try again</button>`;
}

function renderArticleView(){
  const a = state.currentArticle;
  const saved = isArticleOffline(a.link);
  let tabContent;
  switch (state.currentTab) {
    case 'wordlist': tabContent = renderWordList(); break;
    case 'flashcards': tabContent = renderFlashcards(); break;
    case 'pictures': tabContent = renderPictures(); break;
    case 'memory': tabContent = renderMemory(); break;
    case 'article': tabContent = renderArticleTab(); break;
    case 'practice': tabContent = renderPractice(); break;
    case 'story': tabContent = renderStory(); break;
    case 'summary': tabContent = renderSummary(); break;
    default: tabContent = '';
  }
  const tabs = TABS.map(([key,label]) => `<button class="tab-btn ${state.currentTab===key?'active':''}" data-act="setTab" data-arg="${key}">${label}</button>`).join('');
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back to articles</button>
    <h1 class="detail-title">${esc(a.title)}</h1>
    ${a.link ? `<div class="detail-linkrow"><a href="${esc(a.link)}" target="_blank" rel="noopener">Read the full article on Dawn →</a></div>` : ''}
    ${a.link ? `<button class="save-toggle ${saved?'saved':''}" data-act="saveArticleOffline">${saved?'✓ Saved offline':ICONS.download+' Save offline'}</button>` : ''}
    <div class="tab-row">${tabs}</div>
    <div class="panel">${tabContent}</div>
  `;
}

/* ---------------------------- RENDER: DASHBOARD ---------------------------- */
function renderDashboard(){
  const totalWords = state.deck.length;
  const due = dueWords().length;
  const mastered = state.deck.filter(d => d.box >= 5).length;
  const avgSpeak = state.speakingHistory.length ? Math.round(state.speakingHistory.reduce((s,x)=>s+x.score,0)/state.speakingHistory.length) : 0;
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">Dashboard</h1>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num">${totalWords}</div><div class="stat-label">Words in deck</div></div>
      <div class="stat-card"><div class="stat-num">${due}</div><div class="stat-label">Due for review</div></div>
      <div class="stat-card"><div class="stat-num">${mastered}</div><div class="stat-label">Mastered words</div></div>
      <div class="stat-card"><div class="stat-num">${state.offlineArticles.length}</div><div class="stat-label">Articles saved</div></div>
      <div class="stat-card"><div class="stat-num">${state.speakingHistory.length}</div><div class="stat-label">Speaking attempts</div></div>
      <div class="stat-card"><div class="stat-num">${avgSpeak}%</div><div class="stat-label">Avg. pronunciation match</div></div>
    </div>
    <div class="footnote">All numbers are for this session. Use Settings → Export data to keep your progress permanently.</div>
  `;
}

/* ---------------------------- RENDER: REVIEW ---------------------------- */
function renderReview(){
  const queue = dueWords();
  if (!queue.length) {
    return `<button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
      <h1 class="detail-title">Review</h1>
      <div class="empty-state"><div class="big-emoji">✅</div>Nothing due right now. Save more words from articles, or check back later.</div>`;
  }
  const i = Math.min(state.reviewIndex, queue.length - 1);
  const w = queue[i];
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">Review</h1>
    <div class="quiz-progress">${i+1} of ${queue.length} due</div>
    <div class="panel center">
      <div class="word-title">${esc(w.word)}</div>
      <div class="word-meta">${esc(w.partOfSpeech||'')} · /${esc(w.ipa||'')}/</div>
      ${state.reviewShowBack ? `
        <div class="urdu-meaning">${esc(w.meaningUrdu||'')}</div>
        <div class="en-def">${esc(w.meaningEnglish||'')}</div>
        <div class="example-sentence">${esc(w.example||'')}</div>
        <div class="row-gap mt-20" style="justify-content:center">
          <button class="btn btn-outline btn-sm" data-act="rateReview" data-arg="${esc(w.word)}|again">Again</button>
          <button class="btn btn-outline btn-sm" data-act="rateReview" data-arg="${esc(w.word)}|good">Good</button>
          <button class="btn btn-primary btn-sm" data-act="rateReview" data-arg="${esc(w.word)}|easy">Easy</button>
        </div>` : `
        <button class="btn btn-primary mt-20" data-act="revealReview">Show meaning</button>`}
    </div>`;
}
function revealReview(){ state.reviewShowBack = true; render(); }
function rateReviewUI(arg){
  const [word, rating] = arg.split('|');
  rateReviewWord(word, rating);
  const queue = dueWords();
  if (state.reviewIndex >= queue.length) state.reviewIndex = 0;
  render();
}

/* ---------------------------- RENDER: DECK ---------------------------- */
function renderDeck(){
  if (!state.deck.length) {
    return `<button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
      <h1 class="detail-title">My deck</h1>
      <div class="empty-state"><div class="big-emoji">🗂️</div>No saved words yet. Open an article and tap "Save" on any word.</div>`;
  }
  const rows = state.deck.map(w => `
    <div class="list-row">
      <div class="list-row-main">
        <div class="list-row-title">${esc(w.word)} <span class="tag ${tagClass(w.difficulty)}">${esc(w.difficulty||'')}</span></div>
        <div class="list-row-sub">${esc(w.meaningUrdu||'')} — ${esc(w.meaningEnglish||'')}</div>
      </div>
      <button class="icon-link" data-act="removeWordUI" data-arg="${esc(w.word)}">Remove</button>
    </div>`).join('');
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">My deck (${state.deck.length})</h1>
    <div class="panel">${rows}</div>
    <button class="btn btn-outline btn-block mt-20" data-act="exportData">Export deck &amp; data (JSON)</button>
  `;
}
function removeWordUI(word){ removeWordFromDeck(word); }

/* ---------------------------- RENDER: SPEAKING ---------------------------- */
function renderSpeaking(){
  const words = state.currentWords || (state.deck.length ? state.deck : []);
  const target = state.lastSpeakTarget || (words[0] && words[0].word) || 'vocabulary';
  const history = state.speakingHistory.slice(0, 15).map(h => `
    <div class="list-row">
      <div class="list-row-main">
        <div class="list-row-title">${esc(h.word)}</div>
        <div class="list-row-sub">You said: "${esc(h.transcript)}"</div>
      </div>
      <div class="tag ${h.score>=80?'tag-easy':h.score>=50?'tag-medium':'tag-hard'}">${h.score}%</div>
    </div>`).join('');
  const wordChips = words.slice(0, 12).map(w => `<button class="chip ${target===w.word?'active':''}" data-act="setSpeakTarget" data-arg="${esc(w.word)}">${esc(w.word)}</button>`).join('');
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">Speaking practice</h1>
    <div class="hint-text">Pick a word, then tap the mic and say it aloud. Works best in Chrome or Edge.</div>
    ${wordChips ? `<div class="chip-row">${wordChips}</div>` : ''}
    <div class="panel center">
      <div class="word-title">${esc(target)}</div>
      <button class="speaker-btn" style="margin:10px auto" data-act="speakWord" data-arg="${esc(target)}">${ICONS.speaker}</button>
      <button class="mic-btn ${state.recording?'recording':''}" data-act="recordSpeak" data-arg="${esc(target)}">${ICONS.mic}</button>
      ${state.recording ? `<div class="speak-result">Listening…</div>` : ''}
      ${state.lastSpeakResult ? `
        <div class="speak-result">
          <div class="speak-score">${state.lastSpeakResult.score}%</div>
          You said: "${esc(state.lastSpeakResult.transcript)}"
        </div>` : ''}
    </div>
    <h2 class="section-title">History</h2>
    ${history || `<div class="empty-state">No attempts yet.</div>`}
  `;
}

/* ---------------------------- RENDER: OFFLINE ---------------------------- */
function renderOffline(){
  if (!state.offlineArticles.length) {
    return `<button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
      <h1 class="detail-title">Offline</h1>
      <div class="empty-state"><div class="big-emoji">📥</div>No articles saved offline yet.</div>`;
  }
  const rows = state.offlineArticles.map(a => `
    <div class="article-card" data-act="openOfflineArticle" data-arg="${a.id}">
      <div class="article-title">${esc(a.title)}</div>
      <div class="article-meta">${a.words?.length||0} words · saved ${new Date(a.savedAt).toLocaleDateString()}</div>
    </div>`).join('');
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">Offline (${state.offlineArticles.length})</h1>
    ${rows}`;
}

/* ---------------------------- RENDER: SETTINGS ---------------------------- */
function renderSettings(){
  const providers = Object.keys(PROVIDER_INFO);
  const cards = providers.map(p => `<div class="provider-card ${state.settings.provider===p?'selected':''}" data-act="setProvider" data-arg="${p}">${PROVIDER_INFO[p].label}</div>`).join('')
    + `<div class="provider-card ${state.settings.provider==='custom'?'selected':''}" data-act="setProvider" data-arg="custom">Custom</div>`;
  const info = PROVIDER_INFO[state.settings.provider];
  return `
    <button class="back-btn" data-act="backHome">${ICONS.back} Back</button>
    <h1 class="detail-title">Settings</h1>
    <div class="hint-text">Bring your own API key. It's kept only in this browser tab's memory — never sent anywhere except directly to the provider you pick below. Nothing here costs you anything beyond your own provider usage.</div>

    <div class="card-label mt-20">AI PROVIDER</div>
    <div class="provider-grid">${cards}</div>

    <div class="field">
      <label>API key</label>
      <input type="password" id="apiKeyInput" placeholder="Paste your API key" value="${esc(state.settings.apiKey)}">
      <div class="help">${info ? info.help : 'Set the endpoint below for your custom OpenAI-compatible provider.'}</div>
    </div>

    <div class="field">
      <label>Model (optional override)</label>
      <input type="text" id="modelInput" placeholder="${info ? info.defaultModel : 'model name'}" value="${esc(state.settings.model)}">
    </div>

    ${state.settings.provider==='custom' ? `
    <div class="field">
      <label>Custom endpoint URL (OpenAI-compatible /chat/completions)</label>
      <input type="text" id="customEndpointInput" placeholder="https://your-provider.example.com/v1/chat/completions" value="${esc(state.settings.customEndpoint)}">
    </div>` : ''}

    <button class="btn btn-primary btn-block" data-act="testConnection">Test connection</button>
    <div id="testResult"></div>

    <hr class="divider">
    <div class="card-label">DATA</div>
    <div class="row-gap">
      <button class="btn btn-outline" data-act="exportData">${ICONS.download} Export data</button>
      <button class="btn btn-outline" data-act="triggerImport">Import data</button>
      <input type="file" id="importFile" accept="application/json" style="display:none">
    </div>
    <div class="footnote">Export downloads a JSON file with your settings, saved deck, offline articles and speaking history so you can bring them back next time — this app doesn't use browser storage.</div>
  `;
}
async function testConnection(){
  const box = document.getElementById('testResult');
  if (box) box.innerHTML = `<div class="loading-row"><div class="spinner"></div> Testing…</div>`;
  try {
    const reply = await callAI('You are a helpful assistant.', 'Reply with exactly the word: OK');
    if (box) box.innerHTML = `<div class="status-banner status-ok">Connected ✓ — model replied: "${esc((reply||'').slice(0,60))}"</div>`;
  } catch (e) {
    if (box) box.innerHTML = `<div class="status-banner status-bad">${esc(e.message)}</div>`;
  }
}

/* ---------------------------- MAIN RENDER ---------------------------- */
function render(){
  const app = document.getElementById('app');
  let html;
  switch (state.view) {
    case 'home': html = renderHome(); break;
    case 'article': html = state.currentArticle ? renderArticleView() : renderHome(); break;
    case 'dashboard': html = renderDashboard(); break;
    case 'review': html = renderReview(); break;
    case 'deck': html = renderDeck(); break;
    case 'speaking': html = renderSpeaking(); break;
    case 'offline': html = renderOffline(); break;
    case 'settings': html = renderSettings(); break;
    default: html = renderHome();
  }
  app.innerHTML = html;
  renderToast();
}

/* ---------------------------- ACTIONS ---------------------------- */
const actions = {
  setView: (arg) => setView(arg),
  backHome: () => backHome(),
  selectCategory: (arg) => selectCategory(arg),
  refreshArticles: () => loadArticles(),
  runSearch: () => runSearch(),
  setDifficulty: (arg) => { state.difficulty = arg; render(); },
  openArticle: (arg) => openArticle(parseInt(arg,10)),
  openManualPrompt: () => openManualModal(),
  saveArticleOffline: () => saveArticleOffline(),
  setTab: (arg) => setTab(arg),
  toggleSaveWordUI: (arg) => { const w = state.currentWords.find(x=>x.word===arg); if (w) toggleSaveWord(w); },
  speakWord: (arg) => speak(arg),
  speakArticle: () => speak((state.currentArticle.content||'').slice(0,2000)),
  speakStory: () => speak((state.story.text||'').replace(/\*\*/g,'')),
  speakSummary: () => speak((state.summary.text||'').replace(/\*\*/g,'')),
  flipFlash: () => { state.flashFlipped = !state.flashFlipped; render(); },
  flashPrev: () => { state.flashIndex = Math.max(0, state.flashIndex-1); state.flashFlipped=false; render(); },
  flashNext: () => { state.flashIndex = Math.min(state.currentWords.length-1, state.flashIndex+1); state.flashFlipped=false; render(); },
  flashShuffle: () => { state.currentWords = [...state.currentWords].sort(()=>Math.random()-.5); state.flashIndex=0; state.flashFlipped=false; render(); },
  generateAllPictures: () => generateAllPictures(),
  memoryTileClick: (arg) => memoryTileClick(arg),
  resetMemory: () => { setupMemoryGame(); render(); },
  tapAnyWord: (arg) => {
    const w = (state.currentWords||[]).find(x => x.word.toLowerCase() === arg.toLowerCase());
    if (w) { state.lookupPopover = { word:w.word, loading:false, data:{word:w.word,partOfSpeech:w.partOfSpeech,meaningUrdu:w.meaningUrdu,meaningEnglish:w.meaningEnglish}, error:null }; render(); return; }
    if (!hasKey()) { toast('Add an API key in Settings to look up words.'); return; }
    lookupTappedWord(arg, sentenceContext(state.currentArticle.content, arg));
  },
  closeLookup: () => closeLookup(),
  answerQuiz: (arg) => answerQuiz(parseInt(arg,10)),
  nextQuiz: () => nextQuiz(),
  restartQuiz: () => restartQuiz(),
  generateWordsForCurrentArticle: () => generateWordsForCurrentArticle(),
  generateStoryTab: () => generateStoryTab(),
  generateSummaryTab: () => generateSummaryTab(),
  revealReview: () => revealReview(),
  rateReview: (arg) => rateReviewUI(arg),
  removeWordUI: (arg) => removeWordUI(arg),
  setSpeakTarget: (arg) => { state.lastSpeakTarget = arg; state.lastSpeakResult = null; render(); },
  recordSpeak: (arg) => startSpeakingPractice(arg),
  openOfflineArticle: (arg) => openOfflineArticle(arg),
  setProvider: (arg) => { state.settings.provider = arg; render(); },
  testConnection: () => testConnection(),
  exportData: () => exportData(),
  triggerImport: () => document.getElementById('importFile').click(),
  saveLookupWord: () => {
    const d = state.lookupPopover?.data;
    if (!d) return;
    const word = d.word || state.lookupPopover.word;
    if (isWordSaved(word)) { removeWordFromDeck(word); }
    else saveWordToDeck({ word, partOfSpeech: d.partOfSpeech||'', ipa:'', difficulty:'Medium', meaningUrdu:d.meaningUrdu||'', meaningEnglish:d.meaningEnglish||'', example:'' });
    render();
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  const arg = el.dataset.arg;
  if (actions[act]) { e.preventDefault(); actions[act](arg, el); }
});

document.addEventListener('input', (e) => {
  if (e.target.id === 'wordCountSlider') {
    state.wordCount = parseInt(e.target.value, 10);
    const val = document.querySelector('.slider-value');
    if (val) val.textContent = state.wordCount;
  }
  if (e.target.id === 'searchInput') state.searchBoxValue = e.target.value;
  if (e.target.id === 'apiKeyInput') state.settings.apiKey = e.target.value;
  if (e.target.id === 'modelInput') state.settings.model = e.target.value;
  if (e.target.id === 'customEndpointInput') state.settings.customEndpoint = e.target.value;
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.id === 'searchInput') runSearch();
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'importFile' && e.target.files[0]) importData(e.target.files[0]);
});

/* ---------------------------- MANUAL ARTICLE MODAL ---------------------------- */
function openManualModal(){
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" data-act="closeManualModal">
      <div class="modal-sheet" onclick="event.stopPropagation()">
        <div class="modal-head"><h2>Paste an article</h2><button class="icon-btn" data-act="closeManualModal">${ICONS.close}</button></div>
        <div class="hint-text">If the live Dawn feed isn't reachable from your network, paste any article's title and text here — every other feature works the same.</div>
        <div class="field"><label>Title</label><input type="text" id="manualTitle" placeholder="Article title"></div>
        <div class="field"><label>Article text</label><textarea id="manualText" placeholder="Paste the article text here…" rows="8"></textarea></div>
        <div class="field"><label>Source link (optional)</label><input type="text" id="manualLink" placeholder="https://www.dawn.com/..."></div>
        <button class="btn btn-primary btn-block" data-act="submitManualModal">Start learning from this text</button>
      </div>
    </div>`;
}
function closeManualModal(){ document.getElementById('modal-root').innerHTML = ''; }
function submitManualModal(){
  const title = document.getElementById('manualTitle').value.trim();
  const text = document.getElementById('manualText').value.trim();
  const link = document.getElementById('manualLink').value.trim();
  if (text.length < 40) { toast('Paste a bit more article text first.'); return; }
  closeManualModal();
  openManualArticle(title, text, link);
}
Object.assign(actions, { closeManualModal, submitManualModal });

/* ---------------------------- INIT ---------------------------- */
render();
loadArticles();
