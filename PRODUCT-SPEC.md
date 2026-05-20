# PRODUCT-SPEC: DClaw Mail

> This document tells your coding agents **WHAT** to build.
> It is separate from [`AGENTS.md`](./AGENTS.md) (HOW to build) and [`PLAN-v1.3.md`](./PLAN-v1.3.md) (WHEN to build).
> Single source of truth for product direction: [`REVISED-PRD.md`](./REVISED-PRD.md) v2.3.

## Overview

| Field | Value |
|-------|-------|
| **App Name** | DClaw Mail |
| **App ID** | `email` |
| **Domain** | AI-native productivity inbox (class of Superhuman, Front, Missive) |
| **Target User** | Knowledge workers spending 25%+ of their week on email; small teams running shared inboxes (support@, sales@) |
| **Tagline** | *Smart inbox — turn every email into a tracked next action* |
| **Brand color** | `#7660A8` (dKube purple — see `colors_and_type.css`) |
| **Backend Port** | `8022` |
| **Frontend Port** | `3022` |
| **Database** | `dclaw_email` |
| **API base path** | `/api/v1` |

## Differentiators (why this exists)

1. **Time-to-inbox-zero compression** — keyboard-first UI, batched triage, one-key actions.
2. **Cross-app intelligence** — unifies Gmail/Outlook/IMAP **and** cross-references the rest of the DClaw stack (CRM contacts, Calendar slots, Doc snippets) so the user never context-switches.
3. **Action-oriented, not message-oriented** — every email becomes a tracked task with owner, follow-up SLA, and outcome.

## Core Entities (v1 — see `PLAN-v1.3.md` F0-3 for shipping order)

### Account
```
Account
├── id: UUID (PK)
├── user_id: UUID (FK → User, ondelete=CASCADE)            # multi-tenant
├── provider: enum ["gmail", "outlook", "imap"] (required)
├── email_address: str (required, unique per user)
├── display_name: str (optional)
├── oauth_refresh_token: str (encrypted, optional)
├── imap_host: str (optional)
├── imap_port: int (optional)
├── sync_state: JSON (cursor, last_uid, errors) (default {})
├── is_active: bool (default true)
├── last_synced_at: datetime (optional)
├── created_at: datetime
└── updated_at: datetime
```

### Thread
```
Thread
├── id: UUID (PK)
├── account_id: UUID (FK → Account, ondelete=CASCADE)
├── provider_thread_id: str (required)                     # gmail/outlook thread id
├── subject: str (required)
├── snippet: str (last 200 chars of latest message)
├── last_message_at: datetime (required)
├── message_count: int (default 0)
├── unread_count: int (default 0)
├── is_starred: bool (default false)
├── is_archived: bool (default false)
├── created_at: datetime
└── updated_at: datetime
UNIQUE (account_id, provider_thread_id)
```

### Message
```
Message
├── id: UUID (PK)
├── thread_id: UUID (FK → Thread, ondelete=CASCADE)
├── account_id: UUID (FK → Account, ondelete=CASCADE)
├── provider_message_id: str (required)
├── from_address: str (required)
├── from_name: str (optional)
├── to_addresses: JSON list[str] (default [])
├── cc_addresses: JSON list[str] (default [])
├── bcc_addresses: JSON list[str] (default [])
├── subject: str (required)
├── body_text: str (optional)
├── body_html: str (optional)
├── snippet: str (optional)
├── received_at: datetime (required)
├── is_read: bool (default false)
├── is_starred: bool (default false)
├── is_archived: bool (default false)
├── is_draft: bool (default false)
├── labels: JSON list[str] (default [])
├── raw_size_bytes: int (default 0)
├── created_at: datetime
└── updated_at: datetime
UNIQUE (account_id, provider_message_id)
```

### Label
```
Label
├── id: UUID (PK)
├── account_id: UUID (FK → Account, ondelete=CASCADE)
├── name: str (required)
├── color: str (hex, default "#7660A8")
├── is_system: bool (default false)                        # Inbox/Sent/Drafts/Spam/Trash
├── created_at: datetime
└── updated_at: datetime
UNIQUE (account_id, name)
```

### Contact
```
Contact
├── id: UUID (PK)
├── account_id: UUID (FK → Account, ondelete=CASCADE)
├── email_address: str (required)
├── display_name: str (optional)
├── last_interaction_at: datetime (optional)
├── interaction_count: int (default 0)
├── created_at: datetime
└── updated_at: datetime
UNIQUE (account_id, email_address)
```

(Later: `Rule`, `Template`, `ScheduledSend`, `Reminder`, `MessageEvent`, `TeamInbox` — see `PLAN-v1.3.md` Tier 1+.)

## User Stories / Screens (v1)

### Screen 1: Inbox (three-pane)
- Left sidebar: account switcher, system labels (Inbox/Starred/Sent/Drafts/Archive), user labels, AI Copilot button.
- Middle pane: thread list (sender, subject, snippet, time, unread dot). Keyboard nav `j/k`.
- Right pane: thread reading view with reply box and Copilot suggestions.
- Top bar: command palette (`/`), compose button, profile menu.

### Screen 2: Compose
- Recipient autocomplete from Contacts.
- Subject, rich body, attachments stub.
- Template insertion dropdown.
- "Send" / "Send later" / "Save draft" actions.
- AI Copilot side panel: tone, length, summarize-original.

### Screen 3: Settings → Accounts
- Connect Gmail / Outlook / IMAP (OAuth or manual).
- View sync status, last sync time, error log.
- Disconnect / re-sync buttons.

### Screen 4: Settings → Rules & Labels
- List rules (conditions → actions).
- Create/edit/delete.
- Reorder priority.

### Screen 5: Settings → Templates
- CRUD templates with variable preview.

### Screen 6: Search (P2)
- Natural language search box.
- Results grouped by thread, ranked by hybrid (BM25 + semantic).

## AI Features (see `PLAN-v1.3.md` Tier 2)

- **AI Email Copilot:** Draft, summarize, prioritize (P0.1).
- **Smart Filters:** Auto-categorize with feedback loop (P0.3).
- **Predictive send time** (P1.1).
- **Semantic search** (P2.1).
- **Calendar slot extraction** (P1.4).
- **Phishing scanner** (P2.3).

Every AI feature MUST:
- Default to local Ollama (`OLLAMA_URL` env), fall back to OpenRouter.
- Stream responses where possible.
- Be invokable from a floating Copilot sidebar present on every page.

## API Endpoints (v1.0 — see F0-3)

```
# Accounts
GET    /api/v1/accounts                 → List
POST   /api/v1/accounts                 → Create
GET    /api/v1/accounts/{id}            → Get
PUT    /api/v1/accounts/{id}            → Update
DELETE /api/v1/accounts/{id}            → Delete
POST   /api/v1/accounts/{id}/sync       → Trigger sync (F1-1)

# Threads
GET    /api/v1/threads?account_id=&label=&q=&limit=&offset=
GET    /api/v1/threads/{id}
PATCH  /api/v1/threads/{id}             → star/archive/unread

# Messages
GET    /api/v1/messages?thread_id=&account_id=
POST   /api/v1/messages                 → Create draft / send
GET    /api/v1/messages/{id}
PATCH  /api/v1/messages/{id}            → mark read/star/archive
DELETE /api/v1/messages/{id}

# Labels
GET    /api/v1/labels?account_id=
POST   /api/v1/labels
PUT    /api/v1/labels/{id}
DELETE /api/v1/labels/{id}

# Contacts
GET    /api/v1/contacts?account_id=&q=
POST   /api/v1/contacts
GET    /api/v1/contacts/{id}
PUT    /api/v1/contacts/{id}
DELETE /api/v1/contacts/{id}

# Dashboard
GET    /api/v1/dashboard                → counts (unread, threads, today’s sent, etc.)
```

## Non-Functional Requirements

- Backend tests ≥ 70% coverage.
- Frontend: responsive, **light-mode only**, Tailwind + pre-built `src/components/ui/*` components — **no shadcn CLI**, **no `@base-ui/react`**.
- All visual styling uses `colors_and_type.css` tokens (Poppins, purple `#7660A8`).
- Docker: `docker compose up -d` starts postgres + backend + frontend, all healthy.
- All persistence goes to PostgreSQL — **no mock data anywhere**.
- Auth via Logto (F1-7); endpoints validate JWT.
