# CAPITAL//CONSTITUTION

**The economic authority layer for enterprise AI.**

CAPITAL//CONSTITUTION is a Vercel-ready interactive product prototype that turns AI budgets into executable capital contracts. It combines portfolio economics, model-routing policy, margin stress testing, autonomous spending boundaries, decision receipts, board evidence, an AI Chief Capital Officer, and optional ElevenLabs narration.

## What is included

- Executive AI capital command center
- Executable capital contracts with ceilings, value covenants, quality floors and return-to-human-authority clauses
- Internal AI portfolio auction
- Cost-quality frontier and model-routing recommendation
- Interactive Margin Shock Laboratory
- Autonomous Governor authority ladder
- Immutable-style decision receipt interface
- AI Chief Capital Officer powered by the OpenAI Responses API, with local demo fallback
- ElevenLabs cloned-voice narration endpoint, with browser speech fallback
- Light/dark appearance toggle
- Responsive desktop/tablet/mobile layout

## Run locally

From the project folder:

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000`.

For Vercel serverless functions during local development, install the Vercel CLI and run:

```bash
npx vercel dev
```

## Deploy to Vercel

1. Open the folder in Cursor.
2. Create a new GitHub repository and commit the entire folder.
3. Import that repository into Vercel.
4. Use the default project settings; this is a static app with two serverless API functions.
5. Add environment variables in Vercel:

```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
```

6. Deploy.

Recommended Vercel project slug:

```text
capital-constitution-authority
```

Recommended product route:

```text
/institution/meridian/command
```

## Architecture

```text
Browser UI
  ├─ Command Center
  ├─ Capital Contracts
  ├─ Portfolio Exchange
  ├─ Margin Shock Lab
  └─ Evidence Ledger
       │
       ├─ /api/chief    → OpenAI Responses API
       └─ /api/narrate → ElevenLabs Text-to-Speech
```

## Production evolution

The prototype uses illustrative portfolio data. A production build should add authenticated ingestion from cloud invoices, model providers, AI gateways, finance systems, product analytics and human-review systems. See `docs/PRODUCT-BLUEPRINT.md`.
