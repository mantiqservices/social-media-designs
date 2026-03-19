// ── Constants ────────────────────────────────────────────
const SYS = {
  crm: { name: 'CRM Tracker',     color: '#38bdf8' },
  sls: { name: 'Sales Tracker',   color: '#fb923c' },
  hr:  { name: 'HR System',       color: '#a78bfa' },
  fin: { name: 'Finance Tracker', color: '#34d399' },
  ac:  { name: 'Academy System',  color: '#CC0028' },
};

const TYPE_AR = {
  phone:    '📱 موبايل',
  laptop:   '💻 لابتوب',
  tablet:   '📟 تابلت',
  qa:       '❓ سؤال',
  features: '✦ Features',
};

const SVG_EYE  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const SVG_EDIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const SVG_COPY = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const SVG_DL   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 10l5 5 5-5M3 21h18"/></svg>`;

// ── State ────────────────────────────────────────────────
let posts   = [];
let fSys    = 'all';
let fType   = 'all';
let fWeek   = 0;
let fQ      = '';
let curView = 'grid';
let editId  = null;
let dlCancel = false;

// ── Filter test ──────────────────────────────────────────
function ok(p) {
  if (fSys  !== 'all' && p.sys  !== fSys)  return false;
  if (fType !== 'all' && p.type !== fType) return false;
  if (fWeek !== 0     && p.week !== fWeek) return false;
  if (fQ) {
    const q = fQ.toLowerCase();
    if (
      !p.id.toLowerCase().includes(q) &&
      !p.ar.toLowerCase().includes(q) &&
      !p.en.toLowerCase().includes(q)
    ) return false;
  }
  return true;
}

// ── Load / save edits from localStorage ─────────────────
function loadPosts(raw) {
  return raw.map(p => {
    try {
      const saved = localStorage.getItem('mq_' + p.id);
      return saved
        ? { platform: 'Instagram', notes: '', ...p, ...JSON.parse(saved) }
        : { platform: 'Instagram', notes: '', ...p };
    } catch (e) {
      return { platform: 'Instagram', notes: '', ...p };
    }
  });
}

function savePost(p) {
  try {
    localStorage.setItem('mq_' + p.id, JSON.stringify({
      week: p.week, day: p.day, time: p.time,
      platform: p.platform, ar: p.ar, en: p.en, notes: p.notes,
    }));
  } catch (e) { /* storage full */ }
}

// ── Render helpers ───────────────────────────────────────
function el(id) { return document.getElementById(id); }

function showToast(msg) {
  const t = el('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 2000);
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
  showToast('📋 تم النسخ!');
}

// ── Render Grid ──────────────────────────────────────────
function renderGrid() {
  el('vGrid').innerHTML = posts.map(p => {
    const m = SYS[p.sys];
    const hide = ok(p) ? '' : 'hide';
    return `
    <div class="pc ${hide}" data-id="${p.id}">
      <div class="pimg">
        <img src="${p.img}" loading="lazy" alt="${p.id}">
        <div class="pov">
          <button class="ovb ovb-p" data-action="preview" data-id="${p.id}">${SVG_EYE} معاينة</button>
          <button class="ovb ovb-e" data-action="edit"    data-id="${p.id}">${SVG_EDIT} تعديل</button>
        </div>
      </div>
      <div class="pinfo" style="border-top-color:${m.color}">
        <div class="pwk">أسبوع ${p.week} · ${p.platform || 'Instagram'}</div>
        <div class="psys" style="color:${m.color}">${m.name}</div>
        <div class="pty">${p.day} ${p.time} · ${TYPE_AR[p.type] || p.type}</div>
      </div>
    </div>`;
  }).join('');
}

// ── Render Plan ──────────────────────────────────────────
function renderPlan() {
  el('vPlanBody').innerHTML = posts.map(p => {
    const m = SYS[p.sys];
    const hide = ok(p) ? '' : 'hide';
    return `
    <tr class="${hide}">
      <td><img class="pthumb" src="${p.img}" data-action="preview" data-id="${p.id}" alt=""></td>
      <td><span class="sbadge" style="background:${m.color}20;color:${m.color}">${m.name}</span></td>
      <td><span class="tpill">${TYPE_AR[p.type] || p.type}</span></td>
      <td>
        <div style="font-size:10px;font-weight:800;color:var(--crm)">الأسبوع ${p.week}</div>
        <div style="font-size:11px;font-weight:700;margin-top:3px">${p.day}</div>
        <div style="font-size:10px;color:var(--mt)">${p.time}</div>
      </td>
      <td>
        <div class="cprev">${p.ar.slice(0, 150)}</div>
        <button class="cpybtn" data-action="copy-ar" data-id="${p.id}">${SVG_COPY} نسخ</button>
      </td>
      <td>
        <div class="cprev" style="direction:ltr;text-align:left">${p.en.slice(0, 150)}</div>
        <button class="cpybtn" data-action="copy-en" data-id="${p.id}">${SVG_COPY} Copy</button>
      </td>
      <td>
        <button class="edbtn" data-action="edit" data-id="${p.id}">${SVG_EDIT} تعديل</button>
      </td>
    </tr>`;
  }).join('');
}

// ── Render Week ──────────────────────────────────────────
function renderWeek() {
  let html = '';
  for (let w = 1; w <= 10; w++) {
    if (fWeek !== 0 && fWeek !== w) continue;
    const wp = posts.filter(p => p.week === w);
    if (!wp.length) continue;
    const m   = SYS[wp[0].sys];
    const vis = wp.filter(ok).length;
    html += `
    <div class="wblk">
      <div class="whd">
        <span class="wnum">الأسبوع ${w}</span>
        <span class="wsys" style="color:${m.color}">${m.name}</span>
        <span class="wcnt">(${vis} تصميم)</span>
      </div>
      <div class="wgrid">
        ${wp.map(p => {
          const pm = SYS[p.sys];
          return `
          <div class="wcard ${ok(p) ? '' : 'hide'}" data-action="preview" data-id="${p.id}">
            <div class="wimg"><img src="${p.img}" loading="lazy" alt=""></div>
            <div class="winf" style="border-top-color:${pm.color}">
              <div class="wday">${p.day} ${p.time}</div>
              <div class="wtype" style="color:${pm.color}">${TYPE_AR[p.type] || p.type}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }
  el('vWeek').innerHTML = html;
}

// ── Switch view ──────────────────────────────────────────
function switchView(v) {
  curView = v;
  el('vGrid').style.display = v === 'grid' ? 'grid'  : 'none';
  el('vPlan').style.display = v === 'plan' ? 'block' : 'none';
  el('vWeek').style.display = v === 'week' ? 'block' : 'none';
}

// ── Full render ──────────────────────────────────────────
function render() {
  const vis = posts.filter(ok).length;
  el('stot').textContent    = vis;
  el('cnt-all').textContent = vis;
  if (curView === 'grid') renderGrid();
  else if (curView === 'plan') renderPlan();
  else renderWeek();
}

// ── Preview modal ────────────────────────────────────────
function openPreview(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  el('mPrevImg').src      = p.img;
  el('mPrevDL').href      = p.img;
  el('mPrevDL').download  = p.id + '.png';
  el('mPrev').classList.add('open');
}
function closePreview() {
  el('mPrev').classList.remove('open');
}

// ── Edit modal ───────────────────────────────────────────
function openEdit(id) {
  editId = id;
  const p = posts.find(x => x.id === id);
  if (!p) return;
  const m = SYS[p.sys];
  el('eThumb').src         = p.img;
  el('eID').textContent    = p.id;
  el('eSys').textContent   = m.name;
  el('eSys').style.color   = m.color;
  el('eWeek').value        = String(p.week);
  el('eDay').value         = p.day;
  el('eTime').value        = p.time || '09:00';
  el('ePlat').value        = p.platform || 'Instagram';
  el('eAR').value          = p.ar;
  el('eEN').value          = p.en;
  el('eNotes').value       = p.notes || '';
  el('mEdit').classList.add('open');
}
function closeEdit() {
  el('mEdit').classList.remove('open');
}
function saveEdit() {
  const p = posts.find(x => x.id === editId);
  if (!p) return;
  p.week     = parseInt(el('eWeek').value);
  p.day      = el('eDay').value;
  p.time     = el('eTime').value;
  p.platform = el('ePlat').value;
  p.ar       = el('eAR').value;
  p.en       = el('eEN').value;
  p.notes    = el('eNotes').value;
  savePost(p);
  closeEdit();
  render();
  showToast('✅ تم الحفظ بنجاح');
}

// ── Download all visible ──────────────────────────────────
async function downloadAll() {
  const visible = posts.filter(ok);
  dlCancel = false;
  el('mDL').classList.add('open');

  for (let i = 0; i < visible.length; i++) {
    if (dlCancel) break;
    const p = visible[i];
    el('dlName').textContent = p.id;
    el('dlPct').textContent  = `${i + 1} / ${visible.length}`;
    el('dlBar').style.width  = `${((i + 1) / visible.length) * 100}%`;

    // Fetch image and trigger download
    try {
      const res  = await fetch(p.img);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = p.id + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) { /* skip */ }

    await new Promise(r => setTimeout(r, 220));
  }
  el('mDL').classList.remove('open');
}

// ── Event delegation (one listener per container) ────────
function delegateClicks(root, selector, handler) {
  root.addEventListener('click', e => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(target, e);
  });
}

// ── Boot ─────────────────────────────────────────────────
export function initApp(rawPosts) {
  posts = loadPosts(rawPosts);

  // Initial render
  switchView('grid');
  render();

  // ── View tab clicks ──────────────────────────────────
  document.querySelectorAll('.vtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vtab').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      switchView(btn.dataset.v);
      render();
    });
  });

  // ── Sidebar: system ──────────────────────────────────
  document.querySelectorAll('[data-sys]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sys]').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      fSys = btn.dataset.sys;
      render();
    });
  });

  // ── Sidebar: type ────────────────────────────────────
  document.querySelectorAll('[data-tp]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tp]').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      fType = btn.dataset.tp;
      render();
    });
  });

  // ── Sidebar: week ────────────────────────────────────
  document.querySelectorAll('[data-wk]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-wk]').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      fWeek = parseInt(btn.dataset.wk);
      render();
    });
  });

  // ── Search ───────────────────────────────────────────
  el('search').addEventListener('input', e => {
    fQ = e.target.value.trim();
    render();
  });

  // ── Content area: delegated clicks ──────────────────
  document.getElementById('cnt').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'preview')  openPreview(id);
    if (action === 'edit')     openEdit(id);
    if (action === 'copy-ar') { const p = posts.find(x => x.id === id); if (p) copyText(p.ar); }
    if (action === 'copy-en') { const p = posts.find(x => x.id === id); if (p) copyText(p.en); }
  });

  // ── Preview modal ────────────────────────────────────
  el('btnClosePrev').addEventListener('click', closePreview);
  el('mPrev').addEventListener('click', e => { if (e.target === el('mPrev')) closePreview(); });

  // ── Edit modal ───────────────────────────────────────
  el('btnCloseEdit').addEventListener('click',  closeEdit);
  el('btnCancelEdit').addEventListener('click', closeEdit);
  el('btnSaveEdit').addEventListener('click',   saveEdit);
  el('mEdit').addEventListener('click', e => { if (e.target === el('mEdit')) closeEdit(); });

  // Copy buttons inside edit modal
  el('cpAR').addEventListener('click', () => copyText(el('eAR').value));
  el('cpEN').addEventListener('click', () => copyText(el('eEN').value));

  // ── Download ─────────────────────────────────────────
  el('dlAllBtn').addEventListener('click', downloadAll);
  el('btnCancelDL').addEventListener('click', () => {
    dlCancel = true;
    el('mDL').classList.remove('open');
  });

  // ── Keyboard ─────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePreview(); closeEdit(); }
  });
}
