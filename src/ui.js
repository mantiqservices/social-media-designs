const ICON_GRID = `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
const ICON_LIST = `<svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>`;
const ICON_CAL  = `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const ICON_DL   = `<svg viewBox="0 0 24 24"><path d="M12 15V3M7 10l5 5 5-5M3 21h18"/></svg>`;
const ICON_MENU = `<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const ICON_LOGO = `<svg width="22" height="22" viewBox="0 0 400 500" fill="none" stroke="#38bdf8" stroke-width="55" stroke-linecap="round" stroke-linejoin="round"><circle cx="200" cy="200" r="150"/><path d="M320,430 C270,430 200,400 200,320 L200,140 M140,200 L200,140 L260,200"/></svg>`;

export function buildUI() {
  document.getElementById('app').innerHTML = `

  <!-- NAV -->
  <div id="nav">
    <button id="menuToggle" aria-label="القائمة">${ICON_MENU}</button>

    <div class="logo">
      ${ICON_LOGO}
      <span>MANTIQ</span>
    </div>
    <div class="ndv"></div>
    <span class="ntitle">Content Planner</span>

    <div class="srch">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input id="search" placeholder="ابحث...">
    </div>

    <div class="vtabs">
      <button class="vtab on" data-v="grid">${ICON_GRID} <span>Grid</span></button>
      <button class="vtab" data-v="plan">${ICON_LIST} <span>Plan</span></button>
      <button class="vtab" data-v="week">${ICON_CAL} <span>Week</span></button>
    </div>

    <button class="dlbtn" id="dlAllBtn">${ICON_DL} <span class="dl-label">تحميل الكل</span></button>
  </div>

  <!-- BODY -->
  <div id="body">

    <!-- Sidebar overlay (mobile) -->
    <div id="sbOverlay"></div>

    <!-- SIDEBAR -->
    <div id="sb">
      <div class="sb-sec">
        <span class="sb-lbl">النظام</span>
        <button class="sbtn on" data-sys="all"><div class="sdot" style="background:var(--crm)"></div>كل الأنظمة<span class="scnt" id="cnt-all">54</span></button>
        <button class="sbtn s-crm" data-sys="crm"><div class="sdot" style="background:var(--crm)"></div>CRM Tracker<span class="scnt">10</span></button>
        <button class="sbtn s-sls" data-sys="sls"><div class="sdot" style="background:var(--sls)"></div>Sales Tracker<span class="scnt">10</span></button>
        <button class="sbtn s-hr"  data-sys="hr" ><div class="sdot" style="background:var(--hr)"></div>HR System<span class="scnt">10</span></button>
        <button class="sbtn s-fin" data-sys="fin"><div class="sdot" style="background:var(--fin)"></div>Finance Tracker<span class="scnt">10</span></button>
        <button class="sbtn s-ac"  data-sys="ac" ><div class="sdot" style="background:var(--ac)"></div>Academy System<span class="scnt">10</span></button>
        <button class="sbtn s-gen" data-sys="gen"><div class="sdot" style="background:var(--gen)"></div>General Posts<span class="scnt">4</span></button>
      </div>

      <div class="sdiv"></div>

      <div class="sb-sec">
        <span class="sb-lbl">نوع التصميم</span>
        <button class="sbtn on" data-tp="all">📋 كل الأنواع</button>
        <button class="sbtn" data-tp="phone">📱 موبايل</button>
        <button class="sbtn" data-tp="laptop">💻 لابتوب</button>
        <button class="sbtn" data-tp="tablet">📟 تابلت</button>
        <button class="sbtn" data-tp="qa">❓ أسئلة</button>
        <button class="sbtn" data-tp="features">✦ Features</button>
      </div>

      <div class="sdiv"></div>

      <div class="sb-sec">
        <span class="sb-lbl">الأسبوع</span>
        <button class="sbtn on" data-wk="0">📅 كل الأسابيع</button>
        <button class="sbtn" data-wk="1">الأسبوع ١ — CRM</button>
        <button class="sbtn" data-wk="2">الأسبوع ٢ — CRM</button>
        <button class="sbtn" data-wk="3">الأسبوع ٣ — Sales</button>
        <button class="sbtn" data-wk="4">الأسبوع ٤ — Sales</button>
        <button class="sbtn" data-wk="5">الأسبوع ٥ — HR</button>
        <button class="sbtn" data-wk="6">الأسبوع ٦ — HR</button>
        <button class="sbtn" data-wk="7">الأسبوع ٧ — Finance</button>
        <button class="sbtn" data-wk="8">الأسبوع ٨ — Finance</button>
        <button class="sbtn" data-wk="9">الأسبوع ٩ — Academy</button>
        <button class="sbtn" data-wk="10">الأسبوع ١٠ — Academy</button>
        <button class="sbtn" data-wk="11">الأسبوع ١١ — General</button>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div id="cnt">
      <div class="stats">
        <div class="scard"><div class="sdotb" style="background:var(--crm)"></div><div><div class="sval" id="stot">54</div><div class="slbl">تصميم ظاهر</div></div></div>
        <div class="scard"><div class="sdotb" style="background:var(--sls)"></div><div><div class="sval">11</div><div class="slbl">أسابيع</div></div></div>
        <div class="scard"><div class="sdotb" style="background:var(--hr)"></div><div><div class="sval">6</div><div class="slbl">أنظمة</div></div></div>
        <div class="scard"><div class="sdotb" style="background:var(--fin)"></div><div><div class="sval">108</div><div class="slbl">كابشن AR + EN</div></div></div>
      </div>

      <div id="vGrid"></div>

      <div id="vPlan" style="display:none">
        <table class="ptbl">
          <thead><tr>
            <th>صورة</th><th>النظام</th><th>النوع</th><th>التوقيت</th>
            <th>الكابشن العربي</th><th>الكابشن الإنجليزي</th><th></th>
          </tr></thead>
          <tbody id="vPlanBody"></tbody>
        </table>
      </div>

      <div id="vWeek" style="display:none"></div>
    </div>
  </div>

  <!-- Mobile Bottom Tab Bar -->
  <div id="mobileTabBar">
    <button class="mtab on" data-v="grid">${ICON_GRID} Grid</button>
    <button class="mtab" data-v="plan">${ICON_LIST} Plan</button>
    <button class="mtab" data-v="week">${ICON_CAL} Week</button>
  </div>

  <!-- Preview Modal -->
  <div id="mPrev">
    <button class="mpcls" id="btnClosePrev">✕</button>
    <div class="mpwrap">
      <img id="mPrevImg" src="" alt="">
      <div><a id="mPrevDL" class="mpdl" href="" download="">${ICON_DL} تحميل PNG</a></div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div id="mEdit">
    <div class="ebox">
      <div class="ehd">
        <h2>✏️ تعديل التصميم</h2>
        <button class="ecls" id="btnCloseEdit">✕</button>
      </div>
      <div class="ebody">
        <div class="ethumb">
          <img id="eThumb" src="" alt="">
          <div><div class="etid" id="eID"></div><div class="etsys" id="eSys"></div></div>
        </div>
        <div class="fld">
          <label>الأسبوع</label>
          <select id="eWeek">
            ${[1,2,3,4,5,6,7,8,9,10,11].map(n=>`<option value="${n}">الأسبوع ${n}</option>`).join('')}
          </select>
        </div>
        <div class="fld">
          <label>يوم النشر</label>
          <select id="eDay">
            ${['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'].map(d=>`<option>${d}</option>`).join('')}
          </select>
        </div>
        <div class="fld">
          <label>وقت النشر</label>
          <input id="eTime" type="time">
        </div>
        <div class="fld">
          <label>البلاتفورم</label>
          <select id="ePlat">
            <option>Instagram</option><option>Facebook</option><option>LinkedIn</option><option>TikTok</option>
          </select>
        </div>
        <div class="fld full">
          <label>الكابشن العربي</label>
          <textarea id="eAR" rows="6"></textarea>
          <button class="fcpy" id="cpAR">📋 نسخ الكابشن العربي</button>
        </div>
        <div class="fld full">
          <label>الكابشن الإنجليزي</label>
          <textarea id="eEN" rows="6"></textarea>
          <button class="fcpy" id="cpEN">📋 Copy English Caption</button>
        </div>
        <div class="fld full">
          <label>ملاحظات</label>
          <input id="eNotes" placeholder="ملاحظات إضافية...">
        </div>
      </div>
      <div class="efoot">
        <button class="bsave" id="btnSaveEdit">💾 حفظ التعديلات</button>
        <button class="bcancel" id="btnCancelEdit">إلغاء</button>
      </div>
    </div>
  </div>

  <!-- Download Modal -->
  <div id="mDL">
    <div class="dlbox">
      <h3>⬇️ جارٍ التحميل</h3>
      <p id="dlName">جاري التحضير...</p>
      <div class="dltrack"><div class="dlbar" id="dlBar"></div></div>
      <div class="dlpct" id="dlPct">0 / 0</div>
      <button class="dlcancel" id="btnCancelDL">إلغاء</button>
    </div>
  </div>

  <div id="toast"></div>
  `;
}
