# DClaw Mail — PLAN v1.3

> **Status:** Proposed — awaiting approval before Phase 3 execution.
> **Supersedes:** `PLAN-v1.2.md` (which described a marketing-automation product, conflicting with `REVISED-PRD.md` v2.3).
> **Aligned with:** `REVISED-PRD.md` v2.3 (the authoritative product direction — "DClaw Mail" = AI-native productivity inbox, Superhuman/Front class — NOT Mailchimp/listmonk).
> **Design system:** `colors_and_type.css` (dKube tokens, light-mode only, Poppins, purple `#7660A8`).
> **Architecture rules:** `AGENTS.md` (immutable).
> **Generated:** 2026-05-20 — Phase 2 deliverable of staff-engineer audit.

---

## 0. Knowledge Management Note (Phase 1 carry-over)

**Flag:** No Obsidian Vault or knowledge-graph index exists at repo root. Progress is tracked across Markdown files (`AGENTS.md`, `PLAN-v1.x.md`, `PATCHES.md`, `REVISED-PRD.md`, `docs/`) with no central index.

**Recommendation (Complexity 0 — included below as KM-1):** Add `KNOWLEDGE-INDEX.md` at repo root cross-linking every doc + a `.obsidian/` workspace config so the repo is openable as a vault. Until then, this file (`PLAN-v1.3.md`) is the canonical source of truth for *what to build, in what order*.

---

## 1. YC Gap Analysis (Current State → World-Class Bar)

### Where we are today

| Layer | Reality | Risk |
|---|---|---|
| Backend | FastAPI scaffold + `Base`, `BaseRepository`, health endpoint. `backend/app/api/v1/email.py` returns **hardcoded mock strings** and is **not even wired** into `app/api/main.py`. No models, no schemas, no migrations beyond bootstrap. | 🔴 Violates AGENTS.md "NO MOCK DATA". Zero real product. |
| Frontend | One dashboard page using **red `#DC2626` and Inter font** — directly contradicting `colors_and_type.css` (Poppins, purple `#7660A8`). Dark-mode tokens defined in `globals.css` even though product is light-only. No real data fetching. | 🔴 Brand violation; not light-mode-locked. |
| AI | None implemented. PRD demands an AI Copilot on every page (YC S25/W26 RFS mandate). | 🔴 Missing the core differentiator. |
| Auth | None (Logto required by PRD §4). | 🔴 Cannot ship multi-tenant. |
| Email connectivity | None. PRD demands Gmail/Outlook/IMAP. | 🔴 Core value prop absent. |
| Tests | One health test. | 🟡 70% coverage target far away. |
| DPanel manifest | Missing (`frontend/public/dclaw-manifest.json`). | 🟡 Cannot register in DPanel. |
| Port consistency | `AGENTS.md` says 8022/3022; `docker-compose.yml` uses 8110/3024; `REVISED-PRD.md` says 18162/3092. | 🟡 Will silently break Docker/K8s. |
| Knowledge graph | Absent. | 🟡 Progress untraceable at scale. |
| `PRODUCT-SPEC.md` | Currently a **CRM spec**, not Email. | 🟡 Will mislead future agents. |

### YC-grade gaps (competitive advantage, problem-solving, scalability)

A high-potential YC submission in the email category must do **at least one** of three things 10× better than Gmail/Outlook:

1. **Time-to-inbox-zero compression.** Knowledge workers spend 28% of their week on email. The product must measurably reduce that — via AI triage, batched processing, and one-click actions surfaced in-context.
2. **Cross-account intelligence.** Unify mail across providers + cross-reference with CRM/calendar/docs (the DClaw stack) so the user never context-switches. This is the *moat*: no competitor has the rest of the DClaw apps.
3. **Action-oriented, not message-oriented.** Each email becomes a tracked task with SLA, owner, follow-up — closer to a CRM/Linear hybrid than to a folder UI.

**Current product hits 0 of these.** This roadmap fixes that.

### Strategic positioning (one-liner for the YC application)

> *"DClaw Mail is the inbox layer of the DClaw stack: an AI copilot that turns every email into a tracked next-action, unifies Gmail/Outlook/IMAP behind one keyboard-first UI, and writes/sends/follows-up so knowledge workers reclaim 10+ hours a week."*

---

## 2. Complexity Legend

| Tier | Meaning | Build velocity |
|---|---|---|
| **0** | Low complexity / foundational. Pure plumbing, scaffolding fixes, schema setup, design-system enforcement, simple CRUD. *Should ship in hours.* |
| **1** | Medium complexity / core differentiator. Real domain logic — IMAP sync, threading, triage rules, templates, tracking. *Ships in days.* |
| **2** | High complexity / advanced. LLM/AI features, embeddings, semantic search, calendar extraction, security scanning, workflow engine. *Ships in 1–3 weeks each.* |

---

## 3. Prioritized Roadmap

> Each feature lists: **What** · **Why (user/YC value)** · **Acceptance criteria** · **Touched files** · **Tests required**.
> Order within a tier is the build order. Do not skip ahead.

---

### TIER 0 — Foundational quick wins (ship first, all in week 1)

#### KM-1 · Knowledge index + Obsidian workspace · `Complexity 0`
- **What:** Create `KNOWLEDGE-INDEX.md` linking every top-level doc (PRD, AGENTS, PLAN, PATCHES, design-system) with one-line summaries. Optionally seed a minimal `.obsidian/workspace.json`.
- **Why:** Phase-1 flag. Without it, agents drift.
- **Acceptance:** Every `.md` at root is referenced; `colors_and_type.css` referenced; PLAN-v1.2 marked superseded.
- **Tests:** N/A (docs).

#### F0-1 · Fix product identity documents · `Complexity 0`
- **What:** Rewrite `PRODUCT-SPEC.md` from CRM to **DClaw Mail** (per REVISED-PRD §1). Add a deprecation banner to `PLAN-v1.2.md` pointing to v1.3. Resolve port conflict: lock to **backend 8022 / frontend 3022 / DB `dclaw_email`** (matches AGENTS.md, the canonical doc). Update `docker-compose.yml`, `.env.example`, `frontend/package.json` (`dev` script port), `frontend/Dockerfile`, `frontend/next.config.js`, healthcheck URLs, and the healthcheck wget target.
- **Why:** Three documents currently disagree on ports. CI and Docker will silently break.
- **Acceptance:** `grep -rE "8110|3024|18162|3092"` returns zero hits. `docker compose config` passes.
- **Tests:** `docker compose config` smoke check in CI.

#### F0-2 · Light-mode lock + dKube design tokens in frontend · `Complexity 0`
- **What:**
  1. Copy `colors_and_type.css` into `frontend/src/styles/dk-tokens.css` and import from `globals.css`.
  2. Bundle Poppins via `next/font/google` (replace Inter in `layout.tsx`).
  3. Delete `.dark { ... }` block in `globals.css`; remove `darkMode: ["class"]` from `tailwind.config.ts` (set `darkMode: false`).
  4. Map shadcn HSL variables → dKube tokens (e.g. `--primary: 263 28% 51%` ≈ `#7660A8`; `--background: 0 0% 100%`; `--foreground` from `--dk-ink`).
  5. Rewrite `frontend/src/app/dashboard/page.tsx` and `page.tsx` to use only dk-* tokens / Tailwind utilities — purge all `#DC2626` red.
- **Why:** Brand consistency. PRD §1 brand color is `#3B82F6` BUT design-system file (`colors_and_type.css`) is canonical for visual tokens; prefer dKube purple — flag for owner review if PRD blue must win, but proceed with purple per the explicit Phase-2 instruction "strictly enforce … color variables defined here".
- **Acceptance:** `grep -ri "#DC2626\|Inter\|dark:" frontend/src` returns zero hits. Visual smoke test renders Poppins + purple buttons.
- **Tests:** `npm run build` passes; Playwright snapshot (deferred to T1).

#### F0-3 · Replace mock email endpoint with a real domain model · `Complexity 0`
- **What:** Build the foundational entities required by *every* feature below:
  - `Account` (user-connected email account: provider/email/oauth-tokens stub)
  - `Message` (email message: account_id FK, message_id, thread_id, from/to/cc, subject, body_text, body_html, snippet, received_at, is_read, is_starred, is_archived, labels JSONB, raw_size_bytes)
  - `Thread` (thread_id PK, account_id FK, subject, last_message_at, message_count, unread_count)
  - `Label` (account_id FK, name, color, is_system)
  - `Contact` (account_id FK, email unique, display_name, last_interaction_at, interaction_count)
  Add SQLAlchemy 2.0 `Mapped[]` models (inheriting `Base` from `app.models.base`), Pydantic v2 schemas with `ConfigDict(from_attributes=True)`, repositories extending `BaseRepository`, and routers under `app/api/v1/`. Delete the existing `email.py` mock router. Wire all new routers in `app/api/main.py`. Generate initial Alembic migration.
- **Why:** PRD §5 P0.2 (Unified Inbox) cannot exist without messages/threads. Replaces the existing mock-data violation.
- **Acceptance:** `pytest` green; `alembic upgrade head` creates all 5 tables; CRUD endpoints return real rows.
- **Tests:** Per-repo unit tests (count, get, create, delete) and per-router endpoint tests with `httpx.AsyncClient` + `ASGITransport`. Coverage ≥ 70% on new code.

#### F0-4 · DPanel manifest + healthcheck contract · `Complexity 0`
- **What:** Create `frontend/public/dclaw-manifest.json` (id `email`, name `DClaw Mail`, category `Email`, color `#7660A8`, ports 8022/3022, icon TBD). Confirm backend `/health/` returns `{"status":"ok"}` and frontend `/` 200s for the wget healthcheck.
- **Why:** REVISED-PRD §2.1 gap.
- **Acceptance:** `curl localhost:8022/health/` → `{"status":"ok"}`; manifest validates against DPanel schema if available.
- **Tests:** Health endpoint test already present; add manifest JSON-schema test.

#### F0-5 · Pre-built UI shell (sidebar + top bar + main pane) · `Complexity 0`
- **What:** Build the three-pane layout that every later screen reuses: collapsible left sidebar (accounts + labels), middle list pane, right reading pane. Use only the pre-built components in `frontend/src/components/ui/`. Keyboard shortcuts shell (j/k navigation, gmail-style) wired with `useEffect` but no-op until F1-2.
- **Why:** Every P0 feature renders inside this shell.
- **Acceptance:** `npm run build` passes; manual nav between empty panes works.
- **Tests:** `npm run lint`; React Testing Library smoke test for the layout.

#### F0-6 · Frontend API client typed against backend OpenAPI · `Complexity 0`
- **What:** Extend `frontend/src/lib/api.ts` with typed functions for every endpoint from F0-3: `listMessages`, `getThread`, `listLabels`, etc. Add `NEXT_PUBLIC_API_URL` to `frontend/Dockerfile` as `ARG` (verify it's already declared per AGENTS.md anti-pattern list).
- **Why:** Strict TypeScript + no `any`.
- **Acceptance:** `npm run lint` 0 errors; `tsc --noEmit` clean.
- **Tests:** Type-check; one vitest test mocking `fetch`.

---

### TIER 1 — Core differentiators (weeks 2–4)

#### F1-1 · IMAP/Gmail/Outlook account connection + sync · `Complexity 1`
- **What:** OAuth-stub-first design: model stores provider, encrypted refresh-token placeholder, and a `sync_state` JSON (last UID seen, cursor). Add `app/services/imap_sync.py` that pulls headers + bodies into `Message` and groups by `thread_id`. Background sync triggered by a `POST /api/v1/accounts/{id}/sync` endpoint; later replaced with a worker.
- **Why:** PRD P0.2 — unified inbox. Without it, the app is a UI over an empty DB.
- **Acceptance:** Local mailcatcher / GreenMail fixture seeded with 50 messages; `POST .../sync` ingests all 50; threads collapse correctly.
- **Tests:** Integration test against `aiosmtpd` or `greenmail` Docker container; unit tests for thread-grouping algorithm.

#### F1-2 · Keyboard-first inbox view (j/k/e/r/#) · `Complexity 1`
- **What:** Wire Superhuman-style hotkeys to the F0-5 shell: j/k navigate; e archive; # delete; r reply; / search; gi inbox; gs starred. Visible cheatsheet (`?`).
- **Why:** Time-to-inbox-zero — the YC moat #1.
- **Acceptance:** Cypress/Playwright scenario: 50 messages → user archives all via `e` in under 30s.
- **Tests:** Playwright scenario; unit test the keymap reducer.

#### F1-3 · Smart Filters & Labels (rules engine) · `Complexity 1`
- **What:** `Rule` model: `account_id`, `name`, `conditions` (JSON: from/subject_regex/has_attachment), `actions` (JSON: add_label/archive/star). Rule evaluator runs on every new ingested message. Manual UI to create rules; CRUD endpoints.
- **Why:** PRD P0.3 — foundation for AI auto-categorization (F2-2).
- **Acceptance:** Create rule "from:billing@\* → label:Finance, archive" → seed a matching message → ingest → message lands archived with Finance label.
- **Tests:** Pure-function rule-evaluator unit tests; integration test through ingest path.

#### F1-4 · Email Templates & Snippets · `Complexity 1`
- **What:** `Template` model (name, body_markdown, variables JSON). Variable interpolation engine (`{{firstName}}`, `{{lastDealAmount}}`). Composer UI dropdown to insert.
- **Why:** PRD P0.4. Sets up F2-4 (AI template optimization).
- **Acceptance:** Create template with `{{firstName}}`; compose email → choose template → variables replaced with contact data.
- **Tests:** Repo + router tests; rendering edge cases (missing var, escaping HTML).

#### F1-5 · Send Later & Reminders · `Complexity 1`
- **What:** `ScheduledSend` and `Reminder` tables. Background poller (asyncio task in `lifespan`) fires due items. `POST /api/v1/messages/{id}/snooze` and `POST .../schedule_send`.
- **Why:** PRD P1.1; near-zero AI required, immediate user value.
- **Acceptance:** Schedule a send for `now()+5s`; observe it dispatched.
- **Tests:** Time-warped tests with `freezegun`.

#### F1-6 · Open/click tracking (pixel + redirect) · `Complexity 1`
- **What:** Outbound messages get a 1×1 GIF and link rewriting through `/t/{event_id}`. `MessageEvent` table (opened_at/clicked_at/url). Privacy: opt-out per recipient via header token.
- **Why:** PRD P1.2.
- **Acceptance:** Send tracked message to MailHog → curl the pixel URL → event recorded → dashboard shows open.
- **Tests:** Route tests for `/t/*`; rate-limit / dedup logic tests.

#### F1-7 · Auth via Logto (JWT validator) · `Complexity 1`
- **What:** Middleware in `backend/app/core/auth.py` that validates Logto-issued JWTs (JWKS fetch + cache). Frontend redirects to Logto login. `User` model tied to `Account`.
- **Why:** REVISED-PRD §4 mandates Logto. Without it, multi-tenant is impossible.
- **Acceptance:** Unauth request to `/api/v1/messages` → 401. Valid JWT → 200.
- **Tests:** Stub JWKS in tests; positive + negative auth cases for every router.

---

### TIER 2 — Advanced AI & scale features (week 5+)

#### F2-1 · AI Email Copilot (compose + summarize + priority) · `Complexity 2`
- **What:** `app/services/copilot.py` with three skills:
  - `draft(thread_context, instruction) → markdown` — uses Ollama locally, falls back to OpenRouter (per PRD §4 LLM rules).
  - `summarize(thread) → 1-sentence + 3-bullet`.
  - `priority(message) → {high|normal|low, reason}` — few-shot prompt with user feedback loop.
  Floating chat sidebar present on every page (per PRD §9 mandate). Endpoints: `/api/v1/ai/draft`, `/ai/summarize`, `/ai/priority`. Streaming responses (SSE).
- **Why:** PRD P0.1 + YC RFS Copilot mandate. *This is the product.*
- **Acceptance:** Draft latency < 5s; priority accuracy > 85% on a 100-message labelled fixture.
- **Tests:** Mocked LLM provider in unit tests; golden-output regression on fixture; latency benchmark in CI nightly.

#### F2-2 · AI Smart Filters (auto-categorization with feedback) · `Complexity 2`
- **What:** Embedding-based classifier on top of F1-3 rules. User accepts/rejects → stored as feedback → model retrains weekly. Use `sentence-transformers/all-MiniLM-L6-v2` locally or OpenRouter embeddings.
- **Why:** PRD P0.3 AI component.
- **Acceptance:** ≥ 80% accuracy on a labelled dev set after 50 corrections.
- **Tests:** Offline evaluation harness + accuracy assertion in CI.

#### F2-3 · Predictive optimal send-time · `Complexity 2`
- **What:** Per-recipient time-series model on historical opens (from F1-6 events) → predicts P(open) for next 24h × hourly buckets → recommends slot. Toggle in scheduler.
- **Why:** PRD P1.1 AI angle.
- **Acceptance:** Within ±2hr of empirically best slot on a back-test.
- **Tests:** Back-test harness; statistical assertion on hold-out set.

#### F2-4 · AI semantic search (pgvector) · `Complexity 2`
- **What:** Add `pgvector` extension; `Message.embedding vector(384)`. Background job embeds every message on ingest. `POST /api/v1/search` with hybrid (BM25 + cosine) ranking. Frontend natural-language search bar.
- **Why:** PRD P2.1 — strongest moat once corpora grow.
- **Acceptance:** Search "what did Sarah say about the Q2 plan" across 10k seeded messages in < 1s; top-3 relevance ≥ 80% on labelled queries.
- **Tests:** Recall@10 ≥ 0.8 against curated query set.

#### F2-5 · Calendar integration (slot extraction) · `Complexity 2`
- **What:** LLM extracts proposed times from message body (`"Tuesday 2pm PT works"`), checks DClaw Calendar API for conflicts, proposes free slots. One-click insert into draft.
- **Why:** PRD P1.4. Cross-app moat — leverages another DClaw app.
- **Acceptance:** Recognize 3+ time formats (relative/absolute/range); insert ICS-compatible event.
- **Tests:** Golden parses against 50 real-world examples.

#### F2-6 · Shared team inboxes + collision detection · `Complexity 2`
- **What:** `TeamInbox` model (multiple users → one Account). Presence channel via SSE or websockets shows "Alice is replying to this thread". AI workload balancer assigns new threads by skill (regex-on-subject for v1, embedding-similarity in v2).
- **Why:** PRD P1.3. Unlocks the "Front" market.
- **Acceptance:** Two browser sessions on same inbox: opening the same thread shows the collision banner within 2s.
- **Tests:** Multi-client integration test with two `AsyncClient`s.

#### F2-7 · Email automation (visual workflow builder) · `Complexity 2`
- **What:** DAG of triggers → conditions → actions (similar to `n8n` but inside the inbox). Triggers: new message matching X, time-based, webhook. Actions: reply with template, add label, create CRM deal in DClaw-CRM.
- **Why:** PRD P2.2.
- **Acceptance:** Build a 3-step workflow in UI → fire trigger → all three actions run in order, observable in audit log.
- **Tests:** Engine unit tests (each trigger/action); E2E workflow.

#### F2-8 · Phishing/malicious-link scanning · `Complexity 2`
- **What:** AI phishing classifier (zero-shot LLM prompt + signal features: SPF/DKIM fail, domain-age, lookalike-domain via levenshtein). Quarantine label + dashboard.
- **Why:** PRD P2.3.
- **Acceptance:** ≥ 95% recall on a public phishing-corpus sample; FPR < 2%.
- **Tests:** Precision/recall harness in CI.

#### F2-9 · Compliance archiving + legal hold · `Complexity 2`
- **What:** Immutable archive table (append-only), per-domain retention policy, one-click legal hold tag that disables deletion. AI PII redaction on export.
- **Why:** PRD P2.4 — unlocks regulated industries.
- **Acceptance:** Set 90-day retention; messages older auto-purge unless on hold; export redacts SSN/PII.
- **Tests:** Time-warped retention tests; redaction regex + LLM tests.

---

## 4. Execution sequencing (Phase-3 build order)

The implementation order is **strictly**:

```
KM-1 → F0-1 → F0-2 → F0-3 → F0-4 → F0-5 → F0-6   (Tier 0 — week 1)
→ F1-7 (auth) → F1-1 → F1-2 → F1-3 → F1-4 → F1-5 → F1-6   (Tier 1 — weeks 2–4)
→ F2-1 (Copilot — THE differentiator) → F2-4 (semantic search) → F2-2 → F2-3 → F2-5 → F2-6 → F2-7 → F2-8 → F2-9   (Tier 2 — week 5+)
```

Auth (F1-7) is pulled to the front of Tier 1 because **every other Tier-1+ endpoint depends on knowing the user**.

---

## 5. Per-feature Definition of Done (validation rule per AGENTS.md + Phase-3 instructions)

Before any feature is marked ✅, all of these must pass:

1. `ruff check backend/` — 0 errors.
2. `npm run lint` — 0 errors.
3. New unit + integration tests written; `pytest -q` green.
4. Coverage on touched files ≥ 70% (`pytest --cov=app --cov-report=term-missing`).
5. `npm run build` — exits 0.
6. `docker compose config` — valid.
7. `alembic upgrade head` from clean DB — succeeds.
8. Conventional commit pushed to a feature branch.
9. Touched files comply with `colors_and_type.css` (light only, Poppins, dk-* tokens).

---

## 6. Non-functional commitments (carried from PRD)

- Backend tests ≥ 70% coverage at every milestone.
- All endpoints async; no sync DB calls.
- All models inherit from `app.models.base.Base` — never `declarative_base()`.
- All `default=` callables in `mapped_column` (never `default_factory`).
- All naive UTC datetimes via `app.core.utils.utc_now()`.
- No hardcoded `localhost:PORT` in frontend — only `NEXT_PUBLIC_API_URL`.
- Healthchecks: backend uses `python -c "import urllib.request; urllib.request.urlopen(...)"`; frontend uses `wget -q --spider`.
- Light mode only — `.dark { ... }` block in `globals.css` removed; `darkMode: false` in tailwind config.

---

## 7. Out of scope (explicitly deferred past v1.3)

- SMS companion channel (was v1.2 §10) — not in REVISED-PRD.
- Mass-marketing campaign builder, drip sequences, A/B testing (was v1.2 §P0–P1) — wrong product direction per REVISED-PRD; if needed later, ships as a *separate* DClaw app (`dclaw-broadcast`).
- Heatmaps & spam-filter testing (v1.2 §11–12) — only relevant if/when broadcast app exists.
- Mobile native apps — web-first.

---

## 8. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| LLM latency kills the Copilot UX | High | Stream tokens via SSE; cache priority scores; local Ollama default. |
| IMAP sync flakiness vs Gmail rate limits | High | Per-account exponential backoff + cursor persistence; tests against GreenMail. |
| Brand-color collision (PRD says blue `#3B82F6`, design system says purple `#7660A8`) | Medium | This plan uses purple per the user's explicit Phase-2 instruction to enforce `colors_and_type.css`. Flag to product owner for tie-break before F0-2 lands. |
| Scope creep into marketing automation | Medium | Section 7 above + retire `PLAN-v1.2.md` in F0-1. |
| Auth migration if Logto changes API | Low | Pin JWKS endpoint, version SDK. |

---

## 9. What approval of this plan authorizes

Approving this file authorizes Phase 3 to:

1. Initialize/seed the local PostgreSQL `dclaw_email` database.
2. Execute features **strictly in the order in §4**, starting with `KM-1`.
3. After each feature, run the §5 validation checklist before moving on.
4. Stop and ask for human input only if a blocking external dependency surfaces (e.g., Logto credentials, Gmail OAuth secrets).

---

*End of PLAN-v1.3.*
