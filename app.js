/**
 * COLORBIKE — CARROZZERIA GATTO
 * High-Performance Vanilla JS Architecture (v2.1)
 */

'use strict';

// =============================================================================
// 1. CONFIGURATION & STATE
// =============================================================================
const CONFIG = {
  storageKey: 'colorbike_store_v10',
  pinStorageKey: 'colorbike_admin_pin',
  defaultPin: '0000',
  whatsappNumber: '393384544717'
};

const STATE = {
  data: null,
  isAdminUnlocked: false,
  activeFilter: 'tutti',
  portfolioExpanded: false,
  activeAdminTab: 'tab-services',
  beforeImgData: null,
  afterImgData: null
};

// =============================================================================
// 2. DATA INITIALIZATION & LOCALSTORAGE SYNC
// =============================================================================
async function initAppData() {
  // Check LocalStorage first for instant updates
  const cached = localStorage.getItem(CONFIG.storageKey);
  if (cached) {
    try {
      STATE.data = JSON.parse(cached);
    } catch (e) {
      console.warn('Errore parsing cache locale, carico data.json', e);
    }
  }

  // Fallback to data.json if cache empty or invalid
  if (!STATE.data || !STATE.data.services || !STATE.data.portfolio) {
    try {
      const res = await fetch('data.json');
      if (res.ok) {
        STATE.data = await res.json();
        saveStateToStorage();
      }
    } catch (err) {
      console.error('Fetch data.json fallita, uso configurazione di sicurezza', err);
      STATE.data = getFallbackData();
      saveStateToStorage();
    }
  }

  renderServices();
  renderPortfolioSubnav();
  renderPortfolio(STATE.activeFilter);
}

function saveStateToStorage() {
  if (!STATE.data) return;
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(STATE.data));
  } catch (e) {
    console.warn('LocalStorage pieno o disabilitato', e);
  }
}

function getStoredPin() {
  return localStorage.getItem(CONFIG.pinStorageKey) || (STATE.data && STATE.data.adminPin) || CONFIG.defaultPin;
}

// =============================================================================
// 3. ICONS HELPER (VETTORIALI SVG AD ALTA DEFINIZIONE)
// =============================================================================
function getServiceSvgIcon(type) {
  switch (type) {
    case 'spray':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M4 14v4a2 2 0 0 0 2 2h8V10H6a2 2 0 0 0-2 2z"/><path d="M7 10V7a3 3 0 0 1 6 0v3"/><path d="M12 4V2"/><path d="M9 2h6"/><circle cx="7" cy="14" r="1"/></svg>`;
    case 'shield':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`;
    case 'flag':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
    case 'brush':
    case 'airbrush':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7"/><path d="M14.5 17.5 4.5 7.5"/></svg>`;
    case 'tuning':
    case 'sparkles':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/></svg>`;
    case 'helmet':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h1v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4h1a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9z"/><path d="M7 12h10v5H7z"/><circle cx="12" cy="14.5" r="1"/></svg>`;
    case 'wrench':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    case 'bolt':
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    default:
      return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  }
}

// =============================================================================
// 4. RENDERING DEI SERVIZI (SPECIALIZZAZIONI UFFICIALI)
// =============================================================================
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || !STATE.data || !STATE.data.services) return;

  container.innerHTML = '';

  // Filtra per mostrare esclusivamente i servizi attivi (nessuno slot vuoto)
  const activeServices = STATE.data.services.filter(s => s.status === 'active');

  activeServices.forEach((service, index) => {
    const slotNumber = String(index + 1).padStart(2, '0');
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="card-header-telemetry">
        <div class="card-icon-wrap">
          ${getServiceSvgIcon(service.icon)}
        </div>
        <span class="card-status-badge">[ SPECIALIZZAZIONE ${slotNumber} ]</span>
      </div>
      <h3 class="card-title">${escapeHtml(service.title)}</h3>
      ${service.subtitle ? `<div class="card-subtitle">${escapeHtml(service.subtitle)}</div>` : ''}
      <p class="card-desc">${escapeHtml(service.description)}</p>
      <div class="card-tags">
        ${(service.tags || []).map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

// =============================================================================
// 5. RENDERING DEL PORTFOLIO "I NOSTRI LAVORI" CON SOTTOCATEGORIE E PAGINAZIONE
// =============================================================================
function renderPortfolioSubnav() {
  const navContainer = document.getElementById('portfolio-subnav');
  if (!navContainer || !STATE.data || !STATE.data.portfolio) return;

  const subcats = STATE.data.subcategories || [
    { id: 'tutti', label: 'Tutti i Lavori' },
    { id: 'moto-stradali', label: 'Moto Stradali' },
    { id: 'scooter', label: 'Scooter & Maxiscooter' },
    { id: 'custom-harley', label: 'Custom & Harley' },
    { id: 'aerografo-cubicatura', label: 'Aerografo & Cubicatura' },
    { id: 'serbatoi-classic', label: 'Serbatoi & Classic' }
  ];

  navContainer.innerHTML = '';

  subcats.forEach(sub => {
    const count = sub.id === 'tutti'
      ? STATE.data.portfolio.length
      : STATE.data.portfolio.filter(p => p.category === sub.id).length;

    if (count === 0 && sub.id !== 'tutti') return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `subnav-pill ${STATE.activeFilter === sub.id ? 'active' : ''}`;
    btn.setAttribute('data-subcat', sub.id);
    btn.innerHTML = `
      <span>${escapeHtml(sub.label)}</span>
      <span class="subnav-count">${count}</span>
    `;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.subnav-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeFilter = sub.id;
      // Per una categoria specifica mostra tutti gli elementi; per 'tutti' parte compatto
      STATE.portfolioExpanded = (sub.id !== 'tutti');
      renderPortfolio(sub.id);
    });

    navContainer.appendChild(btn);
  });
}

function renderPortfolio(filterCategory = 'tutti') {
  const container = document.getElementById('portfolio-grid');
  const expandBox = document.getElementById('portfolio-expand-box');
  const loadMoreBtn = document.getElementById('btn-portfolio-load-more');
  if (!container || !STATE.data || !STATE.data.portfolio) return;

  STATE.activeFilter = filterCategory;
  container.innerHTML = '';

  const allFiltered = STATE.data.portfolio.filter(item => {
    if (filterCategory === 'tutti') return true;
    return item.category === filterCategory;
  });

  if (allFiltered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 50px 20px; color: var(--text-dark);">
        <p style="font-size: 1.2rem; font-family: var(--font-tech); text-transform: uppercase;">Nessun lavoro presente in questa categoria.</p>
      </div>
    `;
    if (expandBox) expandBox.classList.add('hidden');
    return;
  }

  // Paginazione fluida su "Tutti": mostra 6 card iniziali per non appesantire la pagina
  const PAGE_LIMIT = 6;
  let itemsToRender = allFiltered;
  const isCapped = (filterCategory === 'tutti' && !STATE.portfolioExpanded && allFiltered.length > PAGE_LIMIT);

  if (isCapped) {
    itemsToRender = allFiltered.slice(0, PAGE_LIMIT);
    if (expandBox && loadMoreBtn) {
      expandBox.classList.remove('hidden');
      const remaining = allFiltered.length - PAGE_LIMIT;
      loadMoreBtn.querySelector('span').textContent = `MOSTRA ALTRI ${remaining} LAVORI DELL'OFFICINA`;
      loadMoreBtn.onclick = () => {
        STATE.portfolioExpanded = true;
        renderPortfolio(filterCategory);
      };
    }
  } else {
    if (expandBox) expandBox.classList.add('hidden');
  }

  itemsToRender.forEach(item => {
    const card = document.createElement('article');
    card.className = 'portfolio-item';
    card.setAttribute('data-id', item.id);

    const hasDualSlider = Boolean(
      item.beforeImg &&
      item.afterImg &&
      item.beforeImg.trim() !== '' &&
      item.afterImg.trim() !== '' &&
      item.beforeImg !== item.afterImg
    );

    const afterSrc = item.afterImg || 'hero_ducati_999.jpg';

    let stageHtml = '';
    if (hasDualSlider) {
      const beforeSrc = item.beforeImg;
      stageHtml = `
        <div class="slider-stage" data-slider-id="${item.id}">
          <img src="${beforeSrc}" alt="Prima: ${escapeHtml(item.title)}" class="stage-img img-before" loading="lazy" />
          <img src="${afterSrc}" alt="Dopo: ${escapeHtml(item.title)}" class="stage-img img-after" loading="lazy" />
          <div class="laser-handle">
            <div class="handle-center-puck">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m9 18-6-6 6-6M15 6l6 6-6 6"/>
              </svg>
            </div>
          </div>
          <span class="ribbon-tag ribbon-before">PRIMA</span>
          <span class="ribbon-tag ribbon-after">DOPO</span>
        </div>
      `;
    } else {
      stageHtml = `
        <div class="single-work-stage">
          <img src="${afterSrc}" alt="${escapeHtml(item.title)}" class="single-img" loading="lazy" />
          <span class="ribbon-tag ribbon-single">LAVORO ESEGUITO</span>
        </div>
      `;
    }

    card.innerHTML = `
      ${stageHtml}
      <div class="portfolio-details">
        <div class="portfolio-header-row">
          <span class="portfolio-bike-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${escapeHtml(item.model || 'Moto Stradale')}
          </span>
          <span class="portfolio-date">${escapeHtml(item.date || '')}</span>
        </div>
        <h3 class="portfolio-title">${escapeHtml(item.title)}</h3>
        <p class="portfolio-notes">${escapeHtml(item.notes || '')}</p>
      </div>
    `;

    container.appendChild(card);
    if (hasDualSlider) {
      setupSliderInteraction(card.querySelector('.slider-stage'));
    }
  });
}

/**
 * Gestione interattiva mouse e touch per il confronto Prima/Dopo
 */
function setupSliderInteraction(stage) {
  if (!stage) return;

  const imgAfter = stage.querySelector('.img-after');
  const handle = stage.querySelector('.laser-handle');
  let isInteracting = false;

  function updateSliderPosition(clientX) {
    const rect = stage.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Inset: top right bottom left -> clip the left side of afterImg
    imgAfter.style.clipPath = `inset(0 0 0 ${clampedPct}%)`;
    handle.style.left = `${clampedPct}%`;
  }

  // Pointer & Mouse Drag
  stage.addEventListener('mousedown', (e) => {
    isInteracting = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isInteracting) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isInteracting = false;
  });

  // Touch Drag
  stage.addEventListener('touchstart', (e) => {
    isInteracting = true;
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isInteracting) return;
    if (e.touches && e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isInteracting = false;
  });
}

// =========================================================
// 6. PORTFOLIO FILTER BUTTONS
// =========================================================
function setupFilterListeners() {
  const filterButtons = document.querySelectorAll('.filter-chip');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'tutti';
      renderPortfolio(cat);
    });
  });
}

// =========================================================
// 7. MODALE PREVENTIVO & WHATSAPP GENERATOR
// =========================================================
function setupQuoteModal() {
  const modal = document.getElementById('modal-quote');
  const openButtons = [
    document.getElementById('btn-open-quote'),
    document.getElementById('btn-mobile-quote'),
    document.getElementById('btn-hero-config')
  ];
  const closeBtn = document.getElementById('btn-close-quote');
  const quoteForm = document.getElementById('quote-form');
  const waBtn = document.getElementById('btn-quote-wa');

  function openModal() {
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Direct WhatsApp Button inside Modal
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const bike = document.getElementById('qf-bike').value.trim() || 'la mia moto';
      const serviceSelect = document.getElementById('qf-service');
      const serviceText = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Intervento Estetico';
      const text = encodeURIComponent(`Ciao ColorBike! Vorrei informazioni e preventivo per "${serviceText}" sulla mia ${bike}. Vi invio anche le foto.`);
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, '_blank');
    });
  }

  // Form Submit
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qf-name').value.trim();
      const phone = document.getElementById('qf-phone').value.trim();
      const bike = document.getElementById('qf-bike').value.trim();
      const serviceSelect = document.getElementById('qf-service');
      const serviceText = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex].text : 'Intervento Estetico';
      const details = document.getElementById('qf-details').value.trim();

      const message = `Richiesta Preventivo ColorBike:\nNome: ${name}\nTel: ${phone}\nMoto: ${bike}\nIntervento: ${serviceText}\nDettagli: ${details}`;
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

      showToast('Richiesta inviata! Reindirizzamento a WhatsApp...');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        closeModal();
        quoteForm.reset();
      }, 1000);
    });
  }

  // Quick form in footer
  const quickForm = document.getElementById('quick-contact-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('q-name').value.trim();
      const phone = document.getElementById('q-phone').value.trim();
      const msg = document.getElementById('q-message').value.trim();

      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(`Ciao ColorBike, sono ${name} (Tel: ${phone}). ${msg}`)}`;
      showToast('Apertura WhatsApp...');
      window.open(waUrl, '_blank');
      quickForm.reset();
    });
  }
}

// =========================================================
// 8. PANNELLO ADMIN & NO-CODE CMS
// =========================================================
function setupAdminPanel() {
  const panel = document.getElementById('admin-panel');
  if (!panel) return;
  const triggerGear = document.getElementById('btn-admin-trigger');
  const triggerBottom = document.getElementById('btn-admin-bottom');
  const closeBtn = document.getElementById('btn-close-admin');
  const pinInputs = document.querySelectorAll('.pin-digit');
  const pinSubmitBtn = document.getElementById('btn-pin-submit');
  const pinError = document.getElementById('pin-error-msg');
  const pinView = document.getElementById('admin-pin-view');
  const dashView = document.getElementById('admin-dashboard-view');
  const sessionBadge = document.getElementById('admin-session-badge');

  function openAdmin() {
    panel.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (STATE.isAdminUnlocked) {
      pinView.classList.add('hidden');
      dashView.classList.remove('hidden');
      sessionBadge.textContent = 'SESSIONE AMMINISTRATORE ATTIVA';
      sessionBadge.style.color = '#22c55e';
      populateAdminViews();
    } else {
      pinView.classList.remove('hidden');
      dashView.classList.add('hidden');
      sessionBadge.textContent = 'AUTENTICAZIONE RICHIESTA';
      sessionBadge.style.color = 'var(--red-racing)';
      setTimeout(() => {
        if (pinInputs[0]) pinInputs[0].focus();
      }, 100);
    }
  }

  function closeAdmin() {
    panel.classList.add('hidden');
    document.body.style.overflow = '';
  }

  window.openAdminPanel = openAdmin;
  window.closeAdminPanel = closeAdmin;

  if (triggerGear) triggerGear.addEventListener('click', openAdmin);
  if (triggerBottom) triggerBottom.addEventListener('click', openAdmin);
  if (closeBtn) closeBtn.addEventListener('click', closeAdmin);

  // Shortcut Ctrl + Shift + A
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      if (panel.classList.contains('hidden')) {
        openAdmin();
      } else {
        closeAdmin();
      }
    }
    if (e.key === 'Escape' && panel && !panel.classList.contains('hidden')) {
      closeAdmin();
    }
  });

  // PIN Inputs auto-jump
  pinInputs.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      input.value = val;
      if (val && idx < pinInputs.length - 1) {
        pinInputs[idx + 1].focus();
      }
      if (idx === pinInputs.length - 1 && val) {
        checkEnteredPin();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        pinInputs[idx - 1].focus();
      }
      if (e.key === 'Enter') {
        checkEnteredPin();
      }
    });
  });

  if (pinSubmitBtn) pinSubmitBtn.addEventListener('click', checkEnteredPin);

  function checkEnteredPin() {
    let entered = '';
    pinInputs.forEach(i => entered += i.value);

    const actualPin = getStoredPin();
    if (entered === actualPin) {
      STATE.isAdminUnlocked = true;
      pinError.classList.add('hidden');
      pinView.classList.add('hidden');
      dashView.classList.remove('hidden');
      sessionBadge.textContent = 'SESSIONE AMMINISTRATORE ATTIVA';
      sessionBadge.style.color = '#22c55e';

      // Mostra pulsante aggiungi lavoro rapido nella pagina
      const quickAdd = document.getElementById('admin-portfolio-quick-add');
      if (quickAdd) quickAdd.classList.remove('hidden');

      showToast('Accesso Amministratore Eseguito!');
      populateAdminViews();
    } else {
      pinError.classList.remove('hidden');
      pinInputs.forEach(i => i.value = '');
      if (pinInputs[0]) pinInputs[0].focus();
    }
  }

  // Admin Tabs Navigation
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      switchAdminTab(targetId);
    });
  });

  // Pulsante Aggiungi rapido lavoro
  const btnQuickAdd = document.getElementById('btn-quick-add-work');
  if (btnQuickAdd) {
    btnQuickAdd.addEventListener('click', () => {
      openAdmin();
      switchAdminTab('tab-portfolio');
    });
  }

  // Setup Form Servizi Edit
  setupServiceEditor();

  // Setup Form Upload Lavori
  setupPortfolioUpload();

  // Setup Export / Import
  setupExportImport();
}

function switchAdminTab(tabId) {
  STATE.activeAdminTab = tabId;
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.admin-tab-content').forEach(c => {
    c.classList.toggle('active', c.id === tabId);
  });
}

// Popola le viste admin
function populateAdminViews() {
  renderAdminServicesList();
  renderAdminPortfolioList();
}

// =========================================================
// 9. GESTIONE SERVIZI DALL'ADMIN (EDIT SLOT)
// =========================================================
function renderAdminServicesList() {
  const list = document.getElementById('admin-services-list');
  if (!list || !STATE.data || !STATE.data.services) return;

  list.innerHTML = '';
  STATE.data.services.forEach((s, idx) => {
    const item = document.createElement('div');
    item.className = 'admin-slot-item';
    const statusText = s.status === 'active' ? '[ATTIVO]' : '[VUOTO]';
    item.innerHTML = `
      <div class="slot-item-info">
        <h5>Slot ${idx + 1}: ${escapeHtml(s.title)}</h5>
        <span class="slot-item-status">${statusText}</span>
      </div>
      <button type="button" class="btn-racing-ghost" data-slot-id="${s.id}">MODIFICA</button>
    `;

    item.querySelector('button').addEventListener('click', () => {
      openServiceEditor(s.id);
    });

    list.appendChild(item);
  });
}

function openServiceEditor(slotId) {
  const box = document.getElementById('service-editor-box');
  const service = STATE.data.services.find(s => s.id === Number(slotId));
  if (!service || !box) return;

  box.classList.remove('hidden');
  document.getElementById('editor-service-title').textContent = `MODIFICA SLOT #${service.id}`;
  document.getElementById('edit-service-id').value = service.id;
  document.getElementById('edit-service-status').value = service.status;
  document.getElementById('edit-service-icon').value = service.icon || 'spray';
  document.getElementById('edit-service-name').value = service.title;
  document.getElementById('edit-service-desc').value = service.description;
  document.getElementById('edit-service-tags').value = (service.tags || []).join(', ');

  box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupServiceEditor() {
  const form = document.getElementById('form-service-edit');
  const cancelBtn = document.getElementById('btn-cancel-service-edit');
  const box = document.getElementById('service-editor-box');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      box.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = Number(document.getElementById('edit-service-id').value);
      const target = STATE.data.services.find(s => s.id === id);
      if (!target) return;

      target.status = document.getElementById('edit-service-status').value;
      target.icon = document.getElementById('edit-service-icon').value;
      target.title = document.getElementById('edit-service-name').value.trim();
      target.description = document.getElementById('edit-service-desc').value.trim();

      const rawTags = document.getElementById('edit-service-tags').value;
      target.tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);

      saveStateToStorage();
      renderServices();
      renderAdminServicesList();
      box.classList.add('hidden');
      showToast('Servizio aggiornato con successo!');
    });
  }
}

// =========================================================
// 10. UPLOAD LAVORI PRIMA & DOPO
// =========================================================
function setupPortfolioUpload() {
  const form = document.getElementById('form-add-portfolio');
  const fileBefore = document.getElementById('file-before');
  const fileAfter = document.getElementById('file-after');
  const urlBefore = document.getElementById('url-before');
  const urlAfter = document.getElementById('url-after');
  const prevBefore = document.getElementById('img-preview-before');
  const prevAfter = document.getElementById('img-preview-after');

  // Preview helper
  function handleImageFile(file, imgEl, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
      imgEl.classList.remove('hidden');
      imgEl.previousElementSibling.classList.add('hidden');
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  if (fileBefore) {
    fileBefore.addEventListener('change', (e) => {
      handleImageFile(e.target.files[0], prevBefore, (dataUrl) => {
        STATE.beforeImgData = dataUrl;
        if (urlBefore) urlBefore.value = '';
      });
    });
  }

  if (fileAfter) {
    fileAfter.addEventListener('change', (e) => {
      handleImageFile(e.target.files[0], prevAfter, (dataUrl) => {
        STATE.afterImgData = dataUrl;
        if (urlAfter) urlAfter.value = '';
      });
    });
  }

  if (urlBefore) {
    urlBefore.addEventListener('input', () => {
      if (urlBefore.value.trim()) {
        prevBefore.src = urlBefore.value.trim();
        prevBefore.classList.remove('hidden');
        prevBefore.previousElementSibling.classList.add('hidden');
        STATE.beforeImgData = urlBefore.value.trim();
      }
    });
  }

  if (urlAfter) {
    urlAfter.addEventListener('input', () => {
      if (urlAfter.value.trim()) {
        prevAfter.src = urlAfter.value.trim();
        prevAfter.classList.remove('hidden');
        prevAfter.previousElementSibling.classList.add('hidden');
        STATE.afterImgData = urlAfter.value.trim();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('work-title').value.trim();
      const model = document.getElementById('work-model').value.trim();
      const category = document.getElementById('work-category').value;
      const date = document.getElementById('work-date').value || new Date().toISOString().split('T')[0];
      const notes = document.getElementById('work-notes').value.trim();

      const beforeImg = STATE.beforeImgData || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80';
      const afterImg = STATE.afterImgData || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80';

      const newWork = {
        id: Date.now(),
        title,
        model,
        category,
        date,
        notes,
        beforeImg,
        afterImg
      };

      STATE.data.portfolio.unshift(newWork);
      saveStateToStorage();
      renderPortfolio(STATE.activeFilter);
      renderAdminPortfolioList();

      form.reset();
      prevBefore.classList.add('hidden');
      prevBefore.previousElementSibling.classList.remove('hidden');
      prevAfter.classList.add('hidden');
      prevAfter.previousElementSibling.classList.remove('hidden');
      STATE.beforeImgData = null;
      STATE.afterImgData = null;

      showToast('Nuovo lavoro pubblicato con successo nella Gallery!');
    });
  }
}

function renderAdminPortfolioList() {
  const container = document.getElementById('works-mgmt-list');
  if (!container || !STATE.data || !STATE.data.portfolio) return;

  container.innerHTML = '';
  STATE.data.portfolio.forEach(item => {
    const row = document.createElement('div');
    row.className = 'work-mgmt-row';
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(item.title)}</strong> (${escapeHtml(item.model)}) — <em>${escapeHtml(item.category)}</em>
      </div>
      <button type="button" class="btn-racing-ghost" style="color: #ef4444; border-color: #ef4444;" data-id="${item.id}">ELIMINA</button>
    `;

    row.querySelector('button').addEventListener('click', () => {
      if (confirm(`Sei sicuro di voler eliminare "${item.title}"?`)) {
        STATE.data.portfolio = STATE.data.portfolio.filter(p => p.id !== item.id);
        saveStateToStorage();
        renderPortfolio(STATE.activeFilter);
        renderAdminPortfolioList();
        showToast('Lavoro rimosso dal portfolio.');
      }
    });

    container.appendChild(row);
  });
}

// =========================================================
// 11. PERSISTENZA ED ESPORTAZIONE DATA.JSON
// =========================================================
function setupExportImport() {
  const exportBtn = document.getElementById('btn-export-json');
  const importInput = document.getElementById('input-import-json');
  const pinInput = document.getElementById('input-new-pin');
  const pinSaveBtn = document.getElementById('btn-save-new-pin');

  // Export JSON
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!STATE.data) return;
      const exportPayload = {
        meta: STATE.data.meta || {},
        services: STATE.data.services || [],
        portfolio: STATE.data.portfolio || [],
        adminPin: getStoredPin()
      };

      const jsonStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('File data.json scaricato! Sostituiscilo nella cartella del sito.');
    });
  }

  // Import JSON
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.services && parsed.portfolio) {
            STATE.data = parsed;
            if (parsed.adminPin) {
              localStorage.setItem(CONFIG.pinStorageKey, parsed.adminPin);
            }
            saveStateToStorage();
            renderServices();
            renderPortfolio(STATE.activeFilter);
            populateAdminViews();
            showToast('Configurazione data.json importata con successo!');
          } else {
            alert('Formato file JSON non valido. Assicurati che contenga services e portfolio.');
          }
        } catch (err) {
          alert('Errore nella lettura del file JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  // Change PIN
  if (pinSaveBtn && pinInput) {
    pinSaveBtn.addEventListener('click', () => {
      const newPin = pinInput.value.trim();
      if (newPin.length >= 4) {
        localStorage.setItem(CONFIG.pinStorageKey, newPin);
        if (STATE.data) STATE.data.adminPin = newPin;
        saveStateToStorage();
        pinInput.value = '';
        showToast(`PIN aggiornato con successo a: ${newPin}`);
      } else {
        alert('Il PIN deve contenere almeno 4 cifre.');
      }
    });
  }
}

// =========================================================
// 12. NAVBAR SCROLL & MOBILE DRAWER
// =========================================================
function setupNavigation() {
  const header = document.getElementById('navbar');
  const mobileToggle = document.getElementById('btn-mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');

  // Scroll glassmorphism
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile drawer
  if (mobileToggle && drawer) {
    mobileToggle.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });

    drawer.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    });
  }

  // Dynamic Year in Footer
  const yearEl = document.getElementById('year-label');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// =========================================================
// 13. TOAST NOTIFIER HELPER
// =========================================================
function showToast(message) {
  const toast = document.getElementById('toast-notifier');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

// =========================================================
// 14. UTILITY ESCAPE HTML
// =========================================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// =========================================================
// 15. FALLBACK DATA IN CASO DI DISCONNESSIONE ESTREMA
// =========================================================
function getFallbackData() {
  return {
    meta: {
      brand: "ColorBike",
      subBrand: "CARROZZERIA di GATTO VITTORIO",
      piva: "09180971211",
      address: "Via Petraro 381, 80050 Santa Maria La Carità (NA)",
      whatsapp: "+393401234567"
    },
    services: [
      { id: 1, status: "active", icon: "spray", title: "Verniciatura Moto e Scooter", description: "Ciclo termico a forno a 65°C, tinte originali OEM per ogni moto o scooter.", tags: ["Tinte OEM", "Moto & Scooter"] },
      { id: 2, status: "active", icon: "flag", title: "Grafiche Personalizzate", description: "Design e livree racing o stradali su misura sigillate sotto trasparente.", tags: ["Livree", "Loghi"] },
      { id: 3, status: "active", icon: "brush", title: "Aerografo & Cubicatura", description: "Lavorazioni artistiche a mano libera, sfumature 3D ed idrostampa cubicatura (carbon look).", tags: ["Aerografia", "Cubicatura", "Caschi & Carene"] },
      { id: 4, status: "active", icon: "tuning", title: "Personalizzazione Totale Moto", description: "Restyling estetico completo a 360° per moto stradali e maxiscooter.", tags: ["Restyling 360°", "Cambi Colore"] },
      { id: 5, status: "active", icon: "helmet", title: "Verniciatura Caschi", description: "Personalizzazione grafica e verniciatura caschi integrali, jet e modulari.", tags: ["Caschi", "Livree Pilota"] },
      { id: 6, status: "active", icon: "shield", title: "Riparazione in caso di Incidenti", description: "Ripristino carene da scivolata, saldatura plastiche ABS e stuccatura serbatoi.", tags: ["Saldatura ABS", "Ripristino Danni"] }
    ],
    portfolio: [],
    adminPin: "0000"
  };
}

// =========================================================
// 16. BOOTSTRAP APPLICAZIONE
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilterListeners();
  setupQuoteModal();
  setupAdminPanel();
  initAppData();
});
