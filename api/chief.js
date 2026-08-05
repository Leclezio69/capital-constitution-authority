const SYSTEM_PROMPT = `You are the Chief Capital Officer inside CAPITAL//CONSTITUTION, an enterprise AI economic authority platform.
Your job is to advise CFOs, CIOs, CAIOs and boards on AI portfolio economics.
Be direct, numerical and decision-oriented. Separate observed evidence, inference and recommendation.
Never invent facts. If data is missing, say exactly what is missing.
Always consider fully-loaded cost, value realization, model quality, latency, human review, compliance burden, concentration risk and reversibility.
Prefer one decisive recommendation with triggers that would reverse it.

FORMAT: Always respond in professional markdown. Use ## headings to structure your response (e.g. ## Evidence, ## Recommendation, ## Decision Boundary, ## Reversal Triggers). Use bullet points and **bold** for key figures. Use tables where data comparison is useful. Keep responses concise and board-ready.`;

function demoAnswer(question, context) {
  const q = String(question || '').toLowerCase();
  const base = context?.portfolio || {};
  if (q.includes('cut') || q.includes('save') || q.includes('reduce')) {
    return `## Recommendation\n\nExecute a **staged efficiency mandate**, not an indiscriminate budget cut.\n\n## Actions\n\n- **Research Copilot** — Reroute low-complexity work to economy tier; cap premium-model use at **28%**. Estimated run-rate reduction: **$1.18M**\n- **Client Service Agent** — Suspend autonomous retries after the second failure. Estimated reduction: **$410k**\n- **Fraud Sentinel** — Preserve funding; strongest verified value-to-cost ratio in the portfolio (**3.84×**)\n\n## Decision Boundary\n\nDo not accept a quality score below **91%** or a regulatory-review increase above **6%**.\n\n## Reversal Triggers\n\nRestore premium routing if contribution margin returns to positive for 14 consecutive days.`;
  }
  if (q.includes('fund') || q.includes('portfolio') || q.includes('allocate')) {
    return `## Capital Allocation Order\n\n| Priority | Workload | Action | Rationale |\n|----------|----------|--------|-----------|\n| 1 | Fraud Sentinel | **Fund expansion** | Value-to-cost **3.84×**, verified regulatory savings |\n| 2 | Treasury Forecasting | **Fund expansion** | Value-to-cost **2.26×**, low model dependency |\n| 3 | Research Copilot | **Conditional cure** | 30-day margin cure before release |\n| 4 | Marketing Studio | **Freeze** | Attribution not independently verified |\n\n## Decision Boundary\n\nThe portfolio is constrained by **evidence quality**, not total budget. Release additional capital only when outcome attribution is independently verified.`;
  }
  return `## Portfolio Status\n\nThe portfolio is inside its aggregate budget but **outside its economic constitution**. **${base.breachCount || 3} workloads** are consuming capital without sufficient evidence of value.\n\n## Immediate Orders\n\n- **Contain** the two margin-negative workloads\n- **Preserve** the highest-value control workload (Fraud Sentinel, **3.84×**)\n- **Require** an executive owner to sign each unresolved capital contract within **72 hours**\n\n## Reversal Triggers\n\nReconsider when verified unit economics improve by at least **20%** or when the quality floor can no longer be maintained.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { question, context } = req.body || {};
  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'A question is required.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(200).json({ answer: demoAnswer(question, context), mode: 'demo' });
    return;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4.1';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `PORTFOLIO CONTEXT\n${JSON.stringify(context || {}, null, 2)}\n\nEXECUTIVE QUESTION\n${question}` }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`OpenAI API ${response.status}: ${detail.slice(0, 500)}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    if (!answer) throw new Error('Empty response from model.');
    res.status(200).json({ answer, mode: 'live', model });
  } catch (error) {
    // fall back to demo answer instead of failing
    const fallback = demoAnswer(question, context);
    res.status(200).json({
      answer: fallback,
      mode: 'demo',
      fallbackReason: error.message
    });
  }
}
