const SYSTEM_PROMPT = `You are the Chief Capital Officer inside CAPITAL//CONSTITUTION, an enterprise AI economic authority platform.
Your job is to advise CFOs, CIOs, CAIOs and boards on AI portfolio economics.
Be direct, numerical and decision-oriented. Separate observed evidence, inference and recommendation.
Never invent facts. If data is missing, say exactly what is missing.
Always consider fully-loaded cost, value realization, model quality, latency, human review, compliance burden, concentration risk and reversibility.
Prefer one decisive recommendation with triggers that would reverse it.`;

function demoAnswer(question, context) {
  const q = String(question || '').toLowerCase();
  const base = context?.portfolio || {};
  if (q.includes('cut') || q.includes('save') || q.includes('reduce')) {
    return `Recommendation: execute the staged efficiency mandate, not an indiscriminate budget cut.\n\n1. Reroute the Research Copilot's low-complexity work to the economy tier and cap premium-model use at 28%. Estimated run-rate reduction: $1.18M.\n2. Suspend autonomous retries after the second failure in Client Service Agent. Estimated reduction: $410k.\n3. Preserve Fraud Sentinel funding; it has the strongest verified value-to-cost ratio in the portfolio.\n\nDecision boundary: do not accept a quality score below 91 or a regulatory-review increase above 6%.`;
  }
  if (q.includes('fund') || q.includes('portfolio') || q.includes('allocate')) {
    return `Capital view: fund Fraud Sentinel and Treasury Forecasting first, place Research Copilot under a 30-day margin cure, and freeze the unproven Marketing Studio expansion.\n\nThe portfolio is not constrained by total budget alone; it is constrained by evidence quality. Release additional capital only when outcome attribution is independently verified.`;
  }
  return `The portfolio is inside its aggregate budget but outside its economic constitution. ${base.breachCount || 3} workloads are consuming capital without sufficient evidence of value.\n\nImmediate order: contain the two margin-negative workloads, preserve the highest-value control workload, and require an executive owner to sign each unresolved capital contract within 72 hours.\n\nReconsider when verified unit economics improve by at least 20% or when the quality floor can no longer be maintained.`;
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

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5',
        instructions: SYSTEM_PROMPT,
        input: `PORTFOLIO CONTEXT\n${JSON.stringify(context || {}, null, 2)}\n\nEXECUTIVE QUESTION\n${question}`,
        store: false
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`OpenAI API ${response.status}: ${detail.slice(0, 500)}`);
    }

    const data = await response.json();
    res.status(200).json({ answer: data.output_text || 'No response returned.', mode: 'live' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Chief Capital Officer failed.' });
  }
}
