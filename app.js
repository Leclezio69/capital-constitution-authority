import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} }
};

const state = {
  currentView: 'command',
  lastChiefAnswer: '',
  ordersIssued: false,
  contracts: {
    research: {
      code: 'CC-001 · VERSION 4.2', title: 'Research Copilot', subtitle: 'Equity research drafting and analyst augmentation', seal: 'BREACH',
      owner: 'Daniel Harrison', risk: 'Mara Voss', expiry: '30 SEP 2026', ceiling: '$9.0M annualized', value: '1.20×', quality: '91%', model: '35%',
      cure: 'If contribution margin remains negative for 7 days, cap premium traffic at 28% and place expansion capital on hold.',
      return: 'Suspension, customer repricing or quality-floor waiver requires CFO, CAIO and business-owner approval.'
    },
    fraud: {
      code: 'CC-002 · VERSION 3.7', title: 'Fraud Sentinel', subtitle: 'Financial crime detection and investigation prioritization', seal: 'VERIFIED',
      owner: 'Maria Ortega', risk: 'Jon Bell', expiry: '31 DEC 2026', ceiling: '$6.2M annualized', value: '2.50×', quality: '96%', model: '22%',
      cure: 'If false-positive reduction falls below 18%, halt expansion funding and return model changes to human review.',
      return: 'Any reduction in regulatory alert coverage requires Chief Compliance Officer approval.'
    },
    service: {
      code: 'CC-003 · VERSION 2.9', title: 'Client Service Agent', subtitle: 'Service triage, response drafting and case resolution', seal: 'CURE',
      owner: 'Amanda Liu', risk: 'Peter Shah', expiry: '15 OCT 2026', ceiling: '$7.1M annualized', value: '1.35×', quality: '89%', model: '40%',
      cure: 'After two failed tool calls, stop autonomous retries and route the case to a human queue.',
      return: 'Any customer-facing action involving fees, promises or regulated advice requires human confirmation.'
    },
    treasury: {
      code: 'CC-004 · VERSION 1.8', title: 'Treasury Forecasting', subtitle: 'Liquidity forecasting, stress analysis and cash-position intelligence', seal: 'VERIFIED',
      owner: 'Sonia Patel', risk: 'Alan Meyer', expiry: '31 MAR 2027', ceiling: '$4.0M annualized', value: '1.80×', quality: '94%', model: '18%',
      cure: 'If forecast error exceeds 7% for three consecutive cycles, revert to the approved statistical baseline.',
      return: 'Funding or hedging instructions remain advisory until signed by authorized Treasury officers.'
    },
    marketing: {
      code: 'CC-005 · VERSION 2.1', title: 'Marketing Studio', subtitle: 'Campaign generation, localization and creative production', seal: 'EXPIRED',
      owner: 'Jordan Brooks', risk: 'Nina Ross', expiry: '01 AUG 2026', ceiling: '$4.5M annualized', value: '1.10×', quality: '87%', model: '30%',
      cure: 'Freeze new media generation until campaign attribution is independently restored and verified.',
      return: 'Brand-risk waiver, synthetic spokesperson use or expansion capital requires CMO and Legal approval.'
    }
  },
  receipts: {
    1: { hash: '4C8A:9F21', title: 'Premium-model cap issued', summary: 'The autonomous governor reduced premium-model routing for Research Copilot from 54% to 35% after the workload crossed its approved contribution-margin boundary.', cells: [
      ['AUTHORITY','Governor Level 3','Delegated rerouting authority up to $250k monthly impact.'],['EVIDENCE','30-day unit economics','Value-to-cost 0.82×; projected monthly loss $157k.'],['ACTION','Route mix changed','Premium 54% → 35%; standard 31% → 44%; economy 15% → 21%.'],['RISK ACCEPTED','Moderate latency increase','Estimated +420ms for 19% of routine interactions.'],['QUALITY BOUNDARY','91% acceptance floor','Automatic rollback if acceptance drops by more than 2 points.'],['RECONSIDERATION','7-day evidence window','Return to CFO authority if margin remains negative after cure.']
    ]},
    2: { hash: '8E31:AA07', title: 'Expansion capital protected', summary: 'The CFO excluded Fraud Sentinel from a portfolio-wide reduction because verified regulatory loss avoidance materially exceeded its fully loaded operating cost.', cells: [
      ['AUTHORITY','CFO reserved authority','Portfolio protection order under FY26 capital constitution.'],['EVIDENCE','Independent control review','3.84× verified value-to-cost and 28% fewer investigator hours.'],['ACTION','Budget ring-fenced','$2.4M expansion reserve protected from general cuts.'],['RISK ACCEPTED','Concentration exposure','Current detection stack depends on two external model providers.'],['QUALITY BOUNDARY','96% investigation fitness','No reduction in alert coverage or explainability accepted.'],['RECONSIDERATION','Quarterly portfolio auction','Protection expires if value ratio falls below 2.50×.']
    ]},
    3: { hash: '2B74:1C90', title: 'Retry covenant triggered', summary: 'Client Service Agent exceeded its approved retry boundary, creating avoidable model and tool-call expense without a corresponding increase in resolved cases.', cells: [
      ['AUTHORITY','Automatic covenant','Contract CC-003 permits retry containment.'],['EVIDENCE','Agent execution trace','16% rework rate and 8.2% unresolved loop frequency.'],['ACTION','Retries capped','Two failures now return the case to human service.'],['RISK ACCEPTED','Higher manual queue','Expected temporary increase of 310 cases per week.'],['QUALITY BOUNDARY','89% resolution quality','No automated closure below confidence threshold.'],['RECONSIDERATION','14-day cure period','Restore one retry only after verified improvement.']
    ]},
    4: { hash: '7D19:77B4', title: 'Attribution evidence expired', summary: 'Marketing Studio continued to generate activity after the approved campaign-to-revenue attribution method lapsed, causing the workload to lose capital authority.', cells: [
      ['AUTHORITY','Contract expiration','No active authority exists for expansion spend.'],['EVIDENCE','Attribution control failure','34% of generated assets lack campaign outcome linkage.'],['ACTION','Expansion frozen','New video and synthetic spokesperson work blocked.'],['RISK ACCEPTED','Campaign delay','Two regional launches may move by one week.'],['QUALITY BOUNDARY','Brand review preserved','Existing approved campaigns may continue.'],['RECONSIDERATION','Evidence reinstatement','CMO and Finance must certify restored attribution.']
    ]},
    5: { hash: '03F2:C814', title: 'Portfolio auction sealed', summary: 'The board reserve was allocated using risk-adjusted value, evidence confidence, reversibility and strategic necessity rather than project sponsorship alone.', cells: [
      ['AUTHORITY','Board-ratified mandate','FY26 reserve allocation policy.'],['EVIDENCE','Five competing bids','Independent scores across value, risk and reversibility.'],['ACTION','Capital allocated','$4.0M funded, $1.1M conditional, $1.6M retained.'],['RISK ACCEPTED','Opportunity cost','Marketing video expansion deferred.'],['QUALITY BOUNDARY','Evidence confidence floor','No bid below 60% confidence received full funding.'],['RECONSIDERATION','Monthly auction','Unfunded bids may return with stronger evidence.']
    ]}
  }
};

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateClock() {
  const now = new Date();
  $('#clock').textContent = now.toLocaleString('en-US', {
    month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).toUpperCase();
}

function setView(view) {
  state.currentView = view;
  $$('.nav-button').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  $$('.view').forEach(panel => panel.classList.toggle('active', panel.dataset.viewPanel === view));
  $$('#mobileMenu [data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  if (location.protocol.startsWith('http')) history.replaceState(null, '', `/institution/meridian/${view}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  stopNarration();
  updateGuide(view);
  if (autoNarrate && view !== lastNarratedView) {
    lastNarratedView = view;
    setTimeout(() => narrateView(view), 400);
  }
}

function openChief(question = '') {
  $('#chiefPanel').classList.add('open');
  $('#chiefBackdrop').classList.add('open');
  if (question) {
    $('#chiefQuestion').value = question;
    $('#chiefQuestion').focus();
  }
}

function closeChief() {
  $('#chiefPanel').classList.remove('open');
  $('#chiefBackdrop').classList.remove('open');
}

function renderMarkdown(text) {
  let html = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // tables
    .replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)*)/gm, (_, header, sep, body) => {
      const th = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`;
    })
    // headings
    .replace(/^### (.+)$/gm, '<h5>$1</h5>')
    .replace(/^## (.+)$/gm, '<h4>$1</h4>')
    .replace(/^# (.+)$/gm, '<h3>$1</h3>')
    // bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // paragraphs
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
  return `<p>${html}</p>`.replace(/<p><\/p>/g, '').replace(/<p>(<h[345]>)/g, '$1').replace(/(<\/h[345]>)<\/p>/g, '$1').replace(/<p>(<table>)/g, '$1').replace(/(<\/table>)<\/p>/g, '$1').replace(/<p>(<ul>)/g, '$1').replace(/(<\/ul>)<\/p>/g, '$1');
}

function addMessage(role, text, isMarkdown = false) {
  const thread = $('#chiefThread');
  const node = document.createElement('div');
  node.className = `message ${role}`;
  node.innerHTML = `<span>${role === 'user' ? 'YOU' : 'CAPITAL CHIEF'}</span><div class="msg-body"></div>`;
  const body = $('.msg-body', node);
  if (isMarkdown) body.innerHTML = renderMarkdown(text);
  else body.textContent = text;
  thread.appendChild(node);
  thread.scrollTop = thread.scrollHeight;
  return node;
}

// ── contract actions ──
const CONTRACT_ACTIONS = {
  BREACH: [
    { label: 'ENFORCE CURE', className: 'action-primary', action: 'cure' },
    { label: 'ASK CHIEF', className: '', action: 'ask' }
  ],
  CURE: [
    { label: 'SEAL CONTRACT', className: 'action-primary', action: 'seal' },
    { label: 'ASK CHIEF', className: '', action: 'ask' }
  ],
  EXPIRED: [
    { label: 'RENEW CONTRACT', className: 'action-primary', action: 'renew' },
    { label: 'TERMINATE', className: 'action-danger', action: 'terminate' }
  ],
  VERIFIED: [],
  DRAFT: [
    { label: 'SEAL CONTRACT', className: 'action-primary', action: 'seal' }
  ]
};
let activeContractKey = 'research';

function executeContractAction(key, action) {
  const contract = state.contracts[key];
  if (!contract) return;
  const prevSeal = contract.seal;

  if (action === 'cure') {
    contract.seal = 'CURE';
    showToast(`Cure enforced · ${contract.title} moved from BREACH to CURE`);
  } else if (action === 'seal') {
    contract.seal = 'VERIFIED';
    showToast(`Contract sealed · ${contract.title} is now VERIFIED`);
  } else if (action === 'renew') {
    contract.seal = 'VERIFIED';
    contract.expiry = new Date(Date.now() + 365 * 86400000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    showToast(`Contract renewed · ${contract.title} expires ${contract.expiry}`);
  } else if (action === 'terminate') {
    contract.seal = 'TERMINATED';
    showToast(`Contract terminated · ${contract.title} removed from active portfolio`);
  } else if (action === 'ask') {
    openChief(`Review the ${contract.title} contract. It is currently in ${contract.seal} status. What should I do — enforce the cure, renegotiate terms, or escalate to human authority? Analyze the portfolio impact.`);
    return;
  }

  // update the card in the sidebar
  const cardEl = $(`.contract-card[data-contract-card="${key}"] em`);
  if (cardEl) {
    cardEl.textContent = contract.seal;
    cardEl.className = 'state';
    if (contract.seal === 'VERIFIED') cardEl.classList.add('strong');
    else if (contract.seal === 'CURE') cardEl.classList.add('warning');
    else if (contract.seal === 'TERMINATED') { cardEl.classList.add('expired'); cardEl.style.textDecoration = 'line-through'; }
  }
  const subtitleEl = $(`.contract-card[data-contract-card="${key}"] small`);
  if (subtitleEl) {
    if (contract.seal === 'VERIFIED') subtitleEl.textContent = 'Compliant — within all boundaries';
    else if (contract.seal === 'CURE') subtitleEl.textContent = 'Cure in force — monitoring';
    else if (contract.seal === 'TERMINATED') subtitleEl.textContent = 'Contract terminated';
  }

  // create an evidence receipt
  const receiptId = Object.keys(state.receipts).length + 1;
  const hash = Math.random().toString(16).slice(2, 6).toUpperCase() + ':' + Math.random().toString(16).slice(2, 6).toUpperCase();
  state.receipts[receiptId] = {
    hash,
    title: `${contract.title} — ${prevSeal} → ${contract.seal}`,
    summary: `Contract status changed from ${prevSeal} to ${contract.seal} by executive action.`,
    cells: [
      ['AUTHORITY', 'Executive action', 'Direct capital authority exercised.'],
      ['EVIDENCE', 'Contract review', `${contract.title} was in ${prevSeal} status.`],
      ['ACTION', `Status changed to ${contract.seal}`, `Contract ${key} updated.`],
      ['RISK ACCEPTED', 'Policy change', 'New status takes immediate effect.'],
      ['QUALITY BOUNDARY', contract.quality + ' floor', 'Quality covenant unchanged.'],
      ['RECONSIDERATION', 'Next review cycle', 'Standard evidence review applies.']
    ]
  };

  // re-render
  renderContract(key);

  // update breach count in command view
  const breaches = Object.values(state.contracts).filter(c => ['BREACH', 'EXPIRED', 'CURE'].includes(c.seal)).length;
  const statusEl = $('.status-amber');
  if (statusEl) {
    statusEl.textContent = breaches > 0 ? `${breaches} CAPITAL BREACH${breaches > 1 ? 'ES' : ''}` : 'ALL CONTRACTS COMPLIANT';
    statusEl.style.color = breaches > 0 ? '' : 'var(--good)';
  }
}

function renderContractActions(key) {
  const contract = state.contracts[key];
  const actionsEl = $('#contractActions');
  if (!contract || !actionsEl) return;
  activeContractKey = key;
  const actions = CONTRACT_ACTIONS[contract.seal] || [];
  actionsEl.innerHTML = actions.map(a =>
    `<button class="${a.className}" data-contract-action="${a.action}">${a.label}</button>`
  ).join('');
  $$('[data-contract-action]', actionsEl).forEach(btn => {
    btn.addEventListener('click', () => executeContractAction(key, btn.dataset.contractAction));
  });
}

function portfolioContext() {
  return {
    portfolio: {
      annualCapital: 38.4,
      committedCapital: 31.7,
      verifiedValue: 57.2,
      atRiskCapital: 4.8,
      avoidableCost: 2.1,
      breachCount: 3,
      verifiedReturn: 1.49
    },
    workloads: [
      { name: 'Research Copilot', runRate: 8.7, valueToCost: 0.82, status: 'breach' },
      { name: 'Fraud Sentinel', runRate: 5.1, valueToCost: 3.84, status: 'verified' },
      { name: 'Client Service Agent', runRate: 6.8, valueToCost: 1.12, status: 'cure' },
      { name: 'Treasury Forecasting', runRate: 3.4, valueToCost: 2.26, status: 'verified' },
      { name: 'Marketing Studio', runRate: 4.3, valueToCost: 0.64, status: 'expired' }
    ],
    currentView: state.currentView
  };
}

async function askChief(question) {
  addMessage('user', question);
  const loading = addMessage('assistant', 'Reading the portfolio record and testing the economic boundary…');
  try {
    const response = await fetch('/api/chief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context: portfolioContext() })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Chief Capital Officer failed.');
    $('.msg-body', loading).innerHTML = renderMarkdown(data.answer);
    state.lastChiefAnswer = data.answer;
    const modelLabel = data.model ? data.model.toUpperCase() : 'AI';
    $('#chiefMode').textContent = data.mode === 'live' ? `${modelLabel} · GROUNDED IN PORTFOLIO` : data.fallbackReason ? `DEMO · ${data.fallbackReason.slice(0, 60)}` : 'DEMO INTELLIGENCE · ADD API KEY FOR LIVE';
  } catch (error) {
    const q = question.toLowerCase();
    const fallback = q.includes('cut') || q.includes('remove') || q.includes('save')
      ? '## Recommendation\n\nExecute a **staged efficiency mandate**. Reroute low-complexity Research Copilot work, cap premium inference at **28%**, and stop Client Service Agent retries after the second failure.\n\n## Preserve\n\n- **Fraud Sentinel** — verified value-to-cost ratio **3.84×**, strongest in portfolio\n\n## Decision Boundary\n\nDo not accept quality below **91%** or a regulatory-review increase above **6%**.'
      : q.includes('fund') || q.includes('receive') || q.includes('allocate')
        ? '## Capital Allocation\n\n- **Priority 1**: Fund Fraud Sentinel expansion (**3.84×** value-to-cost)\n- **Priority 2**: Fund Treasury Forecasting (**2.26×** value-to-cost)\n- **Priority 3**: Place Research Copilot under conditional margin-cure funding\n- **Hold**: Do not release Marketing Studio capital until attribution evidence is independently restored.'
        : '## Portfolio Status\n\nThe portfolio is inside budget but **outside its economic constitution**.\n\n## Immediate Orders\n\n- **Contain** the two margin-negative workloads\n- **Preserve** the strongest verified control workload\n- **Require** an accountable owner to renew every expired capital contract';
    $('.msg-body', loading).innerHTML = renderMarkdown(fallback);
    state.lastChiefAnswer = fallback;
    $('#chiefMode').textContent = 'LOCAL DEMO INTELLIGENCE · API NOT CONNECTED';
  }
}

// ── instruction guide banner ──
const GUIDE = {
  command: { what: 'Click "ISSUE ORDERS" to enforce the three capital decisions.', when: 'Start here.', how: 'Read each order, then click the gold button. Click any workload row to inspect its contract.', next: 'After issuing orders → open Contracts to review the five capital instruments.' },
  contracts: { what: 'Select each contract to review its seal, cure clause, and authority.', when: 'After issuing orders.', how: 'Click a contract card on the left. Check if it says BREACH, CURE, or VERIFIED. Use "+ Issue Contract" to draft a new one with the AI Chief.', next: 'After reviewing → open Market to run the capital auction.' },
  market: { what: 'Click "RUN AUCTION" to allocate capital across workloads.', when: 'After reviewing contracts.', how: 'The auction ranks workloads by value-to-cost. Watch which get funded and which are rejected. Review the frontier chart.', next: 'After the auction → open Shock Lab to stress-test margin scenarios.' },
  shock: { what: 'Drag the sliders to simulate margin shocks, then click "APPLY CURE".', when: 'After running the auction.', how: 'Move Premium Model % up to see margin collapse. Click Apply Cure to see the recommended fix. Save the scenario as evidence.', next: 'After testing → open Evidence to review the full audit trail.' },
  evidence: { what: 'Click each evidence receipt, then export the board record.', when: 'After stress-testing.', how: 'Select receipts on the left to see decision records. Click "EXPORT BOARD RECORD" to download. Use "TEST THE RECORD" to ask the AI if it\'s defensible.', next: 'Complete → ask the Capital Chief any remaining question.' }
};
let currentViewId = 'command';
function updateGuide(id) {
  currentViewId = id;
  const g = GUIDE[id];
  if (!g) { $('#guide-bar').classList.remove('visible'); return; }
  $('#guide-bar').innerHTML =
    `<span class="guide-seg"><span class="gl">Do</span> ${g.what}</span>` +
    `<span class="guide-seg"><span class="gl">When</span> ${g.when}</span>` +
    `<span class="guide-seg"><span class="gl">How</span> ${g.how}</span>` +
    `<span class="guide-seg gn"><span class="gl">Next</span> ${g.next}</span>`;
  $('#guide-bar').classList.add('visible');
}

// ── transcript bar ──
const trBar = $('#transcript-bar'), trWords = $('#tr-words');
let trActive = false, trWordEls = [], trCurrentIdx = -1, trAnimFrame = 0;
function trShow(words) {
  trBar.classList.add('active'); trActive = true;
  trWords.innerHTML = words.map(w => `<span class="tw">${w}</span>`).join('');
  trWordEls = $$('.tw', trWords); trCurrentIdx = -1;
}
function trHighlight(idx) {
  if (idx < 0 || idx >= trWordEls.length) return;
  trWordEls.forEach((el, i) => {
    el.classList.remove('current', 'near');
    if (i === idx) el.classList.add('current');
    else if (Math.abs(i - idx) <= 3) el.classList.add('near');
  });
  trCurrentIdx = idx;
  const el = trWordEls[idx], container = trWords.parentElement;
  const offset = el.offsetLeft + el.offsetWidth / 2 - container.offsetWidth / 2;
  trWords.style.transform = `translateX(${-offset}px)`;
  trWords.style.transition = 'transform .18s ease';
}
function trHide() { trBar.classList.remove('active'); trActive = false; trWords.innerHTML = ''; trCurrentIdx = -1; }

// ── narration engine with transcript ──
let autoNarrate = false, lastNarratedView = '', narrating = false, activeAudio = null, narGeneration = 0, narAbort = null, activeUtterance = null;

function updateNarrateButton() {
  const btn = $('#narrate-btn');
  if (narrating) { btn.textContent = '■ STOP'; btn.classList.add('playing'); }
  else { btn.textContent = '▶ NARRATE'; btn.classList.remove('playing'); }
}

function stopNarration() {
  narGeneration++;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  activeUtterance = null;
  clearTimeout(trAnimFrame);
  if (narAbort) { try { narAbort.abort(); } catch (_) {} narAbort = null; }
  if (activeAudio) { try { activeAudio.pause(); activeAudio.currentTime = 0; activeAudio.src = ''; } catch (_) {} activeAudio = null; }
  narrating = false; trHide(); updateNarrateButton();
}

function narrateText(text, cb) {
  stopNarration(); narrating = true; updateNarrateButton();
  const gen = narGeneration;
  const words = text.split(/\s+/).filter(w => w.length > 0);
  trShow(words);
  showToast('Loading voice…');

  // try ElevenLabs cloned voice first
  narAbort = new AbortController();
  fetch('/api/narrate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }), signal: narAbort.signal })
    .then(res => { if (!res.ok) throw new Error(); return res.blob(); })
    .then(blob => {
      if (gen !== narGeneration) return;
      const audio = new Audio(URL.createObjectURL(blob));
      activeAudio = audio;
      const duration = words.length * 0.28;
      audio.onplay = () => {
        let i = 0;
        const step = () => {
          if (gen !== narGeneration || !trActive || i >= words.length) { if (gen === narGeneration) { narrating = false; activeAudio = null; updateNarrateButton(); setTimeout(trHide, 800); } return; }
          trHighlight(i); i++;
          const interval = (audio.duration || duration) / words.length * 1000;
          trAnimFrame = setTimeout(step, interval);
        }; step();
      };
      audio.onended = () => { if (gen !== narGeneration) return; clearTimeout(trAnimFrame); narrating = false; activeAudio = null; updateNarrateButton(); if (cb) cb(); setTimeout(trHide, 1200); };
      audio.onerror = () => { if (gen !== narGeneration) return; narrating = false; activeAudio = null; updateNarrateButton(); trHide(); narrateBrowser(text, words, cb, gen); };
      audio.play().catch(() => { if (gen !== narGeneration) return; narrating = false; activeAudio = null; updateNarrateButton(); trHide(); });
    })
    .catch(e => {
      if (gen !== narGeneration || e.name === 'AbortError') return;
      // fallback to browser speech only if ElevenLabs fails
      narrateBrowser(text, words, cb, gen);
    });
}
function narrateBrowser(text, words, cb, gen) {
  if (gen === undefined) gen = narGeneration;
  if (!('speechSynthesis' in window) || gen !== narGeneration) { trHide(); narrating = false; updateNarrateButton(); return; }
  speechSynthesis.cancel();
  setTimeout(() => {
    if (gen !== narGeneration) return;
    narrating = true; updateNarrateButton(); trShow(words);
    const u = new SpeechSynthesisUtterance(text); u.rate = 0.88; u.pitch = 0.86;
    activeUtterance = u;
    let wordIdx = 0;
    u.onboundary = e => { if (gen !== narGeneration) { speechSynthesis.cancel(); return; } if (e.name === 'word') { trHighlight(wordIdx); wordIdx++; } };
    u.onend = () => { if (gen !== narGeneration) return; narrating = false; activeUtterance = null; updateNarrateButton(); if (cb) cb(); setTimeout(trHide, 1200); };
    u.onerror = () => { if (gen !== narGeneration) return; narrating = false; activeUtterance = null; updateNarrateButton(); trHide(); };
    speechSynthesis.speak(u);
    showToast('Browser narration · ElevenLabs not configured');
  }, 50);
}
const VIEW_NARRATION = {
  command: 'Welcome to Capital Constitution — the economic authority layer for enterprise AI. You are the capital authority for Meridian Global. Five AI workloads are running, but three are consuming capital without verified value. Your first action: click Issue Orders to enforce three binding capital decisions. Then scroll down to see the portfolio table — click any workload row to inspect its contract. When you are ready, use the navigation rail on the left to move to Contracts, Market, Shock Lab, and Evidence. Each view has a specific action to complete. The guide bar at the top will tell you exactly what to do next.',
  contracts: 'These are the five executable capital contracts. Each workload operates under a binding instrument with a seal status — Verified, Cure, Breach, or Expired. Click each contract card on the left to read its terms. Pay attention to the cure conditions and return authority clauses — these define who can override the contract and under what conditions. When you are ready, click the plus Issue Contract button to draft a new contract with the AI Capital Chief. Then move to the Market view.',
  market: 'This is the capital market. Click Run Auction to allocate funding across the five workloads. The auction ranks each workload by its verified value-to-cost ratio and decides which receive funding, which get conditional approval, and which are rejected. Below the auction, the efficient frontier chart shows the optimal quality-cost tradeoff. Review the four rules of the portfolio constitution at the bottom, then move to the Shock Lab.',
  shock: 'This is the Margin Shock Lab. Drag the six sliders on the left to simulate what happens when users grow, premium model traffic increases, or retry rates spike. Watch the margin number and breach state update in real time on the right. When you push the margin into breach territory, click Apply Cure to see the recommended recovery. You can also save the scenario as sealed evidence. When done, move to the Evidence view.',
  evidence: 'This is the evidence record — every capital decision leaves an auditable receipt. Click each receipt on the left to see the full record: who authorised it, what evidence supported it, what risk was accepted, and when it must be reconsidered. Click Export Board Record to download the complete trail. Use Test The Record to ask the AI Capital Chief whether a regulator would find this defensible. This completes the demo flow.'
};
function narrateView(viewId) {
  const text = VIEW_NARRATION[viewId];
  if (text) narrateText(text);
}
// simple narrate for direct text (hear brief, speak last)
function narrate(text) { if (text) narrateText(text); }

function renderContract(key) {
  const contract = state.contracts[key];
  if (!contract) return;
  const fields = {
    '#contractCode': contract.code, '#contractTitle': contract.title, '#contractSubtitle': contract.subtitle,
    '#contractSeal': contract.seal, '#contractOwner': contract.owner, '#contractRisk': contract.risk,
    '#contractExpiry': contract.expiry, '#contractCeiling': contract.ceiling, '#contractValue': contract.value,
    '#contractQuality': contract.quality, '#contractModel': contract.model, '#contractCure': contract.cure,
    '#contractReturn': contract.return
  };
  Object.entries(fields).forEach(([selector, value]) => { $(selector).textContent = value; });
  const seal = $('.instrument-seal');
  const sealColor = contract.seal === 'VERIFIED' ? 'var(--good)' : contract.seal === 'CURE' ? 'var(--warn)' : contract.seal === 'EXPIRED' ? 'var(--muted)' : contract.seal === 'DRAFT' ? 'var(--accent)' : contract.seal === 'TERMINATED' ? 'var(--faint)' : 'var(--bad)';
  seal.style.borderColor = sealColor;
  $('#contractSeal').style.color = sealColor;
  $$('.contract-card').forEach(card => card.classList.toggle('active', card.dataset.contractCard === key));
  renderContractActions(key);
}

function renderReceipt(id) {
  const receipt = state.receipts[id];
  if (!receipt) return;
  const detail = $('#receiptDetail');
  detail.innerHTML = `
    <div class="receipt-document-top"><span>DECISION RECEIPT · ${receipt.hash}</span><span>VERIFIED</span></div>
    <h2>${receipt.title}</h2>
    <p class="receipt-summary">${receipt.summary}</p>
    <div class="receipt-grid">${receipt.cells.map(([label,title,copy]) => `<div><span>${label}</span><b>${title}</b><p>${copy}</p></div>`).join('')}</div>
    <div class="proof-strip"><span>POLICY v4.2</span><span>INPUT ${receipt.hash.replace(':','')}…E77C</span><span>OUTPUT ${receipt.hash.replace(':','')}…9F21</span><span>CHAIN VALID</span></div>`;
  $$('.receipt').forEach(button => button.classList.toggle('active', button.dataset.receipt === String(id)));
}

function formatMoney(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  return `$${Math.round(value / 1000)}k`;
}

function calculateScenario() {
  const users = +$('#usersRange').value;
  const interactions = +$('#interactionsRange').value;
  const premium = +$('#premiumRange').value / 100;
  const retry = +$('#retryRange').value / 100;
  const price = +$('#priceRange').value;
  const reviewMinutes = +$('#reviewRange').value;

  const monthlyInteractions = users * interactions * (1 + retry);
  const blendedInference = (premium * 0.82) + ((1 - premium) * 0.24);
  const modelCost = monthlyInteractions * blendedInference;
  const reviewCost = users * interactions * (reviewMinutes / 60) * 6.75 * (0.48 + retry);
  const platformCost = users * 2.15 + 116000;
  const totalCost = modelCost + reviewCost + platformCost;
  const revenue = users * price;
  const margin = ((revenue - totalCost) / revenue) * 100;
  const monthlyProfit = revenue - totalCost;

  $('#usersValue').textContent = users.toLocaleString();
  $('#interactionsValue').textContent = interactions.toFixed(0);
  $('#premiumValue').textContent = `${Math.round(premium * 100)}%`;
  $('#retryValue').textContent = `${Math.round(retry * 100)}%`;
  $('#priceValue').textContent = `$${price}`;
  $('#reviewValue').textContent = reviewMinutes.toFixed(1);
  $('#marginValue').textContent = `${margin < 0 ? '−' : ''}${Math.abs(margin).toFixed(1)}%`;
  $('#marginDelta').textContent = `${formatMoney(Math.abs(monthlyProfit))} monthly ${monthlyProfit < 0 ? 'loss' : 'contribution'}`;
  $('#revenueValue').textContent = formatMoney(revenue);
  $('#modelCostValue').textContent = formatMoney(modelCost + platformCost);
  $('#reviewCostValue').textContent = formatMoney(reviewCost);

  const max = Math.max(revenue, modelCost + platformCost, reviewCost);
  $('#revenueBar').style.width = `${Math.min(100, revenue / max * 100)}%`;
  $('#modelBar').style.width = `${Math.min(100, (modelCost + platformCost) / max * 100)}%`;
  $('#reviewBar').style.width = `${Math.min(100, reviewCost / max * 100)}%`;

  const scenarioState = $('#scenarioState');
  const stateLabel = $('b', scenarioState);
  const marginNode = $('#marginValue');
  if (margin < 0) {
    stateLabel.textContent = 'MARGIN BREACH';
    stateLabel.style.color = 'var(--bad)';
    scenarioState.style.borderColor = 'var(--bad)';
    marginNode.style.color = 'var(--bad)';
  } else if (margin < 15) {
    stateLabel.textContent = 'CAPITAL AT RISK';
    stateLabel.style.color = 'var(--warn)';
    scenarioState.style.borderColor = 'var(--warn)';
    marginNode.style.color = 'var(--warn)';
  } else {
    stateLabel.textContent = 'WITHIN MANDATE';
    stateLabel.style.color = 'var(--good)';
    scenarioState.style.borderColor = 'var(--good)';
    marginNode.style.color = 'var(--good)';
  }

  const recommendedPremium = Math.max(12, Math.min(35, Math.round(20 + (price - 20) * 0.35 - retry * 20)));
  const curedBlended = (recommendedPremium / 100 * 0.82) + ((1 - recommendedPremium / 100) * 0.24);
  const curedCost = monthlyInteractions * curedBlended + reviewCost * 0.82 + platformCost;
  const curedMargin = ((revenue - curedCost) / revenue) * 100;
  $('#cureHeadline').textContent = `Reduce premium routing to ${recommendedPremium}%`;
  $('#cureCopy').textContent = `Preserves the approved quality floor while moving projected contribution margin to ${curedMargin.toFixed(1)}%.`;

  const breachUsers = Math.max(10000, Math.min(150000, Math.round((price * 58000) / Math.max(1, interactions * (blendedInference + reviewMinutes * .06)) / 1000) * 1000));
  const x = 60 + ((breachUsers - 10000) / 140000) * 990;
  $('#breachMarker').setAttribute('x1', x);
  $('#breachMarker').setAttribute('x2', x);
  $('#breachLabel').setAttribute('x', Math.min(860, x + 12));
  $('#breachLabel').textContent = `BREACH AT ${(breachUsers / 1000).toFixed(0)}K USERS`;

  // slider health hints
  function setHint(id, text, level) {
    const el = $(`#${id}`);
    if (!el) return;
    el.textContent = text;
    el.className = `range-hint hint-${level}`;
  }
  setHint('usersHint', users <= 50000 ? 'manageable' : users <= 100000 ? 'scaling fast' : 'high burn risk', users <= 50000 ? 'good' : users <= 100000 ? 'warn' : 'bad');
  setHint('interactionsHint', interactions <= 20 ? 'normal' : interactions <= 40 ? 'heavy usage' : 'extreme cost', interactions <= 20 ? 'good' : interactions <= 40 ? 'warn' : 'bad');
  setHint('premiumHint', premium * 100 <= 35 ? 'within contract' : premium * 100 <= 60 ? 'above limit' : 'severe overrun', premium * 100 <= 35 ? 'good' : premium * 100 <= 60 ? 'warn' : 'bad');
  setHint('retryHint', retry * 100 <= 10 ? 'healthy' : retry * 100 <= 20 ? 'leaking cost' : 'loop failure', retry * 100 <= 10 ? 'good' : retry * 100 <= 20 ? 'warn' : 'bad');
  setHint('priceHint', price >= 35 ? 'strong margin' : price >= 20 ? 'tight margin' : 'below cost', price >= 35 ? 'good' : price >= 20 ? 'warn' : 'bad');
  setHint('reviewHint', reviewMinutes <= 3 ? 'efficient' : reviewMinutes <= 6 ? 'adding cost' : 'human bottleneck', reviewMinutes <= 3 ? 'good' : reviewMinutes <= 6 ? 'warn' : 'bad');

  // scenario verdict
  const verdict = $('#scenarioVerdict');
  if (verdict) {
    const issues = [];
    if (premium * 100 > 35) issues.push(`Premium model share (${Math.round(premium * 100)}%) exceeds the contract limit of 35%`);
    if (retry * 100 > 10) issues.push(`Retry rate (${Math.round(retry * 100)}%) is burning cost without resolving cases`);
    if (price < 20) issues.push(`Price ($${price}/user) is below the economic floor for this workload`);
    if (reviewMinutes > 6) issues.push(`Human review (${reviewMinutes.toFixed(1)} min) is creating an operational bottleneck`);
    if (margin < 0) issues.push(`Margin is negative — this workload is losing $${Math.abs(monthlyProfit / 1000).toFixed(0)}k/month`);
    if (issues.length === 0) {
      verdict.innerHTML = '<b style="color:var(--good)">SCENARIO HEALTHY</b>All parameters are within approved boundaries. This scenario is economically sustainable.';
    } else {
      verdict.innerHTML = `<b style="color:${margin < 0 ? 'var(--bad)' : 'var(--warn)'}">SCENARIO HAS ${issues.length} ISSUE${issues.length > 1 ? 'S' : ''}</b>${issues.join('. ')}.${margin < 0 ? ' Click Apply Cure to see the recommended fix.' : ' Adjust sliders to explore tradeoffs.'}`;
    }
  }

  return { users, interactions, premium, retry, price, reviewMinutes, revenue, totalCost, margin, recommendedPremium, curedMargin };
}

function applyCure() {
  const scenario = calculateScenario();
  $('#premiumRange').value = scenario.recommendedPremium;
  $('#retryRange').value = Math.max(5, Math.round(+$('#retryRange').value * .55));
  $('#reviewRange').value = Math.max(2, +$('#reviewRange').value - 1.5);
  calculateScenario();
  showToast('Cure applied · route mix and retry policy updated');
}

function exportBoardRecord() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const ctx = portfolioContext();
  const p = ctx.portfolio;

  // contract status table
  const contractRows = Object.entries(state.contracts).map(([key, c]) => {
    return `| ${c.title} | ${c.seal} | ${c.owner} | ${c.ceiling} | ${c.value} | ${c.quality} |`;
  }).join('\n');

  // executive orders
  const orders = [
    'Contain Research Copilot margin leakage — reroute low-complexity work, cap premium model traffic.',
    'Protect Fraud Sentinel expansion capital — ring-fence funding based on verified 3.84× value-to-cost.',
    'Return expired contracts to human authority — require executive signatures within 72 hours.'
  ];

  // evidence receipts
  const receiptRows = Object.values(state.receipts).map(r => {
    return `| \`${r.hash}\` | ${r.title} | ${r.summary} |`;
  }).join('\n');

  // auction results
  let auctionSection = '';
  if (state.auctionSealed) {
    const auctionBids = [
      { key: 'fraud', name: 'Fraud Sentinel — Expansion', bid: 2.4 },
      { key: 'treasury', name: 'Treasury Forecasting — Europe', bid: 1.6 },
      { key: 'research', name: 'Research Copilot — Margin Cure', bid: 1.1 },
      { key: 'service', name: 'Client Service Agent — Languages', bid: 1.3 },
      { key: 'marketing', name: 'Marketing Studio — Video', bid: 2.8 }
    ];
    const auctionRows = auctionBids.map(b => {
      const decision = state.auctionDecisions[b.key] || 'undecided';
      return `| ${b.name} | $${b.bid.toFixed(1)}M | **${decision.toUpperCase()}** |`;
    }).join('\n');
    const totalFunded = auctionBids.filter(b => state.auctionDecisions[b.key] === 'fund').reduce((s, b) => s + b.bid, 0);
    auctionSection = `\n## Capital Auction Results\n\n| Initiative | Bid | Decision |\n|------------|-----|----------|\n${auctionRows}\n\n**Total allocated:** $${totalFunded.toFixed(1)}M of $6.7M available capital.\n`;
  }

  // breach count
  const breaches = Object.values(state.contracts).filter(c => ['BREACH', 'EXPIRED', 'CURE'].includes(c.seal));
  const compliant = Object.values(state.contracts).filter(c => c.seal === 'VERIFIED');

  const md = `# CAPITAL//CONSTITUTION — Board Record

> **Meridian Global** · AI Capital Authority
> Generated ${dateStr} at ${timeStr} UTC
> Classification: Board Confidential

---

## Executive Summary

The enterprise AI portfolio comprises **$${p.annualCapital}M** in annual capital across **${Object.keys(state.contracts).length} workloads**. Committed capital stands at **$${p.committedCapital}M** (${((p.committedCapital / p.annualCapital) * 100).toFixed(1)}%). Verified value returned: **$${p.verifiedValue}M** at a portfolio return of **${p.verifiedReturn}×**.

- **${compliant.length}** contracts are compliant and verified
- **${breaches.length}** contracts require attention${breaches.length > 0 ? ' (' + breaches.map(c => c.title + ': ' + c.seal).join(', ') + ')' : ''}
- **$${p.atRiskCapital}M** capital at risk
- **$${p.avoidableCost}M** avoidable cost identified

---

## Executive Orders Issued

${state.ordersIssued ? orders.map((o, i) => `${i + 1}. ${o}`).join('\n') : '*No executive orders have been issued in this session.*'}

---

## Portfolio Contract Status

| Workload | Seal | Owner | Ceiling | Value | Quality |
|----------|------|-------|---------|-------|---------|
${contractRows}

---
${auctionSection}
## Evidence Record

All material capital decisions are recorded below with authority, evidence, action, risk accepted, quality boundary, and reconsideration terms.

| Receipt | Decision | Summary |
|---------|----------|---------|
${receiptRows || '| — | No receipts recorded | — |'}

---

## Portfolio Constitution

The following rules are board-ratified and govern all capital allocation decisions:

1. **Evidence before scale** — No workload receives expansion capital until value attribution survives independent challenge.
2. **Quality is a covenant** — Cost reduction that breaks the approved quality or control floor is not a saving.
3. **Authority must expire** — Every autonomous spending mandate has an owner, limit, renewal date and return condition.
4. **Reversibility earns capital** — Reversible experiments receive preference when evidence quality is uncertain.

---

## Attestation

This record was generated by CAPITAL//CONSTITUTION, the economic authority layer for enterprise AI at Meridian Global. Every decision referenced in this document is traceable to a sealed evidence receipt.

**Record integrity:** All contract actions, auction decisions, and scenario analyses performed during this session are included above.

---

*CAPITAL//CONSTITUTION · Meridian Global · ${dateStr}*
`;

  // render markdown to styled HTML and open print dialog for PDF
  const html = renderMarkdown(md);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Board Record — Meridian Global</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
body{font-family:Inter,system-ui,sans-serif;color:#17191d;max-width:820px;margin:40px auto;padding:0 32px;line-height:1.7;font-size:13px}
h1{font-size:28px;font-weight:700;letter-spacing:-.02em;border-bottom:3px solid #17191d;padding-bottom:12px;margin-bottom:8px}
h2{font-size:16px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#9d6e16;margin-top:36px;margin-bottom:12px;border-bottom:1px solid #c8c5bd;padding-bottom:6px}
h3{font-size:14px;font-weight:700;margin-top:24px}
h4{font-size:13px;font-weight:700;color:#9d6e16;text-transform:uppercase;letter-spacing:.06em;margin-top:28px;margin-bottom:8px}
h5{font-size:12px;font-weight:600;color:#666}
blockquote{margin:0 0 20px;padding:12px 16px;background:#f7f5ef;border-left:3px solid #9d6e16;font:400 11px/1.6 'IBM Plex Mono',monospace;color:#666}
table{width:100%;border-collapse:collapse;margin:16px 0;font-size:11px}
th{text-align:left;padding:8px 10px;background:#f7f5ef;border-bottom:2px solid #c8c5bd;font:600 9px/1 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#666}
td{padding:8px 10px;border-bottom:1px solid #e8e7e2}
strong{font-weight:700}
em{font-style:italic}
hr{border:none;border-top:1px solid #c8c5bd;margin:28px 0}
ul{padding-left:20px}
li{margin:4px 0}
p code,li code{font-family:'IBM Plex Mono',monospace;font-size:10px;background:#f0efe9;padding:2px 5px;border-radius:2px}
@media print{body{margin:0;padding:20px}h1{font-size:22px}h2{font-size:14px;margin-top:24px}}
</style></head><body>${html}
<script>setTimeout(()=>window.print(),400)<\/script>
</body></html>`);
  printWindow.document.close();
  showToast('Board record opened — save as PDF from print dialog');
}

function bindEvents() {
  $$('.nav-button').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  $$('[data-jump]').forEach(button => button.addEventListener('click', () => setView(button.dataset.jump)));

  // hamburger mobile menu
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  $$('[data-view]', mobileMenu).forEach(btn => {
    btn.addEventListener('click', () => {
      setView(btn.dataset.view);
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      // update active state
      $$('[data-view]', mobileMenu).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  // mark initial active
  $('[data-view="command"]', mobileMenu)?.classList.add('active');
  $$('.table-row[data-contract]').forEach(button => button.addEventListener('click', () => { setView('contracts'); renderContract(button.dataset.contract); }));
  $$('.contract-card').forEach(button => button.addEventListener('click', () => renderContract(button.dataset.contractCard)));
  $$('.receipt').forEach(button => button.addEventListener('click', () => renderReceipt(button.dataset.receipt)));
  $$('.question-grid button').forEach(button => button.addEventListener('click', () => openChief(button.dataset.question)));

  $('#openChief').addEventListener('click', () => openChief());
  $('#closeChief').addEventListener('click', closeChief);
  $('#chiefBackdrop').addEventListener('click', closeChief);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeChief(); });

  $('#chiefForm').addEventListener('submit', async event => {
    event.preventDefault();
    const input = $('#chiefQuestion');
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
    await askChief(question);
  });
  $$('.prompt-chips button').forEach(button => button.addEventListener('click', () => {
    $('#chiefQuestion').value = button.textContent;
    $('#chiefQuestion').focus();
  }));

  $('#speakLast').addEventListener('click', () => narrate(state.lastChiefAnswer || $('.message.assistant .msg-body')?.textContent || ''));

  // narrate toggle: click while playing stops, otherwise starts
  $('#narrate-btn').addEventListener('click', () => {
    if (narrating) { stopNarration(); return; }
    narrateView(state.currentView);
  });
  // auto-narrate toggle
  $('#auto-narrate-btn').addEventListener('click', () => {
    autoNarrate = !autoNarrate;
    $('#auto-narrate-btn').classList.toggle('auto-on', autoNarrate);
    showToast(autoNarrate ? 'Auto narration on' : 'Auto narration off');
    if (autoNarrate) { lastNarratedView = state.currentView; narrateView(state.currentView); }
    else { stopNarration(); }
  });

  $('#executeOrders').addEventListener('click', () => {
    if (state.ordersIssued) { setView('contracts'); return; }
    state.ordersIssued = true;
    $('#executeOrders').textContent = 'ORDERS IN FORCE ✓';
    $('#executeOrders').style.background = 'var(--good)';
    // animate the order strip
    $$('.order-strip > div').forEach((div, i) => {
      div.style.transition = 'background .4s';
      setTimeout(() => { div.style.background = 'rgba(120,216,174,.06)'; }, i * 200);
    });
    showToast('Three capital orders issued → review contracts next');
    // pulse the contracts nav after a moment
    setTimeout(() => {
      const navBtn = $('.nav-button[data-view="contracts"]');
      navBtn.style.transition = 'color .3s';
      navBtn.style.color = 'var(--accent)';
      setTimeout(() => { navBtn.style.color = ''; }, 2000);
    }, 1500);
  });

  $('#governorSwitch').addEventListener('change', event => showToast(event.target.checked ? 'Autonomous governor enabled within Level 3 boundary' : 'Governor paused · recommendations remain active'));
  $('#reviewAuthority').addEventListener('click', () => openChief('Review the current autonomous authority boundary. What can the governor do, what must return to human authority, and where is the greatest control gap?'));
  $('#newContract').addEventListener('click', () => {
    const breached = Object.entries(state.contracts).filter(([_, c]) => c.seal === 'BREACH').map(([_, c]) => c.title);
    const expired = Object.entries(state.contracts).filter(([_, c]) => c.seal === 'EXPIRED').map(([_, c]) => c.title);
    const curing = Object.entries(state.contracts).filter(([_, c]) => c.seal === 'CURE').map(([_, c]) => c.title);
    const summary = [
      breached.length ? `Breached: ${breached.join(', ')}` : '',
      expired.length ? `Expired: ${expired.join(', ')}` : '',
      curing.length ? `In cure: ${curing.join(', ')}` : ''
    ].filter(Boolean).join('. ');
    openChief(summary ? `These contracts need attention: ${summary}. What is the priority order and what action should I take on each?` : 'All contracts are compliant. Should I adjust any terms, tighten quality floors, or prepare for the next review cycle?');
  });
  $('#testRecord').addEventListener('click', () => {
    // build evidence summary for the AI
    const receipts = Object.values(state.receipts);
    const receiptSummary = receipts.map((r, i) => `${i + 1}. [${r.hash}] ${r.title}: ${r.summary}`).join('\n');
    const contractStates = Object.values(state.contracts).map(c => `${c.title}: ${c.seal}`).join(', ');
    const prompt = `TEST THE EVIDENCE RECORD FOR BOARD DEFENSIBILITY.

CURRENT EVIDENCE RECEIPTS (${receipts.length} total):
${receiptSummary || 'No evidence receipts have been recorded yet.'}

CURRENT CONTRACT STATES: ${contractStates}
ORDERS ISSUED: ${state.ordersIssued ? 'Yes' : 'No'}
AUCTION SEALED: ${state.auctionSealed ? 'Yes' : 'No'}

REQUIRED RESPONSE STRUCTURE:
## Defensibility Verdict
State whether the record is board-defensible or not, and give a confidence score out of 100.

## Strongest Record
Identify the single strongest evidence receipt and explain why it would survive regulatory scrutiny.

## Weakest Record
Identify the weakest point in the evidence trail — what is missing, incomplete, or would not survive challenge.

## First Regulator Question
State the exact question a financial regulator would ask first when reviewing this record.

## Remediation Plan
Provide 3-5 specific actions to close the gaps identified above. Each action should have an owner, a deadline, and a measurable outcome.

## Lessons Learned
Document the key governance lessons from this session that should be applied to future AI capital decisions. Frame these as reusable institutional principles — like a flight simulator debrief — so the same methodology can be trained and repeated.

## Simulation Score
Rate the overall governance quality of this session from A (board-ready) to F (indefensible). Explain the grade.`;
    openChief(prompt);
  });

  $('#saveLessons').addEventListener('click', () => {
    if (!state.lastChiefAnswer) { showToast('Run "Test Defensibility" first to generate lessons'); return; }
    // save the last chief answer as an evidence receipt and export as PDF
    const receiptId = Object.keys(state.receipts).length + 1;
    const hash = Math.random().toString(16).slice(2, 6).toUpperCase() + ':' + Math.random().toString(16).slice(2, 6).toUpperCase();
    state.receipts[receiptId] = {
      hash,
      title: 'Defensibility test — lessons learned',
      summary: 'Board defensibility assessment with remediation plan, lessons learned, and simulation score.',
      cells: [
        ['AUTHORITY', 'Capital Chief Officer', 'AI-assisted governance assessment.'],
        ['EVIDENCE', 'Full evidence chain review', 'All receipts and contract states analysed.'],
        ['ACTION', 'Lessons documented', 'Remediation plan and reusable principles recorded.'],
        ['RISK ACCEPTED', 'Assessment is advisory', 'Final defensibility depends on external audit.'],
        ['QUALITY BOUNDARY', 'GPT-5.6-luna analysis', 'Grounded in portfolio context provided.'],
        ['RECONSIDERATION', 'Next governance cycle', 'Re-test after remediation actions are completed.']
      ]
    };
    // export the lessons as a styled PDF
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    const lessonsHtml = renderMarkdown(`# Governance Lessons Learned\n\n> **Meridian Global** · Capital Constitution Simulation Debrief\n> ${dateStr} · Board Confidential\n\n---\n\n${state.lastChiefAnswer}`);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Lessons Learned — Meridian Global</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
body{font-family:Inter,system-ui,sans-serif;color:#17191d;max-width:820px;margin:40px auto;padding:0 32px;line-height:1.7;font-size:13px}
h1{font-size:28px;font-weight:700;letter-spacing:-.02em;border-bottom:3px solid #17191d;padding-bottom:12px;margin-bottom:8px}
h2{font-size:16px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#9d6e16;margin-top:36px;margin-bottom:12px;border-bottom:1px solid #c8c5bd;padding-bottom:6px}
h3{font-size:14px;font-weight:700;margin-top:24px}
h4{font-size:13px;font-weight:700;color:#9d6e16;text-transform:uppercase;letter-spacing:.06em;margin-top:28px;margin-bottom:8px}
h5{font-size:12px;font-weight:600;color:#666}
blockquote{margin:0 0 20px;padding:12px 16px;background:#f7f5ef;border-left:3px solid #9d6e16;font:400 11px/1.6 'IBM Plex Mono',monospace;color:#666}
table{width:100%;border-collapse:collapse;margin:16px 0;font-size:11px}
th{text-align:left;padding:8px 10px;background:#f7f5ef;border-bottom:2px solid #c8c5bd;font:600 9px/1 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#666}
td{padding:8px 10px;border-bottom:1px solid #e8e7e2}
strong{font-weight:700}
hr{border:none;border-top:1px solid #c8c5bd;margin:28px 0}
ul{padding-left:20px}li{margin:4px 0}
@media print{body{margin:0;padding:20px}}
</style></head><body>${lessonsHtml}
<script>setTimeout(()=>window.print(),400)<\/script>
</body></html>`);
    printWindow.document.close();
    showToast('Lessons saved as evidence receipt and opened for PDF export');
  });

  // ── interactive auction ──
  const AUCTION_BUDGET = 6.7;
  const auctionBids = [
    { key: 'fraud', name: 'Fraud Sentinel — Expansion', bid: 2.4, vtc: 3.84, conf: 'High confidence · regulatory value' },
    { key: 'treasury', name: 'Treasury Forecasting — Europe', bid: 1.6, vtc: 2.26, conf: 'Medium-high confidence · reversible' },
    { key: 'research', name: 'Research Copilot — Margin Cure', bid: 1.1, vtc: 0.82, conf: 'Conditional · evidence required' },
    { key: 'service', name: 'Client Service Agent — Languages', bid: 1.3, vtc: 1.12, conf: 'Low confidence · retry leakage' },
    { key: 'marketing', name: 'Marketing Studio — Video', bid: 2.8, vtc: 0.64, conf: 'Attribution absent · irreversible spend' }
  ];
  state.auctionDecisions = {};
  state.auctionSealed = false;

  function renderAuction() {
    const stack = $('#auctionStack');
    stack.innerHTML = auctionBids.map((item, i) => {
      const decision = state.auctionDecisions[item.key] || 'undecided';
      const seal = state.contracts[item.key]?.seal || 'EXPIRED';
      const warning = (seal === 'BREACH' || seal === 'EXPIRED') ? ` · <span style="color:var(--bad)">${seal}</span>` : '';
      return `<div class="auction-card ${decision === 'fund' ? 'funded' : decision === 'reject' ? 'rejected-decision' : ''}" data-auction-key="${item.key}">
        <span class="rank">${String(i + 1).padStart(2, '0')}</span>
        <div><b>${item.name}</b><small>${item.conf}${warning}</small></div>
        <div class="bid"><b>$${item.bid.toFixed(1)}M</b><span>${item.vtc.toFixed(2)}×</span></div>
        <div class="decision">
          <button class="${decision === 'fund' ? 'active-fund' : ''}" data-action="fund" data-key="${item.key}">FUND</button>
          <button class="${decision === 'reject' ? 'active-reject' : ''}" data-action="reject" data-key="${item.key}">REJECT</button>
        </div>
      </div>`;
    }).join('');
    if (state.auctionSealed) stack.classList.add('auction-sealed');
    // bind decision buttons
    $$('[data-action]', stack).forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.auctionSealed) return;
        const key = btn.dataset.key;
        const action = btn.dataset.action;
        // toggle: clicking same action again = undecided
        if (state.auctionDecisions[key] === action) delete state.auctionDecisions[key];
        else state.auctionDecisions[key] = action;
        updateAuctionBudget();
        renderAuction();
      });
    });
  }

  function updateAuctionBudget() {
    const spent = auctionBids.filter(b => state.auctionDecisions[b.key] === 'fund').reduce((s, b) => s + b.bid, 0);
    const pct = Math.min((spent / AUCTION_BUDGET) * 100, 100);
    const over = spent > AUCTION_BUDGET;
    $('#budgetFill').style.width = pct + '%';
    $('#budgetFill').classList.toggle('over', over);
    $('#budgetSpent').textContent = `$${spent.toFixed(1)}M`;
    if (over) $('#budgetSpent').style.color = 'var(--bad)';
    else $('#budgetSpent').style.color = '';
  }

  renderAuction();
  updateAuctionBudget();

  $('#sealAuction').addEventListener('click', () => {
    if (state.auctionSealed) { showToast('Auction already sealed'); return; }
    const funded = auctionBids.filter(b => state.auctionDecisions[b.key] === 'fund');
    const rejected = auctionBids.filter(b => state.auctionDecisions[b.key] === 'reject');
    const undecided = auctionBids.filter(b => !state.auctionDecisions[b.key]);
    if (undecided.length > 0) { showToast(`${undecided.length} bid${undecided.length > 1 ? 's' : ''} still undecided — fund or reject each one`); return; }
    const spent = funded.reduce((s, b) => s + b.bid, 0);
    if (spent > AUCTION_BUDGET) { showToast(`Over budget by $${(spent - AUCTION_BUDGET).toFixed(1)}M — reject something to fit within $${AUCTION_BUDGET}M`); return; }
    state.auctionSealed = true;
    $('#sealAuction').textContent = 'AUCTION SEALED ✓';
    $('#sealAuction').style.background = 'var(--good)';
    $('#sealAuction').style.color = '#111';
    renderAuction();
    // create evidence receipt
    const receiptId = Object.keys(state.receipts).length + 1;
    const hash = Math.random().toString(16).slice(2, 6).toUpperCase() + ':' + Math.random().toString(16).slice(2, 6).toUpperCase();
    state.receipts[receiptId] = {
      hash,
      title: 'Capital auction sealed by executive',
      summary: `$${spent.toFixed(1)}M allocated across ${funded.length} workloads. ${rejected.length} bids rejected. Remaining reserve: $${(AUCTION_BUDGET - spent).toFixed(1)}M.`,
      cells: [
        ['AUTHORITY', 'Executive capital authority', 'Direct allocation decision.'],
        ['EVIDENCE', 'Portfolio contract status', `${funded.length} funded, ${rejected.length} rejected.`],
        ['ACTION', 'Capital allocated', `$${spent.toFixed(1)}M of $${AUCTION_BUDGET}M deployed.`],
        ['RISK ACCEPTED', 'Opportunity cost', `${rejected.map(r => r.name).join(', ')} not funded.`],
        ['QUALITY BOUNDARY', 'Constitution rules apply', 'All funded workloads remain under contract governance.'],
        ['RECONSIDERATION', 'Next auction cycle', 'Rejected bids may return with stronger evidence.']
      ]
    };
    showToast(`Auction sealed · $${spent.toFixed(1)}M funded · $${(AUCTION_BUDGET - spent).toFixed(1)}M retained → move to Shock Lab`);
  });

  const rangeIds = ['usersRange','interactionsRange','premiumRange','retryRange','priceRange','reviewRange'];
  rangeIds.forEach(id => $(`#${id}`).addEventListener('input', calculateScenario));
  $('#applyCure').addEventListener('click', applyCure);
  $('#resetScenario').addEventListener('click', () => {
    const defaults = {usersRange:42000,interactionsRange:18,premiumRange:54,retryRange:16,priceRange:29,reviewRange:4.5};
    Object.entries(defaults).forEach(([id,value]) => $(`#${id}`).value = value);
    calculateScenario();
    showToast('Scenario reset');
  });
  $('#saveScenario').addEventListener('click', () => {
    const result = calculateScenario();
    storage.set('capital-constitution-scenario', JSON.stringify({ ...result, savedAt: new Date().toISOString() }));
    showToast('Scenario sealed to local evidence record');
  });

  $('#exportEvidence').addEventListener('click', exportBoardRecord);
  $('#themeToggle').addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    storage.set('capital-constitution-theme', next);
  });
}

function init() {
  const preferredTheme = storage.get('capital-constitution-theme');
  if (preferredTheme) document.documentElement.dataset.theme = preferredTheme;
  const route = location.pathname.split('/').filter(Boolean).pop();
  if (['command','contracts','market','shock','evidence'].includes(route)) setView(route);
  updateClock();
  setInterval(updateClock, 30000);
  bindEvents();
  calculateScenario();
  updateGuide(state.currentView);
  setTimeout(() => $('#boot').classList.add('hide'), 900);
  // pulse the first CTA after boot
  setTimeout(() => { if (!state.ordersIssued) $('#executeOrders').classList.add('pulse'); }, 1800);
}

init();
