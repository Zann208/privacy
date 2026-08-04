# PRIV — Privacy Technologies Study Console

An offline-first, single-file study console for **ISNE 269497 · The Cult of Privacy Technologies** at Chiang Mai University.

**→ [Live demo](https://zann208.github.io/privacy/)**

One HTML file. No framework, no build step, no dependencies, no network calls. Open it and it works — on a laptop with no internet, in an exam hall, on a phone.

---

## What's inside

| Section | What it does |
|---|---|
| **Home** | The course in one screen: the two topics, and the four-step map — protect, attack, measure, reduce |
| **Notes** | 15 collapsible ideas across both topics. Topic 1: the 5 properties, the attacks that break them, the 5 vulnerable components, the 4 re-identification attacks. Topic 2: what makes data risky, k-anonymity and l-diversity, threat models, the privacy spectrum, entropy, IG and RIG |
| **Cases** | 11 real breaches from the slides — Cambridge Analytica, WannaCry, the GitHub DDoS, AOL search logs, the Netflix prize, Optus, Medibank, the casino fish tank — each with the property that broke and the lesson |
| **Drills** | 36 flashcards filterable by topic, plus a 20-question mock exam that explains every answer |
| **Cheat sheet** | Every table and number on one screen, for the ten minutes before the exam |

---

## Features

**An interactive entropy lab.** Drag p(heads) and watch H(X) move in real time — the curve peaks at exactly 1 bit when p = 0.5 and collapses to 0 when the outcome is certain. The formula stops being abstract once you have pushed the slider.

**Command palette.** `Ctrl K` searches every note, case, flashcard and cheat-sheet block at once and jumps straight to it — opening the right accordion and switching topic on the way.

**Keyboard-first drilling.** `Space` flips a card, `←/→` moves, `G` marks it known, `A` marks it for another pass. `J` / `K` walk the context rail through the notes.

**Everything persists.** Theme, current tab, which topic you were reading, and your best mock-exam score — all in `localStorage`, on your device only.

**Light and dark.** Both themes are contrast-checked, and every colour comes from a CSS variable so the two stay in step.

---

## Tech

Vanilla HTML · CSS custom properties for theming · plain JavaScript · Canvas 2D · localStorage

No React, no Tailwind, no bundler. ~92 KB, one file, zero dependencies.

## Run it

```bash
git clone https://github.com/Zann208/privacy.git
cd privacy
open index.html          # that's it
```

## Accessibility

Skip link, `<main>` landmark, visible focus rings, full keyboard navigation, and `prefers-reduced-motion` respected — the animated background disables itself entirely.

---

## Note on content

The notes are my own restatement of course concepts, written for comprehension rather than transcription. Lecture slides and figures remain the property of the course instructor and are not redistributed here.

---

Built by **Zann** — Information Systems & Network Engineering, Chiang Mai University
[Portfolio](https://zann208.github.io) · [All courses](https://zann208.github.io/study/) · [Email](mailto:thuhtoozan_1@cmu.ac.th)
