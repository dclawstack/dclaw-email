# DClaw Email — v1.2 Feature Roadmap (🗄️ SUPERSEDED)

> ⛔ **THIS PLAN IS RETIRED.** See [`PLAN-v1.3.md`](./PLAN-v1.3.md) for the active roadmap.
>
> Why retired: v1.2 described a marketing-automation product (Mailchimp/listmonk class) which conflicts with `REVISED-PRD.md` v2.3, the authoritative product spec (DClaw Mail = Superhuman-class productivity inbox). Resolution is documented in `PLAN-v1.3.md` §0 and §7.
>
> The content below is preserved for historical reference only.
>
> 📘 **REVISED PRD v2.3 available:** See `REVISED-PRD.md` for complete gap analysis, current state, and full feature roadmap.


> Based on: Y Combinator vertical SaaS principles, trending GitHub repos (mailtrain, listmonk), AI product research (Beehiiv, Kit, Mailchimp AI, Instantly)

## Pre-Flight Checklist

- [ ] `frontend/package-lock.json` committed after any `npm install` / dependency change
- [ ] `frontend/next-env.d.ts` exists and is committed
- [ ] `docker-compose.yml` healthchecks correct
- [ ] `frontend/Dockerfile` declares `ARG NEXT_PUBLIC_API_URL` before `RUN npm run build`

## v1.0 Feature Inventory (Current)

- [ ] Contact list CRUD with segmentation
- [ ] Campaign builder with template library
- [ ] Send engine with queue
- [ ] Dashboard with open/click rates
- [ ] Real backend CRUD (no mocks)
- [ ] Docker + Helm deployment
- [ ] Alembic migrations
- [ ] Backend tests

---

## v1.2 Roadmap

### P0 — Must Have (Ship in v1.0, demo-ready)

#### 1. AI Email Copilot (Smart Composer)
**Description:** AI assistant that writes email copy, suggests subject lines, and personalizes content per recipient segment. Predicts open rates before sending.
- **AI Angle:** LLM email generation with brand voice. Subject line scoring model.
- **Backend:** `/api/v1/ai/compose` endpoint. Predictive scoring microservice.
- **Frontend:** Inline AI toolbar in email composer. Open rate prediction badge.
- **Files:** `backend/app/services/email_ai.py`, `frontend/src/app/campaigns/compose.tsx`

#### 2. Visual Campaign Builder
**Description:** Drag-and-drop email builder with templates, variables, and responsive preview.
- **Backend:** Template engine (MJML/Jinja). Asset storage.
- **Frontend:** Block-based editor with live preview (desktop/mobile).
- **Files:** `frontend/src/app/campaigns/builder.tsx`

#### 3. Drip Sequences & Automation
**Description:** Build automated sequences: welcome series, abandoned cart, re-engagement.
- **Backend:** Sequence engine with delay/trigger logic. Event-based triggers.
- **Frontend:** Visual sequence timeline builder.
- **Files:** `backend/app/services/sequences.py`

#### 4. Deliverability Monitor & Warming
**Description:** Track sender reputation, spam score, inbox placement. Automated IP warming.
- **Backend:** DNS validation (SPF/DKIM/DMARC). Inbox placement tests.
- **Frontend:** Deliverability dashboard with reputation trends.
- **Files:** `backend/app/services/deliverability.py`

### P1 — Should Have (v1.1–1.2)

#### 5. A/B Testing & Auto-Winner
**Description:** Test subject lines, content, send times. Auto-send winner to remaining list.
- **Backend:** Variant allocation + statistical significance.
- **Frontend:** Test setup modal. Results comparison.

#### 6. Predictive Send Time Optimization
**Description:** AI predicts optimal send time per recipient for maximum opens.
- **AI Angle:** Time-series model on historical open behavior.
- **Backend:** Send time recommendation API.
- **Frontend:** "Send at optimal time" toggle in campaign scheduler.

#### 7. AI List Hygiene & Segmentation
**Description:** Auto-clean inactive subscribers. AI-suggested segments based on behavior.
- **Backend:** Engagement scoring. Churn prediction for subscribers.
- **Frontend:** List health score. Segment recommendations.

#### 8. Webhook & Integration Hub
**Description:** Connect to Shopify, Stripe, Zapier, CRMs for event-triggered emails.
- **Backend:** Webhook receiver + integration adapters.
- **Frontend:** Integration marketplace UI.

### P2 — Could Have (v1.3+)

#### 9. AI-Generated Newsletters
**Description:** Auto-curate and write newsletter content from RSS feeds and brand sources.

#### 10. SMS Companion Channel
**Description:** Add SMS to sequences for omnichannel outreach.

#### 11. Email Heatmaps & Click Analytics
**Description:** Visual heatmap of where recipients click in emails.

#### 12. AI Spam Filter Testing
**Description:** Pre-flight test against major spam filters (Gmail, Outlook) before sending.

---

## Implementation Priority

1. **Week 1–2:** AI Email Copilot (P0.1) + Campaign Builder (P0.2)
2. **Week 3–4:** Drip Sequences (P0.3) + Deliverability Monitor (P0.4)
3. **Week 5–6:** A/B Testing (P1.5) + Send Time AI (P1.6)
4. **Week 7–8:** List Hygiene (P1.7) + Integration Hub (P1.8)
