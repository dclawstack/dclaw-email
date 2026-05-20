# DClaw Mail — Knowledge Index

> **The single entry point for every agent and human contributor.**
> Open this file first. Every other doc is linked from here with a one-line summary.
> Last updated: 2026-05-20.

---

## 🎯 Start Here — Top of the Funnel

| # | Doc | One-line summary |
|---|-----|------------------|
| 1 | [`AGENTS.md`](./AGENTS.md) | **Immutable** architecture rules + anti-patterns. Read before any code change. |
| 2 | [`REVISED-PRD.md`](./REVISED-PRD.md) | v2.3 — authoritative product spec. DClaw Mail = AI-native productivity inbox (Superhuman/Front class). |
| 3 | [`PLAN-v1.3.md`](./PLAN-v1.3.md) | **Current roadmap (active).** Tiered feature list 0/1/2 with build order. Supersedes v1.2. |
| 4 | [`colors_and_type.css`](./colors_and_type.css) | dKube design tokens — Poppins, purple `#7660A8`, light-mode only. Source of truth for visual styling. |

---

## 📘 Product & Strategy

| Doc | Status | Summary |
|-----|--------|---------|
| [`REVISED-PRD.md`](./REVISED-PRD.md) | ✅ Active v2.3 | Authoritative PRD. P0/P1/P2 feature tiers. AI Copilot mandate. |
| [`PRODUCT-SPEC.md`](./PRODUCT-SPEC.md) | ⚠️ Misnamed — currently a CRM template; will be rewritten under F0-1. |
| [`PRODUCT-SPEC.md.template`](./PRODUCT-SPEC.md.template) | Reference | Scaffold template — do not edit. |
| [`PLAN-v1.3.md`](./PLAN-v1.3.md) | ✅ Active | Current feature roadmap with tiered complexity (0/1/2). |
| [`PLAN-v1.2.md`](./PLAN-v1.2.md) | 🗄️ Superseded | Older marketing-automation direction. Conflicts with REVISED-PRD; retired by v1.3. |

---

## 🧱 Architecture & Process

| Doc | Summary |
|-----|---------|
| [`AGENTS.md`](./AGENTS.md) | Sacred stack, anti-patterns, DB rules, testing requirements, port registry. |
| [`AGENT-PROMPTS.md`](./AGENT-PROMPTS.md) | Reusable per-role agent prompt templates (backend / frontend / devops / QA / feature). |
| [`TEAM-ONBOARDING-GUIDE.md`](./TEAM-ONBOARDING-GUIDE.md) | New-engineer onboarding flow. |
| [`SCALING-PLAYBOOK.md`](./SCALING-PLAYBOOK.md) | How DClaw scales horizontally across vertical SaaS apps. |
| [`README.md`](./README.md) | High-level repo orientation. |

---

## 🛠️ Patches & Ops

| Doc | Summary |
|-----|---------|
| [`PATCHES.md`](./PATCHES.md) | Active org-wide patches index. |
| [`PATCH-2026-05-15-shared-hub-postgres.md`](./PATCH-2026-05-15-shared-hub-postgres.md) | Hub-only durable shared PostgreSQL; auto-creates `dclaw_<app>` DBs. |

---

## 📁 Subsystem Docs

| Path | Purpose |
|------|---------|
| [`docs/getting-started/`](./docs/getting-started) | First-run instructions. |
| [`docs/guides/`](./docs/guides) | How-tos. |
| [`docs/reference/`](./docs/reference) | API + token reference. |
| [`docs/releases/`](./docs/releases) | Changelog. |
| [`docs/troubleshooting/`](./docs/troubleshooting) | Common errors. |
| [`backend/`](./backend) | FastAPI app, SQLAlchemy 2.0 models, Alembic migrations, tests. |
| [`frontend/`](./frontend) | Next.js 14+ App Router, pre-built UI components in `src/components/ui/`. |
| [`helm/`](./helm) | Kubernetes Helm chart. |
| [`.github/workflows/`](./.github/workflows) | CI pipelines. |

---

## 🧭 Decision log (key choices already taken)

| Date | Decision | Rationale | Source |
|------|----------|-----------|--------|
| 2026-05-20 | Adopt `REVISED-PRD.md` v2.3 over `PLAN-v1.2.md` direction | PRD is newer and authoritative; v1.2 described wrong product (marketing automation) | `PLAN-v1.3.md` §0 |
| 2026-05-20 | Lock ports to **backend 8022 / frontend 3022 / DB `dclaw_email`** | AGENTS.md is canonical; resolves three-way conflict with docker-compose and PRD | `PLAN-v1.3.md` F0-1 |
| 2026-05-20 | Light-mode only; Poppins + purple `#7660A8` | `colors_and_type.css` is the design source of truth | `PLAN-v1.3.md` F0-2 |
| 2026-05-20 | Local PostgreSQL on host port **5435** (Docker container `dclaw-postgres`); CI on 5432 | Existing shared dev container; `DATABASE_URL` is env-driven | Phase 3 setup |

---

## 🔭 What to read for each task

| If you are about to… | Read |
|----------------------|------|
| Add a backend model | `AGENTS.md` §Database Rules + `PLAN-v1.3.md` §6 |
| Add a frontend page | `colors_and_type.css` + `AGENTS.md` §Pre-Built UI Components |
| Change Docker / ports | `AGENTS.md` §Port Registry + `PLAN-v1.3.md` F0-1 + `PATCH-2026-05-15-shared-hub-postgres.md` |
| Write an AI feature | `REVISED-PRD.md` §9 + `PLAN-v1.3.md` F2-1 |
| Add tests | `AGENTS.md` §Testing Requirements + `backend/tests/conftest.py` |
| Ship a feature | `PLAN-v1.3.md` §5 Definition of Done |

---

## 🌱 Obsidian Vault

This repo can be opened as an Obsidian vault. The `.obsidian/` directory carries minimal workspace config so `[[wikilinks]]` work between docs. To use:

1. Open Obsidian → `Open folder as vault` → select this repo root.
2. The graph view will show the doc network anchored at this `KNOWLEDGE-INDEX.md`.

---

*Maintained by: whoever ships the next feature.*
*Update protocol: every new top-level `.md` MUST be added to the appropriate table above in the same PR that introduces it.*
