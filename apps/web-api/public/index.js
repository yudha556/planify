lucide.createIcons();
const API = '/api';
let token = localStorage.getItem('token');
let currentBrief = null;
let mode = 'professional';

// --- Init ---
if (token) initAuth();

function switchAuthMode(m) {
    document.getElementById('form-login').classList.toggle('hidden', m !== 'login');
    document.getElementById('form-register').classList.toggle('hidden', m !== 'register');
    document.getElementById('tab-login').classList.toggle('active', m === 'login');
    document.getElementById('tab-register').classList.toggle('active', m === 'register');
}

function setMode(m) {
    mode = m;
    document.getElementById('opt-professional').classList.toggle('active', m === 'professional');
    document.getElementById('opt-formal').classList.toggle('active', m === 'formal');
    document.getElementById('opt-concise').classList.toggle('active', m === 'concise');

    const modeTag = document.getElementById('res-mode');
    if (modeTag) {
        modeTag.innerText = m.toUpperCase();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Set mode default
    setMode('professional');
});

// --- AUTH ---
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (!email || !password) return alert('Fill info plx');

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        // Retrieve token from nested data structure
        const token = data.data?.token || data.token;
        const user = data.data?.user || data.user;

        if (token) successLogin(token, user);
        else alert(data.message || 'Login failed');
    } catch (e) { alert(e.message); }
}

async function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
        const res = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (data.success) {
            alert('Acc created! Login now.');
            switchAuthMode('login');
        } else alert(data.message);
    } catch (e) { alert(e.message); }
}

function successLogin(t, u) {
    token = t;
    localStorage.setItem('token', t);
    if (u) localStorage.setItem('user_email', u.email);
    initAuth();
}

function logout() {
    token = null;
    localStorage.clear();
    location.reload();
}

function initAuth() {
    document.getElementById('auth-card').classList.add('hidden');
    document.getElementById('generator-card').classList.remove('hidden');
    document.getElementById('nav-user-menu').classList.remove('hidden');
    document.getElementById('nav-email').innerText = localStorage.getItem('user_email') || 'User';
    fetchCoins();
}

async function fetchCoins() {
    try {
        const res = await fetch(`${API}/ai/coins`, { headers: { 'Authorization': `Bearer ${token}` } });

        if (res.status === 401 || res.status === 403) {
            logout();
            return;
        }

        const d = await res.json();

        if (d.success && d.coins !== undefined) {
            document.getElementById('coin-val').innerText = d.coins;
        } else {
            document.getElementById('coin-val').innerText = 'Err';
        }
    } catch (e) { console.error(e); }
}

// --- AI ---
async function generate() {
    const btn = document.querySelector('button[onclick="generate()"]');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Generating...`;
    document.getElementById('gen-status').innerText = "AI is thinking (this takes ~10-20s)...";
    lucide.createIcons();

    const payload = {
        projectName: document.getElementById('p-name').value,
        projectDescription: document.getElementById('p-desc').value,
        projectType: document.getElementById('p-type').value,
        mode: mode,
        includeDiagram: document.getElementById('inc-diagram').checked,
        techStack: document.getElementById('p-tech').value.split(','),
        keyFeatures: document.getElementById('p-features').value.split(','),
        targetAudience: document.getElementById('p-target').value
    };

    try {
        const res = await fetch(`${API}/ai/project-brief`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            currentBrief = data.data;
            renderResult(data.data, data.metadata);
            if (data.coins) document.getElementById('coin-val').innerText = data.coins;
            document.getElementById('gen-status').innerText = `Success! ${data.metadata.processingTime}ms | ${data.metadata.inputTokens || '?'} in + ${data.metadata.outputTokens || '?'} out = ${data.metadata.tokensUsed || '?'} tokens`;
        } else {
            alert(data.message);
            document.getElementById('gen-status').innerText = `Error: ${data.message}`;
        }
    } catch (e) {
        alert('Network Error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="play" size="18"></i> Generate Brief`;
        lucide.createIcons();
    }
}

async function renderResult(data, meta) {
    document.getElementById('intro-placeholder').classList.add('hidden');
    const container = document.getElementById('result-container');
    container.classList.remove('hidden');

    // Clear previous results manually except header/debug to reset content
    const resultBox = container.querySelector('.result-box');
    // We want to keep the header, so let's clear specific IDs or rebuild structure
    // Simplified: Rebuild inner HTML of result-box to act as a blank canvas
    document.getElementById('res-title').innerText = data.title;
    document.getElementById('res-mode').innerText = mode.toUpperCase();
    document.getElementById('raw-json').innerText = JSON.stringify(data, null, 2);

    // Hide PDF button initially
    const pdfBtn = document.getElementById('btn-pdf');
    pdfBtn.style.opacity = '0';

    // Clear containers
    const overviewEl = document.getElementById('res-overview');
    const objEl = document.getElementById('res-objectives');
    const techEl = document.getElementById('res-tech');
    const featEl = document.getElementById('res-features');
    const diagSec = document.getElementById('diagram-section');
    const diagViz = document.getElementById('mermaid-viz');

    overviewEl.innerHTML = '';
    objEl.innerHTML = '';
    techEl.innerHTML = '';
    featEl.innerHTML = '';
    diagSec.classList.add('hidden');

    // --- Helper to wait ---
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const typeText = async (element, text, speed = 5) => {
        element.innerHTML = '';
        // Simple fade in for long text is better than typing
        element.style.opacity = 0;
        element.innerHTML = text;
        element.classList.add('fade-in');
        element.style.opacity = 1;
        await sleep(300);
    };

    // 1. Overview (Research uses 'abstract' instead of 'overview')
    const overviewText = data.overview || data.abstract || 'No overview available';
    await typeText(overviewEl, overviewText);
    await sleep(400);

    // 2. Objectives (handle both string array and object array)
    objEl.innerHTML = '';
    if (data.objectives && Array.isArray(data.objectives)) {
        for (const obj of data.objectives) {
            const li = document.createElement('li');
            // Handle both string format and object format {id, objective, measurable}
            li.innerText = typeof obj === 'string' ? obj : (obj.objective || obj.id || JSON.stringify(obj));
            li.className = 'fade-in';
            objEl.appendChild(li);
            await sleep(200);
        }
    }

    // 3. Tech Stack (App-specific, skip for research)
    if (data.platformCategory !== 'research' && data.recommendedTechStack) {
        techEl.innerHTML = '';
        for (const t of data.recommendedTechStack) {
            const span = document.createElement('span');
            span.className = 'tag tech fade-in';
            span.title = t.reason;
            span.innerText = t.technology;
            techEl.appendChild(span);
            await sleep(100);
        }
        await sleep(300);
    } else {
        // Hide tech section for research
        techEl.parentNode.style.display = data.platformCategory === 'research' ? 'none' : '';
    }

    // 4. Features (App-specific) OR Research Questions (Research-specific)
    featEl.innerHTML = '';

    if (data.platformCategory === 'research') {
        // === RESEARCH MODE ===
        // Research Questions
        if (data.researchQuestions) {
            const rqDiv = document.createElement('div');
            rqDiv.className = 'fade-in';
            rqDiv.style.marginBottom = '1.5rem';
            rqDiv.innerHTML = `
                        <h4 style="color: #a78bfa;">Research Questions</h4>
                        <ol style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                            ${Array.isArray(data.researchQuestions)
                    ? data.researchQuestions.map(q => typeof q === 'string' ? `<li>${q}</li>` : `<li><strong>${q.id}:</strong> ${q.question}</li>`).join('')
                    : ''}
                        </ol>
                    `;
            featEl.appendChild(rqDiv);
            await sleep(300);
        }

        // Methodology
        if (data.methodology) {
            const methDiv = document.createElement('div');
            methDiv.className = 'fade-in';
            methDiv.style.marginBottom = '1.5rem';
            methDiv.innerHTML = `
                        <h4 style="color: #22d3ee;">Methodology</h4>
                        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                            <li><strong>Approach:</strong> ${data.methodology.approach || 'N/A'}</li>
                            ${data.methodology.population ? `<li><strong>Population:</strong> ${data.methodology.population}</li>` : ''}
                            ${data.methodology.dataCollection?.methods?.length ? `<li><strong>Data Collection:</strong> ${data.methodology.dataCollection.methods.join(', ')}</li>` : ''}
                            ${data.methodology.dataAnalysis?.techniques?.length ? `<li><strong>Analysis:</strong> ${data.methodology.dataAnalysis.techniques.join(', ')}</li>` : ''}
                        </ul>
                    `;
            featEl.appendChild(methDiv);
            await sleep(300);
        }

        // Expected Outcomes
        if (data.expectedOutcomes) {
            const outDiv = document.createElement('div');
            outDiv.className = 'fade-in';
            outDiv.style.marginBottom = '1.5rem';
            outDiv.innerHTML = `
                        <h4 style="color: #4ade80;">Expected Outcomes</h4>
                        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                            ${data.expectedOutcomes?.map(o => typeof o === 'string' ? `<li>${o}</li>` : `<li>${o.outcome} (${o.contribution})</li>`).join('') || '<li>N/A</li>'}
                        </ul>
                    `;
            featEl.appendChild(outDiv);
            await sleep(300);
        }

        // Timeline
        if (data.timeline) {
            const tlDiv = document.createElement('div');
            tlDiv.className = 'fade-in';
            tlDiv.style.marginBottom = '1.5rem';
            tlDiv.innerHTML = `
                        <h4 style="color: #fbbf24;">Timeline</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Duration: ${data.timeline.estimatedDuration || data.timeline.totalDuration || 'TBD'}</p>
                        <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.9rem;">
                            ${data.timeline.phases?.map(p => typeof p === 'string' ? `<li>${p}</li>` : `<li>${p.phase}: ${p.duration}</li>`).join('') || ''}
                        </ul>
                    `;
            featEl.appendChild(tlDiv);
            await sleep(300);
        }
    } else if (data.keyFeatures) {
        // === APP MODE (Web/Mobile) ===
        for (const f of data.keyFeatures) {
            const div = document.createElement('div');
            div.style.background = 'rgba(255,255,255,0.05)';
            div.style.padding = '1rem';
            div.style.borderRadius = '6px';
            div.className = 'fade-in';
            div.style.marginBottom = '1rem';
            div.innerHTML = `
                        <div style="display:flex; justify-content:space-between; margin-bottom: 0.3rem;">
                            <strong style="color: #e2e8f0;">${f.name}</strong>
                            <span class="tag ${f.priority?.toLowerCase() || 'should'}">${f.priority || 'Should'}</span>
                        </div>
                        <p style="font-size: 0.9rem; color: #94a3b8;">${f.description}</p>
                    `;
            featEl.appendChild(div);
            div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            await sleep(400);
        }
    }

    // 5. Success Criteria (Only for App projects)
    if (data.platformCategory !== 'research') {
        const successDiv = document.createElement('div');
        successDiv.className = 'fade-in';
        successDiv.style.marginBottom = '1.5rem';
        successDiv.innerHTML = `
                    <h4 style="color: #4ade80;">Success Criteria</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                        ${data.successCriteria?.map(c => `<li><strong>${c.metric}:</strong> ${c.target}</li>`).join('') || '<li>N/A</li>'}
                    </ul>
                `;
        featEl.parentNode.insertBefore(successDiv, featEl);
        await sleep(300);
    }

    // 6. User Flow (New)
    if (data.userFlow) {
        const flowDiv = document.createElement('div');
        flowDiv.className = 'fade-in';
        flowDiv.style.marginTop = '1.5rem';
        flowDiv.innerHTML = `
                    <h4 style="color: #fca5a5;">User Flow</h4>
                    <ol style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                        ${data.userFlow.steps?.map(s => `<li>${s}</li>`).join('') || ''}
                    </ol>
                `;
        featEl.parentNode.appendChild(flowDiv);
        await sleep(300);
    }

    // 7. SRS Modules (New)
    if (data.srsModules) {
        const srsDiv = document.createElement('div');
        srsDiv.className = 'fade-in';
        srsDiv.style.marginTop = '1.5rem';
        srsDiv.innerHTML = `
                    <h4 style="color: #f472b6;">SRS Modules</h4>
                    ${data.srsModules?.map(m => `
                        <div style="margin-bottom: 1rem;">
                            <strong style="color: #e2e8f0; display:block; margin-bottom:0.3rem;">${m.moduleName}</strong>
                            <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.9rem;">
                                ${m.requirements?.map(r => `<li>[${r.id}] ${r.userStory}</li>`).join('') || ''}
                            </ul>
                        </div>
                    `).join('')}
                `;
        featEl.parentNode.appendChild(srsDiv);
        await sleep(300);
    }

    // 8. Risks (New)
    if (data.risks) {
        const riskDiv = document.createElement('div');
        riskDiv.className = 'fade-in';
        riskDiv.style.marginTop = '1.5rem';
        riskDiv.innerHTML = `
                    <h4 style="color: #ef4444;">Risks & Mitigation</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem;">
                         ${data.risks?.map(r => `<li><strong>${r.risk}</strong> (${r.type}): ${r.mitigation}</li>`).join('') || '<li>N/A</li>'}
                    </ul>
                `;
        featEl.parentNode.appendChild(riskDiv);
        await sleep(300);
    }

    // 9. Clarification Log (New)
    if (data.clarificationLog) {
        const logDiv = document.createElement('div');
        logDiv.className = 'fade-in';
        logDiv.style.marginTop = '1.5rem';
        logDiv.style.background = 'rgba(255,255,255,0.03)';
        logDiv.style.padding = '1rem';
        logDiv.style.borderRadius = '8px';
        logDiv.innerHTML = `
                    <h4 style="color: #fbbf24; margin-bottom:0.5rem;">AI Clarification Log</h4>
                    <ul style="padding-left: 1.2rem; color: #94a3b8; font-size: 0.9rem;">
                         ${data.clarificationLog?.map(l => `<li><strong>${l.topic}:</strong> ${l.advice}</li>`).join('') || '<li>N/A</li>'}
                    </ul>
                `;
        featEl.parentNode.appendChild(logDiv);
        await sleep(300);
    }

    // 10. Diagram (Last because heaviest)
    if (data.diagram) {
        diagSec.classList.remove('hidden');
        diagSec.scrollIntoView({ behavior: 'smooth' });
        diagViz.innerHTML = '<div style="color:#aaa; text-align:center;"><i data-lucide="loader" class="spin"></i> Rendering Diagram...</div>';
        lucide.createIcons();
        await sleep(800); // Fake "rendering" time

        diagViz.innerHTML = data.diagram.diagram;
        diagViz.removeAttribute('data-processed');

        try {
            await mermaid.init(undefined, diagViz);
            diagViz.className = 'mermaid fade-in';
        } catch (e) {
            diagViz.innerHTML = 'Diagram syntax error';
        }
    } else {
        diagSec.classList.add('hidden');
    }

    // Show PDF button
    pdfBtn.style.opacity = '1';
    pdfBtn.style.transition = 'opacity 0.5s';

    // Re-init pdf button state
    pdfBtn.disabled = false;
    pdfBtn.innerHTML = `<i data-lucide="file-down" size="16"></i> Export PDF (1c)`;
    lucide.createIcons();
}

async function downloadPdf() {
    if (!currentBrief) return;
    const btn = document.getElementById('btn-pdf');
    btn.innerHTML = `Downloading...`;
    btn.disabled = true;

    try {
        const res = await fetch(`${API}/pdf/brief`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(currentBrief)
        });

        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${currentBrief.title}_Brief.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            // update coins
            fetchCoins();
        } else {
            const txt = await res.text();
            alert("Error: " + txt);
        }
    } catch (e) { console.error(e); alert('PDF failed'); }
    finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="file-down" size="16"></i> Export PDF (1c)`;
        lucide.createIcons();
    }
}

async function downloadMarkdown() {
    if (!currentBrief) return;
    const btn = document.getElementById('btn-md');
    btn.innerHTML = `Downloading...`;
    btn.disabled = true;

    try {
        const res = await fetch(`${API}/markdown/brief`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(currentBrief)
        });

        if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${currentBrief.title}_Brief.md`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            // update coins
            fetchCoins();
        } else {
            const txt = await res.text();
            alert("Error: " + txt);
        }
    } catch (e) { console.error(e); alert('Markdown export failed'); }
    finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="file-text" size="16"></i> Export MD (1c)`;
        lucide.createIcons();
    }
}

export {
    switchAuthMode, setMode, login, register, successLogin, logout, initAuth, fetchCoins,
    generate, renderResult, downloadPdf, downloadMarkdown
};