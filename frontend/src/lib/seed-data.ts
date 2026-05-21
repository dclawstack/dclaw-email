export type LabelName =
  | "Important"
  | "Funding"
  | "Team"
  | "YC"
  | "Enterprise"
  | "Press"
  | "Legal"
  | "Board"
  | "Customer"
  | "Partnerships";

export interface SeedEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string; // ISO 8601
  readStatus: boolean;
  starred: boolean;
  archived: boolean;
  labels: LabelName[];
  avatar: string;      // 2-char initials
  avatarColor: string; // bg hex
}

export const LABEL_META: Record<LabelName, { color: string; bg: string }> = {
  Important:    { color: "#B3261E", bg: "#FBE9E7" },
  Funding:      { color: "#2E8B57", bg: "#E6F4EC" },
  Team:         { color: "#7660A8", bg: "#F1EEF8" },
  YC:           { color: "#C28A00", bg: "#FBF1DC" },
  Enterprise:   { color: "#2C6CB0", bg: "#E5EFF9" },
  Press:        { color: "#5A5A66", bg: "#F2F2F4" },
  Legal:        { color: "#B3261E", bg: "#FBE9E7" },
  Board:        { color: "#7660A8", bg: "#F1EEF8" },
  Customer:     { color: "#2C6CB0", bg: "#E5EFF9" },
  Partnerships: { color: "#2E8B57", bg: "#E6F4EC" },
};

export const SEED_EMAILS: SeedEmail[] = [
  {
    id: "se-001",
    senderName: "Paul Graham",
    senderEmail: "pg@ycombinator.com",
    subject: "Re: Your YC application — we're genuinely interested",
    snippet: "I read through everything last night. The growth numbers are the kind we pay attention to. Can we get on a call this week?",
    body: `Hi,

I read through your application last night and I have to say — the growth metrics are genuinely impressive. 28% MoM without any paid acquisition is exactly the kind of number we pay attention to.

The email space is crowded, but what you're building feels different. The AI-native approach combined with the DClaw stack's cross-app intelligence creates a moat that I don't see any of the incumbents being able to replicate easily.

I'd like to set up a call this week if possible. Are you free Thursday or Friday afternoon (PT)?

Quick question before we meet: what's your current burn rate and runway? I want to understand the capital efficiency before we sit down.

Best,
Paul`,
    timestamp: "2026-05-21T09:15:00Z",
    readStatus: false,
    starred: true,
    archived: false,
    labels: ["YC", "Important"],
    avatar: "PG",
    avatarColor: "#7660A8",
  },
  {
    id: "se-002",
    senderName: "Roelof Botha",
    senderEmail: "roelof@sequoiacap.com",
    subject: "Series A — term sheet ready for your review",
    snippet: "Following our call, our investment committee has approved moving forward. We're proposing a $12M Series A at a $60M pre-money valuation...",
    body: `Hi,

Following our call on Thursday, our investment committee met yesterday and voted unanimously to move forward with DClaw Mail.

We're pleased to share the following term sheet for a $12M Series A:

• Pre-money valuation: $60M
• Investment amount: $12M
• Pro-rata rights for future rounds
• One board seat (Sequoia partner — likely me)
• Standard protective provisions per NVCA model docs

The term sheet expires in 7 days. We'd love to close before end of month if that works on your end.

Please share with your counsel and let us know if you have any questions or redlines. We're flexible on most terms.

Congratulations — we're excited to partner with you on this.

Best,
Roelof`,
    timestamp: "2026-05-21T08:42:00Z",
    readStatus: false,
    starred: true,
    archived: false,
    labels: ["Funding", "Important"],
    avatar: "RB",
    avatarColor: "#2E8B57",
  },
  {
    id: "se-003",
    senderName: "Sam Altman",
    senderEmail: "sam@openai.com",
    subject: "Re: OpenAI + DClaw Mail — partnership conversation",
    snippet: "I tried the beta yesterday. Genuinely impressive. The AI triage is better than anything I've seen. Let's talk about a deeper integration...",
    body: `Hi,

I tried the beta yesterday based on a recommendation from Michael and I'm genuinely impressed. The AI triage is better than anything I've seen outside of what our own teams have built internally.

A few things stood out: the latency is phenomenal (I clocked under 180ms from keypress to response), and the way it threads cross-app context from the rest of the DClaw stack is clever.

I want to explore a deeper integration — we've been looking for a partner to demonstrate GPT-4o in a real productivity context, and this feels like it could be the right fit. Mutual distribution, co-marketing, possibly a deeper API arrangement.

Can you get your team on a call next week? My EA (cc'd) can handle scheduling.

Sam`,
    timestamp: "2026-05-21T07:30:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Partnerships", "Important"],
    avatar: "SA",
    avatarColor: "#404049",
  },
  {
    id: "se-004",
    senderName: "Michael Seibel",
    senderEmail: "mseibel@ycombinator.com",
    subject: "Office hours this Thursday — can you make 2pm PT?",
    snippet: "Paul looped me in. I'd love to do a 30-minute session before your formal interview. Come prepared to show the product.",
    body: `Hey,

Paul looped me in on your application and I read it this morning. I'd love to do an informal 30-minute office hours session before your formal interview — it's always better to have a warm conversation first.

Thursday at 2pm PT works for me. We'll do it over Zoom.

Come prepared to show the product end-to-end, and be ready to talk about your vision for what happens 5 years from now if everything goes right.

Also — the question I always ask at this stage: what does this look like if it's a $10B company? I want to hear your answer in plain language, not a slide deck.

See you Thursday,
Michael`,
    timestamp: "2026-05-21T06:58:00Z",
    readStatus: true,
    starred: true,
    archived: false,
    labels: ["YC"],
    avatar: "MS",
    avatarColor: "#C28A00",
  },
  {
    id: "se-005",
    senderName: "Marc Andreessen",
    senderEmail: "marc@a16z.com",
    subject: "a16z due diligence — meeting request",
    snippet: "Our partner Anish brought your deck to the table last Monday. We'd like to set up a technical and commercial deep-dive before we...",
    body: `Hi,

Our partner Anish brought your deck to the Monday partner meeting last week. After reviewing the metrics and the product demo video, we want to move quickly on a due diligence process.

We'd like to schedule:
1. 60-min technical deep-dive with our engineering partner
2. 30-min commercial conversation with me directly
3. Reference calls with 3-5 of your current customers (we'll keep it light — 15 min each)

Our target is to complete diligence within 10 days if you're running a process. Are you?

What's your timeline looking like?

Marc`,
    timestamp: "2026-05-20T18:22:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Funding"],
    avatar: "MA",
    avatarColor: "#2C6CB0",
  },
  {
    id: "se-006",
    senderName: "Jennifer Walsh",
    senderEmail: "jennifer.walsh@palantir.com",
    subject: "Enterprise evaluation — 5,000 seat deployment interest",
    snippet: "Our CIO saw the demo at SaaStr and wants to evaluate DClaw Mail for our global knowledge worker fleet. Can we arrange a technical POC?",
    body: `Hi,

Our CIO, David Park, saw the demo you gave at SaaStr last week and immediately looped me in. We're interested in evaluating DClaw Mail for deployment across our global knowledge worker population — approximately 5,000 seats initially, with potential to expand to 12,000.

Key requirements for the evaluation:
• SSO/SAML integration with Okta
• Admin console with usage analytics
• Data residency options (EU & US)
• SLA guarantee of 99.9% uptime
• Legal hold and compliance archiving

Can we arrange a technical POC over the next 30 days? We'd run it with a pilot team of 50 users.

Excited about the potential here.

Jennifer Walsh
Head of Enterprise Technology, Palantir`,
    timestamp: "2026-05-20T16:45:00Z",
    readStatus: false,
    starred: true,
    archived: false,
    labels: ["Enterprise", "Important"],
    avatar: "JW",
    avatarColor: "#2C6CB0",
  },
  {
    id: "se-007",
    senderName: "Sarah Chen",
    senderEmail: "sarah@dclawmail.com",
    subject: "Q3 Roadmap — draft ready for review before Thursday's board prep",
    snippet: "I've finished the Q3 roadmap doc. Main bets: F1-1 IMAP sync, F1-7 Logto auth, and starting F2-1 AI Copilot. Shipping dates are aggressive...",
    body: `Hey,

The Q3 roadmap draft is ready. Key decisions I need your sign-off on before I share with the board:

Top bets:
1. F1-1 IMAP/Gmail sync — targeting ship in week 1 of Q3. This unlocks the core value prop.
2. F1-7 Logto auth — blocking everything multi-tenant. Needs 2 engineers for 10 days.
3. F2-1 AI Copilot (draft + summarize + priority) — our YC RFS mandate. I want to start this in week 3.

Risks:
• IMAP rate limiting on Gmail is worse than expected. Rajesh is handling it with exponential backoff but we might need to move to the Gmail API proper.
• The Logto SDK has a breaking change in v2.5 — Marcus is working around it.

The roadmap is aggressive. We can ship F1-1 and F1-7 in Q3, but F2-1 will probably slip to early Q4 unless we hire faster.

Can we review Thursday at 10am before the board prep call?

— Sarah`,
    timestamp: "2026-05-20T15:10:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Team"],
    avatar: "SC",
    avatarColor: "#7660A8",
  },
  {
    id: "se-008",
    senderName: "Emily Rodriguez",
    senderEmail: "emily@wsgr.com",
    subject: "Term sheet redlines — please review before Friday EOD",
    snippet: "I've redlined the Sequoia term sheet. Main concerns: the information rights clause is too broad, and we need to push back on the drag-along...",
    body: `Hi,

I've completed my review of the Sequoia term sheet. The overall structure is fair and consistent with current market terms, but I have a few recommendations before you sign:

Issues to negotiate:

1. Information Rights (Section 4.2): The clause as drafted gives Sequoia access to monthly management accounts within 5 days of month-end. This is operationally burdensome for an early-stage company. I recommend pushing for quarterly.

2. Drag-Along (Section 7.1): The threshold is currently 60% — standard is 65-70%. Worth pushing on.

3. Board composition: Currently one Sequoia seat + two common seats. Consider negotiating for an independent director provision now — you'll want that seat for a strong operator/advisor in Series B.

4. Pro-rata: The full pro-rata is actually very favorable — keep it.

I need your approval of the redlines before I send them back. Can we get on a call Thursday at 4pm?

Emily Rodriguez
Partner, Wilson Sonsini Goodrich & Rosati`,
    timestamp: "2026-05-20T14:33:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Legal", "Funding"],
    avatar: "ER",
    avatarColor: "#B3261E",
  },
  {
    id: "se-009",
    senderName: "Ingrid Lunden",
    senderEmail: "ingrid@techcrunch.com",
    subject: "TechCrunch feature — AI-native email is the story of 2026",
    snippet: "I'm writing a piece on the next generation of email clients and DClaw Mail keeps coming up. Would love 30 mins this week for a background conversation...",
    body: `Hi,

I'm writing a feature for TechCrunch on the new wave of AI-native email clients and DClaw Mail has come up in nearly every conversation I've had. Founders, VCs, enterprise CTOs — people are genuinely excited.

I'd love to do a 30-minute background conversation this week. I'm not looking to scoop a funding round (though if you're announcing something, happy to cover it on the record), more interested in the product philosophy and what you think the inbox looks like 3 years from now.

The piece runs a week from Friday. If you're interested in being included, I'd need a conversation by Wednesday.

Full disclosure: I've also spoken with Shortwave, Hey.com, and Superhuman for this piece. But the AI angle you're taking is the most interesting of the bunch.

Let me know,
Ingrid`,
    timestamp: "2026-05-20T12:15:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Press"],
    avatar: "IL",
    avatarColor: "#5A5A66",
  },
  {
    id: "se-010",
    senderName: "Tiger Global",
    senderEmail: "updates@tigerglobal.com",
    subject: "Portfolio quarterly update — Q1 2026 template due May 30",
    snippet: "Please use the attached template for your Q1 update. Key metrics required: ARR, MoM growth, headcount, burn, runway, and 3 key highlights...",
    body: `Hi,

As a reminder, your Q1 2026 portfolio update is due by May 30th. Please use the attached template.

Required metrics:
• ARR (Monthly Recurring Revenue × 12)
• MoM and QoQ growth rates
• Headcount (full-time vs. contractors)
• Monthly burn rate
• Cash runway (months)
• 3 key highlights from Q1
• 3 risks/challenges you're navigating
• Top ask from Tiger (intros, hiring, customers)

We'll compile all updates for our LP letter which goes out June 15.

If you have any major announcements (funding rounds, customer wins, key hires), please cc your lead partner directly so we can highlight those separately.

Tiger Global Investor Relations`,
    timestamp: "2026-05-20T10:05:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Funding", "Board"],
    avatar: "TG",
    avatarColor: "#404049",
  },
  {
    id: "se-011",
    senderName: "Ivan Zhao",
    senderEmail: "ivan@notion.so",
    subject: "Notion × DClaw Mail — product integration idea",
    snippet: "I've been thinking about the overlap between what you're building and Notion AI. When an email becomes a task, it should live in Notion...",
    body: `Hey,

I've been using the DClaw Mail beta for about 3 weeks now and I keep thinking about an integration that would be genuinely useful.

When someone gets an email that becomes a task or project — which happens constantly — the natural next step is to capture it in Notion. Right now that's a manual copy-paste job.

What if DClaw Mail could detect "this email spawned a task" and automatically create the linked Notion page? AI extracts the action items, sets the deadline, assigns the owner.

I think there's a co-marketing angle here too. We have ~40M users who live in their inboxes. You have an inbox layer. Feels like something we should explore.

Can you come to our SF office next Thursday? I'll get the product team together.

Ivan`,
    timestamp: "2026-05-19T20:44:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Partnerships"],
    avatar: "IZ",
    avatarColor: "#404049",
  },
  {
    id: "se-012",
    senderName: "Patrick Collison",
    senderEmail: "patrick@stripe.com",
    subject: "Stripe + DClaw Mail — billing integration feedback",
    snippet: "The billing module you sketched in our call is the right approach. One suggestion: use Stripe Billing's metered usage model for the AI token consumption...",
    body: `Hey,

Really enjoyed the call last week. The billing architecture you sketched out makes sense. A few thoughts on implementation:

1. Metered billing for AI usage: Use Stripe Billing's metered usage API rather than building your own token counter. We introduced sub-second reporting last quarter — you can track AI copilot usage in real-time and it'll flow directly into invoice line items.

2. Per-seat pricing: The $30/seat/month is in the right range. Comparable to Superhuman but your AI angle justifies a premium. Consider a usage-based add-on for heavy AI users.

3. Free tier: Keep it meaningful (5 AI actions/day, not unlimited). Converts better than a time-limited trial based on our data across hundreds of SaaS companies.

4. Enterprise: Custom pricing is fine but set a published floor. Saves sales time.

Happy to intro you to our Startup program if you want Stripe credits. Just say the word.

Patrick`,
    timestamp: "2026-05-19T17:30:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Partnerships"],
    avatar: "PC",
    avatarColor: "#2C6CB0",
  },
  {
    id: "se-013",
    senderName: "First Round Capital",
    senderEmail: "portfolio@firstround.com",
    subject: "Q2 board deck — due by June 3rd",
    snippet: "As we approach the end of Q2, please have your board deck ready. Josh and I have some agenda items to add — Series A process update and team expansion plan...",
    body: `Hi,

Q2 board meeting is confirmed for June 5th, 10am-12pm PT via Zoom.

Please have your deck ready by June 3rd. Suggested agenda:

1. Company updates & metrics (15 min)
2. Series A process update (20 min) — Josh and I have perspective to share here
3. Team expansion plan — you mentioned hiring 3 engineers in Q3 (15 min)
4. Product roadmap: Q3 priorities and tradeoffs (20 min)
5. Risks and asks (10 min)

For metrics, please include: MRR, MoM growth, CAC, LTV, NPS, and the cohort retention chart we discussed last meeting.

One pre-read: I want to understand your position in the current M&A landscape. Superhuman has been approaching their top customers aggressively. How are you thinking about retention?

Looking forward to it.

Josh Kopelman
First Round Capital`,
    timestamp: "2026-05-19T15:20:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Board"],
    avatar: "JK",
    avatarColor: "#7660A8",
  },
  {
    id: "se-014",
    senderName: "Alex Kim",
    senderEmail: "alex@dclawmail.com",
    subject: "🎉 We just crossed $2M ARR — and it's only May",
    snippet: "Closed Palantir's pilot expansion this morning + 3 new SMB closings. We're at $2.05M ARR as of right now. The pipeline is insane...",
    body: `Hey!

Wanted to share the news before the all-hands: we just crossed $2M ARR.

Breakdown:
• Palantir pilot expansion: $480K ARR (50 → 200 seats)
• New closings this week: 3 SMB deals ($18K combined)
• Net revenue retention: 118% (churn is near zero, expansion is real)

Pipeline update:
• 12 enterprise deals in late stage ($4.2M potential ARR)
• Palantir full deployment (5,000 seats) would add $4.8M alone
• 3 Series B+ startups evaluating for their whole company

The Sequoia term sheet timing couldn't be better. Investors are going to love seeing $2M ARR at our stage.

One ask: can you jump on a 15-minute call tomorrow to discuss the Palantir expansion pricing? They're asking for a volume discount at 5K seats and I want alignment before I respond.

🚀
Alex`,
    timestamp: "2026-05-21T11:45:00Z",
    readStatus: false,
    starred: true,
    archived: false,
    labels: ["Team", "Important"],
    avatar: "AK",
    avatarColor: "#2E8B57",
  },
  {
    id: "se-015",
    senderName: "James Park",
    senderEmail: "jpark@gmail.com",
    subject: "Accepting the VP of Engineering offer — I'm in",
    snippet: "After a lot of thought, I'm accepting. DClaw Mail is exactly the kind of company I've been looking for — real product, real traction, real team...",
    body: `Hi,

After a lot of reflection and some great conversations with Sarah and your board, I've decided to accept the VP of Engineering offer.

This wasn't an easy decision — I had a competing offer at a later-stage company at a higher base — but DClaw Mail is exactly the kind of company I've been looking for. Real product, real traction, real team solving a problem I care about.

I'll give my current employer the standard 4 weeks notice starting Monday, so my start date would be June 23rd. If there's any way to accelerate the onboarding paperwork so I can hit the ground running on day one, that would be great.

A few things I'd like to discuss before I start:
• The engineering org structure and who I'll be working most closely with
• My first 90-day priorities — I have some ideas
• Access to the tech stack documentation ahead of day one

Really excited to help you build this. Let's talk soon.

James`,
    timestamp: "2026-05-19T09:15:00Z",
    readStatus: true,
    starred: true,
    archived: false,
    labels: ["Team"],
    avatar: "JP",
    avatarColor: "#7660A8",
  },
  {
    id: "se-016",
    senderName: "Michael Torres",
    senderEmail: "michael.torres@dropbox.com",
    subject: "Enterprise license expansion — 500 seat quote needed by Friday",
    snippet: "Following our successful 50-seat pilot, our IT committee has approved moving forward with a full 500-seat deployment. Can you get me a custom quote by Friday?",
    body: `Hi,

Great news — following our 50-seat pilot, which our users absolutely loved (especially the AI triage and keyboard shortcuts), our IT committee has approved moving forward with a full deployment.

We're looking at 500 seats initially, with potential to grow to 800 by end of year as we expand our knowledge worker population.

For the quote, we'll need:
• Per-seat pricing at 500 seats (annual commitment)
• SSO setup and admin console access
• Migration support from Gmail/Outlook
• Dedicated customer success contact
• SLA documentation

Please have this to me by Friday EOD — our procurement team has a board presentation Monday.

Looking forward to the expanded partnership.

Michael Torres
Head of Enterprise Procurement, Dropbox`,
    timestamp: "2026-05-18T16:50:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Enterprise"],
    avatar: "MT",
    avatarColor: "#2C6CB0",
  },
  {
    id: "se-017",
    senderName: "Stephanie Wu",
    senderEmail: "stephanie@forbesmedia.com",
    subject: "Forbes 30 Under 30 — Technology nomination deadline May 28",
    snippet: "Based on DClaw Mail's growth trajectory and your team's background, you've been nominated for Forbes 30 Under 30 in Technology. Submission deadline is May 28th...",
    body: `Hi,

I'm reaching out from Forbes Media regarding our 30 Under 30 list for 2027 (yes, nominations open this early!). You've been nominated for the Technology category by a member of our advisory board.

Based on what I've read about DClaw Mail — the growth metrics, the AI-native approach, and the team's background — you fit the profile well.

To be considered, we'd need:
• A completed nominee questionnaire (30 min, attached)
• A recent headshot
• One reference from an investor or notable figure in your industry
• A 3-minute product demo video (can be rough cut)

Deadline for submissions: May 28th at 5pm ET.

I can't guarantee selection, but I can tell you your application will receive serious consideration.

Let me know if you'd like to proceed,
Stephanie Wu
Senior Editor, Forbes`,
    timestamp: "2026-05-18T14:20:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Press"],
    avatar: "SW",
    avatarColor: "#5A5A66",
  },
  {
    id: "se-018",
    senderName: "Marco Russo",
    senderEmail: "marco@dclawmail.com",
    subject: "⚠️ Churn risk — Acme Corp showing disengagement signals",
    snippet: "Acme's power users haven't logged in for 9 days. Usage is down 71% from peak. I recommend a proactive outreach call before they ask to cancel...",
    body: `Hey,

Flagging a churn risk that I want to get ahead of before it becomes a problem.

Account: Acme Corp (40 seats, $48K ARR)
Risk level: High

What I'm seeing:
• Their 8 power users (defined as daily active in first 3 weeks) haven't logged in for 9 days
• Session count is down 71% from peak (week 3 of onboarding)
• Their admin hasn't responded to my last 2 check-in emails
• Sentiment on their internal Slack (we have access via the integration) shifted from positive to neutral

Hypothesis: They hit the keyboard shortcut learning curve and nobody pushed through it. Their previous tool (Outlook) had a more familiar UX.

My recommendation: Let's get their IT admin on a 20-min "success check-in" call this week. I'll offer a complimentary Superhuman-style concierge onboarding session for their top 5 users.

Can you co-sign the outreach email? Carries more weight coming from the founder.

Marco`,
    timestamp: "2026-05-21T10:30:00Z",
    readStatus: false,
    starred: false,
    archived: false,
    labels: ["Customer", "Important"],
    avatar: "MR",
    avatarColor: "#B3261E",
  },
  {
    id: "se-019",
    senderName: "Adora Cheung",
    senderEmail: "adora@ycombinator.com",
    subject: "YC W26 Demo Day — lineup confirmed, your slot is 4:30pm",
    snippet: "Congratulations — you're officially in the W26 batch. Your Demo Day presentation slot is Thursday at 4:30pm. Here's what you need to know...",
    body: `Hi,

Congratulations — you're officially confirmed for the YC W26 Demo Day lineup.

Your presentation details:
• Date: Thursday, March 20th
• Time: 4:30 PM PT (you're 9th out of 11 in your session)
• Duration: 2 minutes 30 seconds — hard stop
• Format: Live product demo strongly recommended

Logistics:
• Arrive 30 minutes before your session for AV check
• Slides must be submitted by March 18th at noon
• No live product demos with real user data (demo accounts only)
• Dress code: Smart casual (no hoodies — this is a big stage)

Attendees include ~350 investors from top-tier funds. We'll also have a virtual stream for ~4,000 remote investors.

My one piece of advice: lead with the metric that makes jaws drop. For you, that's the ARR growth rate. Say it in the first 20 seconds.

See you there,
Adora`,
    timestamp: "2026-05-17T18:00:00Z",
    readStatus: true,
    starred: true,
    archived: false,
    labels: ["YC"],
    avatar: "AC",
    avatarColor: "#C28A00",
  },
  {
    id: "se-020",
    senderName: "David Chen",
    senderEmail: "david.chen@notion.so",
    subject: "Literally the best email client I've ever used — NPS: 10/10",
    snippet: "I just filled out your NPS survey and gave you a 10. I've been using email clients since 2003. Nothing comes close to DClaw Mail for me personally...",
    body: `Hi,

I just completed your NPS survey and gave a 10/10 — and I want to explain why, because I think you should share this with your investors.

I've been using email clients since Eudora in 2003. I've tried everything: Gmail, Outlook, Superhuman, Spark, Hey, Fastmail, even self-hosted setups. Nothing has ever made me feel like email is *fast* until DClaw Mail.

Specifically:
1. The AI triage got my inbox from 200 emails/day to 15 decisions/day within a week. Not filtered out — actually triaged and prioritized.
2. The keyboard shortcuts feel like they were designed for how my brain works, not just mapped onto an existing mental model.
3. The cross-app context from my DClaw calendar and docs appearing in email threads is genuinely magic. I don't know how I lived without it.

I've already referred 6 colleagues and one of them is now evaluating the enterprise plan.

One ask: I'd love a "power user" or "early adopter" badge in my profile. I want to wear this product with pride.

Keep building this,
David Chen
Senior PM, Notion`,
    timestamp: "2026-05-20T08:15:00Z",
    readStatus: true,
    starred: false,
    archived: false,
    labels: ["Customer"],
    avatar: "DC",
    avatarColor: "#2E8B57",
  },
];

export const UNREAD_COUNT = SEED_EMAILS.filter((e) => !e.readStatus).length;
