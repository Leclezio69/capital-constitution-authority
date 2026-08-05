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
  if (location.protocol.startsWith('http')) history.replaceState(null, '', `/institution/meridian/${view}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

function addMessage(role, text) {
  const thread = $('#chiefThread');
  const node = document.createElement('div');
  node.className = `message ${role}`;
  node.innerHTML = `<span>${role === 'user' ? 'YOU' : 'CAPITAL CHIEF'}</span><p></p>`;
  $('p', node).textContent = text;
  thread.appendChild(node);
  thread.scrollTop = thread.scrollHeight;
  return node;
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
    $('p', loading).textContent = data.answer;
    state.lastChiefAnswer = data.answer;
    $('#chiefMode').textContent = data.mode === 'live' ? 'LIVE MODEL · GROUNDED IN PORTFOLIO' : 'DEMO INTELLIGENCE · ADD API KEY FOR LIVE';
  } catch (error) {
    const q = question.toLowerCase();
    const fallback = q.includes('cut') || q.includes('remove') || q.includes('save')
      ? 'Recommendation: execute a staged efficiency mandate. Reroute low-complexity Research Copilot work, cap premium inference, and stop Client Service Agent retries after the second failure. Preserve Fraud Sentinel because its verified value-to-cost ratio is the strongest in the portfolio. Decision boundary: do not accept quality below 91% or a regulatory-review increase above 6%.'
      : q.includes('fund') || q.includes('receive') || q.includes('allocate')
        ? 'Fund Fraud Sentinel expansion first, Treasury Forecasting second, and place Research Copilot under conditional margin-cure funding. Do not release Marketing Studio capital until attribution evidence is independently restored.'
        : 'The portfolio is inside budget but outside its economic constitution. Contain the two margin-negative workloads, preserve the strongest verified control workload, and require an accountable owner to renew every expired capital contract.';
    $('p', loading).textContent = fallback;
    state.lastChiefAnswer = fallback;
    $('#chiefMode').textContent = 'LOCAL DEMO INTELLIGENCE · API NOT CONNECTED';
  }
}

async function narrate(text) {
  if (!text) return;
  try {
    const response = await fetch('/api/narrate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    });
    if (response.ok && response.headers.get('content-type')?.includes('audio')) {
      const blob = await response.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      await audio.play();
      return;
    }
  } catch (_) {}

  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 0.9;
    speechSynthesis.speak(utterance);
    showToast('Browser narration active · configure ElevenLabs for your cloned voice');
  } else {
    showToast('Narration is not available in this browser');
  }
}

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
  seal.style.borderColor = contract.seal === 'VERIFIED' ? 'var(--good)' : contract.seal === 'CURE' ? 'var(--warn)' : contract.seal === 'EXPIRED' ? 'var(--muted)' : 'var(--bad)';
  $('#contractSeal').style.color = contract.seal === 'VERIFIED' ? 'var(--good)' : contract.seal === 'CURE' ? 'var(--warn)' : contract.seal === 'EXPIRED' ? 'var(--muted)' : 'var(--bad)';
  $$('.contract-card').forEach(card => card.classList.toggle('active', card.dataset.contractCard === key));
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
  const record = {
    generatedAt: new Date().toISOString(),
    institution: 'Meridian Global',
    product: 'CAPITAL//CONSTITUTION',
    portfolio: portfolioContext().portfolio,
    executiveOrders: [
      'Contain Research Copilot margin leakage.',
      'Protect Fraud Sentinel expansion capital.',
      'Return expired contracts to human authority.'
    ],
    evidenceReceipts: Object.values(state.receipts).map(({ hash, title, summary }) => ({ hash, title, summary }))
  };
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `capital-constitution-board-record-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('Board record exported');
}

function bindEvents() {
  $$('.nav-button').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  $$('[data-jump]').forEach(button => button.addEventListener('click', () => setView(button.dataset.jump)));
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

  $('#hearBrief').addEventListener('click', () => narrate('Executive capital brief. Meridian Global is inside its annual AI budget but outside its economic constitution. Three workloads require action. Contain Research Copilot margin leakage. Protect Fraud Sentinel funding. Return expired capital authority to accountable executives.'));
  $('#speakLast').addEventListener('click', () => narrate(state.lastChiefAnswer || $('.message.assistant p').textContent));

  $('#executeOrders').addEventListener('click', () => {
    if (state.ordersIssued) return showToast('Orders already in force · receipts recorded');
    state.ordersIssued = true;
    $('#executeOrders').textContent = 'ORDERS IN FORCE ✓';
    $('#executeOrders').style.background = 'var(--good)';
    showToast('Three capital orders issued · evidence receipts sealed');
  });

  $('#governorSwitch').addEventListener('change', event => showToast(event.target.checked ? 'Autonomous governor enabled within Level 3 boundary' : 'Governor paused · recommendations remain active'));
  $('#reviewAuthority').addEventListener('click', () => openChief('Review the current autonomous authority boundary. What can the governor do, what must return to human authority, and where is the greatest control gap?'));
  $('#newContract').addEventListener('click', () => openChief('Draft a new executable capital contract for an enterprise AI workload. List the minimum evidence, value, quality, authority and stop conditions required before funding.'));
  $('#testRecord').addEventListener('click', () => openChief('Test whether the current evidence record is board-defensible. Identify the strongest record, the weakest record, and the first question a regulator would ask.'));

  $('#runAuction').addEventListener('click', () => {
    const cards = $$('.auction-card');
    cards.forEach((card, index) => {
      card.style.transform = 'translateX(-12px)';
      card.style.opacity = '.25';
      setTimeout(() => { card.style.transform = 'translateX(0)'; card.style.opacity = card.classList.contains('rejected') ? '.45' : '1'; }, 130 * index);
    });
    showToast('$4.0M funded · $1.1M conditional · $1.6M retained');
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
  setTimeout(() => $('#boot').classList.add('hide'), 900);
}

init();
