/* ==========================================================================
   CampusFind AI - Interactive Application Logic & Public Directory Engine
   ========================================================================== */

// Initial Comprehensive Campus Lost & Found Inventory Data
let campusInventory = [
  {
    id: 1,
    title: 'Apple AirPods Pro 2nd Gen Case',
    type: 'found',
    category: 'Electronics',
    brand: 'Apple',
    color: 'White',
    location: 'Library',
    locationDetail: 'Central University Library, 2nd Floor Quiet Desk',
    date: '2026-08-22 10:20',
    timeAgo: '25 mins ago',
    image: 'assets/airpods_found.jpg',
    notes: 'Found left on study table 14 with charging cable.'
  },
  {
    id: 2,
    title: 'Apple AirPods Pro Case',
    type: 'lost',
    category: 'Electronics',
    brand: 'Apple',
    color: 'White',
    location: 'Library',
    locationDetail: 'Central University Library, study area',
    date: '2026-08-22 09:55',
    timeAgo: '50 mins ago',
    image: 'assets/airpods_lost.jpg',
    notes: 'Lost white case with small scratch on bottom hinge.'
  },
  {
    id: 3,
    title: 'Hydro Flask Wide Mouth Bottle (32oz)',
    type: 'found',
    category: 'Other',
    brand: 'Hydro Flask',
    color: 'Blue',
    location: 'Student Cafe',
    locationDetail: 'Student Union Lounge & Cafe Counter',
    date: '2026-08-22 09:00',
    timeAgo: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
    notes: 'Has a small sticker of a mountain peak on the side.'
  },
  {
    id: 4,
    title: 'The North Face Borealis Backpack',
    type: 'lost',
    category: 'Bags',
    brand: 'The North Face',
    color: 'Black',
    location: 'Science Lab',
    locationDetail: 'Science & Tech Building, Room 102 Lab',
    date: '2026-08-22 07:30',
    timeAgo: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
    notes: 'Contains notebooks and calculus study guides.'
  },
  {
    id: 5,
    title: 'Student ID & Dorm Key Lanyard',
    type: 'found',
    category: 'Keys',
    brand: 'University ID',
    color: 'Blue',
    location: 'Canteen',
    locationDetail: 'Campus Dining Hall / Canteen Entrance',
    date: '2026-08-21 16:00',
    timeAgo: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60',
    notes: 'Handed to Canteen cashier desk.'
  },
  {
    id: 6,
    title: 'Ray-Ban Wayfarer Polarized Sunglasses',
    type: 'found',
    category: 'Clothing',
    brand: 'Ray-Ban',
    color: 'Black',
    location: 'Gym',
    locationDetail: 'Recreation & Fitness Gym Bench',
    date: '2026-08-20 14:00',
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60',
    notes: 'Black frame in brown leather case.'
  },
  {
    id: 7,
    title: 'MacBook Air M2 13-inch (Silver)',
    type: 'lost',
    category: 'Electronics',
    brand: 'Apple',
    color: 'Silver',
    location: 'Campus Quad',
    locationDetail: 'Central Campus Quad Bench under Oak tree',
    date: '2026-08-20 11:30',
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    notes: 'Has coding stickers on top cover.'
  },
  {
    id: 8,
    title: 'Silver Apple MacBook Air Laptop',
    type: 'found',
    category: 'Electronics',
    brand: 'Apple',
    color: 'Silver',
    location: 'Campus Quad',
    locationDetail: 'Turned in from Central Quad Lawn',
    date: '2026-08-20 12:15',
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    notes: 'Secured at Campus Main Gate Security Hub.'
  }
];

// Active Directory State
let currentDirectoryTab = 'all';
let currentCategory = 'All';
let selectedRoute = [];

// Live Campus Notifications Data
let campusNotifications = [
  {
    id: 1,
    title: '🤖 AI High-Confidence Match (94%)',
    desc: 'White AirPods Pro Case found in Central Library matches your reported lost item!',
    time: '25m ago',
    type: 'match',
    icon: '⚡',
    read: false,
    targetTab: 'matches'
  },
  {
    id: 2,
    title: '📦 New Item Turned In',
    desc: 'Blue Hydro Flask water bottle turned in at Student Cafe Lounge.',
    time: '1h ago',
    type: 'found',
    icon: '🟢',
    read: false,
    targetTab: 'found'
  },
  {
    id: 3,
    title: '🔴 Lost Item Reported Near You',
    desc: 'Silver MacBook Air M2 reported lost at Central Quad.',
    time: '2h ago',
    type: 'lost',
    icon: '🔴',
    read: false,
    targetTab: 'lost'
  },
  {
    id: 4,
    title: '🔒 Security Desk Verification Pass',
    desc: 'Pass #PASS-42891 verified & ready for Student ID STU-2026.',
    time: 'Yesterday',
    type: 'system',
    icon: '🛡️',
    read: true,
    targetTab: 'all'
  }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderNotifications();
  renderPublicDirectory();
  renderInventory(campusInventory);
  animateStatsCounters();
});

// ==========================================================================
// Notifications Dropdown Logic
// ==========================================================================
function toggleNotificationDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('notification-dropdown');
  if (!dropdown) return;
  
  const isActive = dropdown.classList.contains('active');
  if (isActive) {
    dropdown.classList.remove('active');
  } else {
    dropdown.classList.add('active');
    renderNotifications();
  }
}

// Close notification dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('notification-dropdown');
  const bellBtn = document.getElementById('notif-bell-btn');
  if (dropdown && dropdown.classList.contains('active')) {
    if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  }
});

function renderNotifications() {
  const list = document.getElementById('notif-items-list');
  const countEl = document.getElementById('notif-unread-count');
  const badgeEl = document.getElementById('notif-badge');
  if (!list) return;

  const unreadCount = campusNotifications.filter(n => !n.read).length;
  if (countEl) countEl.innerText = unreadCount > 0 ? `${unreadCount} new` : 'All caught up';
  if (badgeEl) {
    if (unreadCount > 0) {
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  if (campusNotifications.length === 0) {
    list.innerHTML = `<div style="padding: 24px; text-align: center; color: #94A3B8; font-size: 0.85rem;">No notifications right now.</div>`;
    return;
  }

  list.innerHTML = campusNotifications.map(notif => {
    let iconClass = 'notif-icon-system';
    if (notif.type === 'match') iconClass = 'notif-icon-match';
    else if (notif.type === 'found') iconClass = 'notif-icon-found';
    else if (notif.type === 'lost') iconClass = 'notif-icon-lost';

    return `
      <div class="notif-item ${notif.read ? '' : 'unread'}" onclick="clickNotification(${notif.id})">
        <div class="notif-item-icon ${iconClass}">
          ${notif.icon}
        </div>
        <div class="notif-item-body">
          <div class="notif-item-title">${notif.title}</div>
          <div class="notif-item-desc">${notif.desc}</div>
          <div class="notif-item-time">${notif.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

function markAllNotificationsRead(event) {
  if (event) event.stopPropagation();
  campusNotifications.forEach(n => n.read = true);
  renderNotifications();
  showToast('All notifications marked as read');
}

function clickNotification(notifId) {
  const notif = campusNotifications.find(n => n.id === notifId);
  if (notif) {
    notif.read = true;
    renderNotifications();
    const dropdown = document.getElementById('notification-dropdown');
    if (dropdown) dropdown.classList.remove('active');

    if (notif.targetTab) {
      switchDirectoryTab(notif.targetTab);
      scrollToSection('directory-section');
    }
  }
}

function viewAllMatchesFromNotif(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('notification-dropdown');
  if (dropdown) dropdown.classList.remove('active');
  switchDirectoryTab('matches');
  scrollToSection('directory-section');
}

// Toast notification helper
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC700" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navigation Tab Management
function setActiveNav(navId) {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.getElementById(`nav-${navId}`);
  if (activeLink) activeLink.classList.add('active');
}

function switchTab(tabId) {
  setActiveNav(tabId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function viewLostItems() {
  setActiveNav('lost-items');
  switchDirectoryTab('lost');
  scrollToSection('directory-section');
  showToast('Showing all reported Lost Items');
}

function viewFoundItems() {
  setActiveNav('found-items');
  switchDirectoryTab('found');
  scrollToSection('directory-section');
  showToast('Showing all reported Found Items');
}

// FAQ Accordion Toggle
function toggleFaq(element) {
  element.classList.toggle('open');
}

// Modal Control
function openLostModal() {
  document.getElementById('lost-modal').classList.add('active');
  const dateInput = document.getElementById('lost-date');
  if (dateInput && !dateInput.value) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateInput.value = now.toISOString().slice(0, 16);
  }
}

function openFoundModal() {
  document.getElementById('found-modal').classList.add('active');
  const dateInput = document.getElementById('found-date');
  if (dateInput && !dateInput.value) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateInput.value = now.toISOString().slice(0, 16);
  }
}

function openSearchModal() {
  document.getElementById('search-modal').classList.add('active');
  renderInventory(campusInventory);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
  const scanProgress = document.getElementById('ai-scan-progress');
  if (scanProgress) scanProgress.style.display = 'none';
}

// Close modals when clicking background overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

// Safe trigger for photo file input
function triggerPhotoUpload(inputId, event) {
  if (event) {
    event.stopPropagation();
  }
  const fileInput = document.getElementById(inputId);
  if (fileInput) {
    fileInput.click();
  }
}

// File upload preview handler
function handleFileSelect(event, previewId) {
  if (event) event.stopPropagation();
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const container = document.getElementById(previewId);
      if (container) {
        container.innerHTML = `
          <img src="${e.target.result}" alt="Preview" style="max-height: 120px; border-radius: 10px; object-fit: contain;">
          <p style="margin-top: 6px; font-weight: 600; font-size: 0.85rem; color: #059669;">✓ ${file.name} Loaded</p>
        `;
      }
    };
    reader.readAsDataURL(file);
    showToast(`Photo "${file.name}" uploaded successfully!`);
  }
}

// ==========================================================================
// Campus Route Builder Functions
// ==========================================================================
function addRouteLocation(locationName, event) {
  if (event) event.stopPropagation();
  selectedRoute.push(locationName);
  updateRouteDisplay();
  showToast(`Added ${locationName} to your campus route`);
}

function clearCampusRoute(event) {
  if (event) event.stopPropagation();
  selectedRoute = [];
  updateRouteDisplay();
  showToast('Campus route cleared');
}

function updateRouteDisplay() {
  const container = document.getElementById('route-display-box');
  if (!container) return;
  if (selectedRoute.length === 0) {
    container.innerHTML = `<span class="route-placeholder">Select your route sequence below (e.g. Classroom → Canteen → Library)</span>`;
  } else {
    container.innerHTML = selectedRoute.map((loc, index) => `
      <span class="route-pill">${loc}</span>
      ${index < selectedRoute.length - 1 ? '<span class="route-arrow">→</span>' : ''}
    `).join('');
  }
}

// ==========================================================================
// Public Directory & AI Matching Engine
// ==========================================================================

function updateDirectoryCounts() {
  const allCount = campusInventory.length;
  const lostCount = campusInventory.filter(i => i.type === 'lost').length;
  const foundCount = campusInventory.filter(i => i.type === 'found').length;
  const matchesCount = computeAIMatches().length;

  const countAllEl = document.getElementById('count-all');
  const countLostEl = document.getElementById('count-lost');
  const countFoundEl = document.getElementById('count-found');
  const countMatchesEl = document.getElementById('count-matches');

  if (countAllEl) countAllEl.innerText = allCount;
  if (countLostEl) countLostEl.innerText = lostCount;
  if (countFoundEl) countFoundEl.innerText = foundCount;
  if (countMatchesEl) countMatchesEl.innerText = matchesCount;

  // Update Navbar live count badges
  const navLostEl = document.getElementById('nav-count-lost');
  const navFoundEl = document.getElementById('nav-count-found');
  if (navLostEl) navLostEl.innerText = lostCount;
  if (navFoundEl) navFoundEl.innerText = foundCount;
}

function switchDirectoryTab(tabName) {
  currentDirectoryTab = tabName;
  document.querySelectorAll('.dir-tab').forEach(tab => tab.classList.remove('active'));
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) activeBtn.classList.add('active');

  applyDirectoryFilters();
}

function applyDirectoryFilters() {
  updateDirectoryCounts();

  if (currentDirectoryTab === 'matches') {
    const matches = computeAIMatches();
    renderAIMatches(matches);
    return;
  }

  const query = (document.getElementById('dir-search-input')?.value || '').toLowerCase().trim();
  const category = document.getElementById('dir-filter-category')?.value || 'All';
  const location = document.getElementById('dir-filter-location')?.value || 'All';
  const color = document.getElementById('dir-filter-color')?.value || 'All';
  const sort = document.getElementById('dir-filter-sort')?.value || 'newest';

  let filtered = campusInventory.filter(item => {
    // Tab filter
    if (currentDirectoryTab === 'lost' && item.type !== 'lost') return false;
    if (currentDirectoryTab === 'found' && item.type !== 'found') return false;

    // Search query
    if (query) {
      const matchName = item.title.toLowerCase().includes(query);
      const matchBrand = (item.brand || '').toLowerCase().includes(query);
      const matchColor = (item.color || '').toLowerCase().includes(query);
      const matchLoc = (item.locationDetail || item.location).toLowerCase().includes(query);
      const matchNotes = (item.notes || '').toLowerCase().includes(query);
      if (!matchName && !matchBrand && !matchColor && !matchLoc && !matchNotes) return false;
    }

    // Category filter
    if (category !== 'All' && item.category !== category) return false;

    // Location filter
    if (location !== 'All' && !item.location.toLowerCase().includes(location.toLowerCase())) return false;

    // Color filter
    if (color !== 'All' && !item.color.toLowerCase().includes(color.toLowerCase())) return false;

    return true;
  });

  // Sort
  if (sort === 'newest') {
    filtered.sort((a, b) => b.id - a.id);
  } else if (sort === 'oldest') {
    filtered.sort((a, b) => a.id - b.id);
  }

  renderDirectoryCards(filtered);
}

function renderPublicDirectory() {
  updateDirectoryCounts();
  applyDirectoryFilters();
}

function renderDirectoryCards(items) {
  const grid = document.getElementById('directory-cards-grid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: 20px; border: 1px dashed #CBD5E1;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🔍</div>
        <h3 style="font-family: var(--font-heading); color: var(--color-heading); font-size: 1.2rem;">No items found matching your filters</h3>
        <p style="color: var(--color-muted); font-size: 0.9rem; margin-top: 4px;">Try broadening your keywords or selecting "All Categories".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => {
    const isLost = item.type === 'lost';
    return `
      <div class="public-item-card" id="item-card-${item.id}">
        <div class="item-card-top-image">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/airpods_lost.jpg'">
          <div class="item-card-status-badge ${isLost ? 'badge-lost' : 'badge-found'}">
            ${isLost ? '🔴 LOST ITEM' : '🟢 FOUND ITEM'}
          </div>
        </div>

        <div class="item-card-body">
          <div class="item-card-header-row">
            <h3 class="item-card-title">${item.title}</h3>
            <span class="item-card-category-tag">${item.category}</span>
          </div>

          <div class="item-card-tags-row">
            <span class="item-spec-pill pill-brand">🏷️ ${item.brand || 'Unspecified'}</span>
            <span class="item-spec-pill pill-color">🎨 ${item.color || 'Standard'}</span>
          </div>

          <div class="item-card-meta-list">
            <div class="item-card-meta-item">
              <span>📍</span>
              <strong>${item.locationDetail || item.location}</strong>
            </div>
            <div class="item-card-meta-item">
              <span>🕐</span>
              <span>${item.date} (${item.timeAgo || 'Recent'})</span>
            </div>
            ${item.notes ? `
              <div class="item-card-meta-item" style="font-size: 0.8rem; color: #475569;">
                <span>📝</span>
                <em>"${item.notes}"</em>
              </div>
            ` : ''}
          </div>

          <div class="item-privacy-note">
            <span>🔒</span>
            <span>Contact & student ID kept private until verified</span>
          </div>

          <div class="item-card-actions-row">
            <button type="button" class="btn ${isLost ? 'btn-white' : 'btn-yellow'}" style="flex: 1;" onclick="openClaimModal(${item.id})">
              ${isLost ? '🤝 I Found This' : '🏷️ Claim Item'}
            </button>
            <button type="button" class="item-card-share-btn" title="Share this item report" onclick="openShareModal(${item.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Compute AI Pair Matches between Lost items and Found items
function computeAIMatches() {
  const lostItems = campusInventory.filter(i => i.type === 'lost');
  const foundItems = campusInventory.filter(i => i.type === 'found');
  const matches = [];

  lostItems.forEach(lost => {
    foundItems.forEach(found => {
      let score = 50;
      let reasons = [];

      // Check Category
      if (lost.category === found.category) {
        score += 20;
        reasons.push('Same Category');
      }

      // Check Brand
      if (lost.brand && found.brand && lost.brand.toLowerCase() === found.brand.toLowerCase()) {
        score += 15;
        reasons.push(`Brand: ${lost.brand}`);
      }

      // Check Color
      if (lost.color && found.color && lost.color.toLowerCase() === found.color.toLowerCase()) {
        score += 10;
        reasons.push(`Color: ${lost.color}`);
      }

      // Check Location Proximity
      if (lost.location.toLowerCase() === found.location.toLowerCase()) {
        score += 15;
        reasons.push(`Location: ${lost.location}`);
      }

      // Only qualify if score is >= 75%
      if (score >= 75) {
        matches.push({
          lostItem: lost,
          foundItem: found,
          confidence: Math.min(score, 96),
          reasons: reasons
        });
      }
    });
  });

  return matches;
}

function renderAIMatches(matches) {
  const grid = document.getElementById('directory-cards-grid');
  if (!grid) return;

  if (matches.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: 20px; border: 1px dashed #CBD5E1;">
        <div style="font-size: 2.5rem; margin-bottom: 8px;">🤖</div>
        <h3 style="font-family: var(--font-heading); color: var(--color-heading); font-size: 1.2rem;">No High-Confidence AI Matches Yet</h3>
        <p style="color: var(--color-muted); font-size: 0.9rem; margin-top: 4px;">Our computer vision model constantly checks new lost and found reports.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = matches.map(match => `
    <div class="ai-match-card-pair">
      
      <!-- Lost Item Side -->
      <div class="match-side-box">
        <img src="${match.lostItem.image}" alt="${match.lostItem.title}" class="match-side-img" onerror="this.src='assets/airpods_lost.jpg'">
        <div class="match-side-info">
          <span style="font-size: 0.72rem; font-weight: 800; color: #DC2626;">🔴 REPORTED LOST</span>
          <strong style="font-size: 0.95rem; color: var(--color-heading);">${match.lostItem.title}</strong>
          <span style="font-size: 0.8rem; color: var(--color-muted);">📍 ${match.lostItem.location}</span>
          <span style="font-size: 0.75rem; color: #94A3B8;">🎨 ${match.lostItem.color} • 🏷️ ${match.lostItem.brand}</span>
        </div>
      </div>

      <!-- AI Center Match Pillar -->
      <div class="match-center-pillar">
        <span class="match-conf-score-pill">🤖 ${match.confidence}% Match</span>
        <div style="display:flex; flex-direction:column; gap:3px;">
          ${match.reasons.map(r => `<span class="match-reason-tag">✓ ${r}</span>`).join('')}
        </div>
        <button type="button" class="btn btn-yellow" style="font-size:0.82rem; padding:6px 14px; margin-top:4px;" onclick="openClaimModal(${match.foundItem.id})">
          Verify & Connect
        </button>
      </div>

      <!-- Found Item Side -->
      <div class="match-side-box">
        <img src="${match.foundItem.image}" alt="${match.foundItem.title}" class="match-side-img" onerror="this.src='assets/airpods_found.jpg'">
        <div class="match-side-info">
          <span style="font-size: 0.72rem; font-weight: 800; color: #059669;">🟢 REPORTED FOUND</span>
          <strong style="font-size: 0.95rem; color: var(--color-heading);">${match.foundItem.title}</strong>
          <span style="font-size: 0.8rem; color: var(--color-muted);">📍 ${match.foundItem.location}</span>
          <span style="font-size: 0.75rem; color: #94A3B8;">🎨 ${match.foundItem.color} • 🏷️ ${match.foundItem.brand}</span>
        </div>
      </div>

    </div>
  `).join('');
}

// ==========================================================================
// Form Submissions Handlers
// ==========================================================================

// Handle AI Lost Submit Scan Process
function handleLostSubmit(event) {
  event.preventDefault();
  
  const title = document.getElementById('lost-title').value || 'Lost Item';
  const category = document.getElementById('lost-category').value || 'Electronics';
  const brand = document.getElementById('lost-brand')?.value || 'Standard';
  const color = document.getElementById('lost-color')?.value || 'White';
  const lastRemembered = document.getElementById('last-remembered-loc')?.value || 'Library';
  const dateVal = document.getElementById('lost-date')?.value || new Date().toLocaleString();
  const notes = document.getElementById('lost-notes')?.value || '';

  const submitBtn = document.getElementById('lost-submit-btn');
  const progressBox = document.getElementById('ai-scan-progress');
  const barFill = document.getElementById('scan-bar-fill');
  const percentText = document.getElementById('scan-percent');

  submitBtn.disabled = true;
  progressBox.style.display = 'block';
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 5;
    barFill.style.width = `${progress}%`;
    percentText.innerText = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        // Prepend new lost item to public database
        const newItem = {
          id: Date.now(),
          title: title,
          type: 'lost',
          category: category,
          brand: brand,
          color: color,
          location: lastRemembered,
          locationDetail: `${lastRemembered} (Last Seen Route)`,
          date: dateVal,
          timeAgo: 'Just now',
          image: 'assets/airpods_lost.jpg',
          notes: notes
        };

        campusInventory.unshift(newItem);

        closeModal('lost-modal');
        submitBtn.disabled = false;
        progressBox.style.display = 'none';
        barFill.style.width = '0%';

        // Generate AI Estimated Top 3 Locations
        const estimatedLocations = calculateAIEstimatedLocations(lastRemembered, selectedRoute);
        renderAIEstimatedLocations(estimatedLocations);

        // Update Public Directory
        renderPublicDirectory();

        // Scroll to Public Directory
        scrollToSection('directory-section');

        showToast(`🎉 "${title}" posted to Lost Items & queued for real-time AI Matching!`);
      }, 400);
    }
  }, 40);
}

// Handle Found Item Submit
function handleFoundSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('found-title').value || 'Found Item';
  const category = document.getElementById('found-category')?.value || 'Electronics';
  const brand = document.getElementById('found-brand')?.value || 'Standard';
  const color = document.getElementById('found-color')?.value || 'White';
  const loc = document.getElementById('found-location')?.value || 'Library';
  const dateVal = document.getElementById('found-date')?.value || new Date().toLocaleString();
  const notes = document.getElementById('found-notes')?.value || '';

  const newItem = {
    id: Date.now(),
    title: title,
    type: 'found',
    category: category,
    brand: brand,
    color: color,
    location: loc,
    locationDetail: `${loc} Area`,
    date: dateVal,
    timeAgo: 'Just now',
    image: 'assets/airpods_found.jpg',
    notes: notes
  };

  campusInventory.unshift(newItem);

  closeModal('found-modal');
  renderPublicDirectory();
  scrollToSection('directory-section');

  showToast(`✅ Thank you! "${title}" added to Public Found Items.`);
}

// AI Location Estimation Logic
function calculateAIEstimatedLocations(lastRemembered, route) {
  const cleanRoute = route.map(r => r.replace(/^[^\w\s]+/, '').trim());

  let loc1 = { name: '📚 Central Library', raw: 'Library', score: 82 };
  let loc2 = { name: '🍔 Campus Canteen', raw: 'Canteen', score: 76 };
  let loc3 = { name: '🏫 Classroom', raw: 'Classroom', score: 64 };

  const iconMap = {
    'Library': '📚 Central Library',
    'Canteen': '🍔 Campus Canteen & Food Court',
    'Classroom': '🏫 Classroom & Lecture Hall',
    'Auditorium': '🎭 Campus Auditorium',
    'Gym': '🏋️ Fitness Gym Center',
    'Campus Quad': '🌳 Campus Quad & Lawn',
    'Science Lab': '🔬 Science & Tech Lab',
    'Student Cafe': '☕ Student Cafe Lounge',
    'IT Hub': '💻 Computer Science & IT Hub',
    'Sports Complex': '🏀 Sports Complex & Courts',
    'Admin Office': '🏢 Admin & Registrar Office',
    'Bus Terminal': '🚌 Campus Bus Stop',
    'Bus Stop': '🚌 Campus Bus Stop',
    'Parking Lot': '🅿️ Student Vehicle Parking',
    'Hostel Lounge': '🛏️ Campus Hostel / Dorm Lounge'
  };

  if (cleanRoute.length >= 2) {
    const r1 = cleanRoute[cleanRoute.length - 1] || 'Library';
    const r2 = cleanRoute[cleanRoute.length - 2] || 'Canteen';
    const r3 = cleanRoute[0] || 'Classroom';

    loc1 = { name: iconMap[r1] || `📍 ${r1}`, raw: r1, score: 85 };
    loc2 = { name: iconMap[r2] || `📍 ${r2}`, raw: r2, score: 74 };
    loc3 = { name: iconMap[r3] || `📍 ${r3}`, raw: r3, score: 62 };
  } else if (lastRemembered) {
    loc1 = { name: iconMap[lastRemembered] || `📍 ${lastRemembered}`, raw: lastRemembered, score: 82 };
    const alternatives = Object.keys(iconMap).filter(k => k !== lastRemembered && k !== 'Bus Stop');
    const r2 = alternatives[0] || 'Canteen';
    const r3 = alternatives[1] || 'Classroom';

    loc2 = { name: iconMap[r2] || `📍 ${r2}`, raw: r2, score: 76 };
    loc3 = { name: iconMap[r3] || `📍 ${r3}`, raw: r3, score: 64 };
  }

  return [loc1, loc2, loc3];
}

// Render AI Estimated Locations UI Component
function renderAIEstimatedLocations(estimatedLocations) {
  const container = document.getElementById('ai-estimated-container');
  if (!container) return;

  container.style.display = 'block';
  container.innerHTML = `
    <div class="ai-est-header">
      <div class="ai-est-title">🤖 AI Estimated Locations</div>
      <div class="ai-est-sub">Calculated from your campus route sequence, last remembered location & time analysis</div>
    </div>
    <div class="ai-est-list">
      ${estimatedLocations.map((item, idx) => `
        <div class="ai-est-item">
          <span class="est-loc">${idx + 1}. ${item.name}</span>
          <div class="est-bar-container">
            <div class="est-bar-fill" style="width: ${item.score}%;"></div>
          </div>
          <span class="est-pct">${item.score}%</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ==========================================================================
// Secure Claim Verification Modal Handler
// ==========================================================================
function openClaimModal(itemId) {
  const item = campusInventory.find(i => i.id === itemId);
  if (!item) return;

  const modalTitle = document.getElementById('claim-modal-title');
  const inputId = document.getElementById('claim-item-id');

  if (modalTitle) modalTitle.innerText = `Claim: ${item.title}`;
  if (inputId) inputId.value = itemId;

  document.getElementById('claim-modal')?.classList.add('active');
}

function handleClaimVerificationSubmit(event) {
  event.preventDefault();
  const studentId = document.getElementById('claim-student-id').value;
  const hub = document.getElementById('claim-pickup').value;

  const passCode = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;

  closeModal('claim-modal');

  showToast(`🔒 Pickup Pass ${passCode} generated for Student ID ${studentId}! Take this to ${hub}.`);
}

// Search Modal Category Filter
function filterByCategory(category, btnElement) {
  currentCategory = category;
  document.querySelectorAll('.cat-chip').forEach(chip => chip.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const query = document.getElementById('search-input')?.value.toLowerCase() || '';
  applySearchAndCategoryFilter(query, category);
}

function filterSearchItems() {
  const query = document.getElementById('search-input')?.value.toLowerCase() || '';
  applySearchAndCategoryFilter(query, currentCategory);
}

function applySearchAndCategoryFilter(query, category) {
  const filtered = campusInventory.filter(item => {
    const matchesCategory = (category === 'All') || (item.category.toLowerCase() === category.toLowerCase());
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) || 
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.brand && item.brand.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
  renderInventory(filtered);
}

function renderInventory(items) {
  const grid = document.getElementById('inventory-grid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748B; padding: 20px;">No matching items in database query.</p>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="inventory-item-card">
      <div class="item-img-placeholder">
        <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/airpods_lost.jpg'">
      </div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <div class="item-status-pill ${item.type === 'lost' ? 'badge-lost' : ''}">${item.type === 'lost' ? '🔴 Lost' : '🟢 Found'}</div>
        <span style="font-size:0.75rem; color:#475569;">${item.brand || ''}</span>
      </div>
      <div class="item-title">${item.title}</div>
      <div class="item-loc">📍 ${item.locationDetail || item.location} • <span style="color:#94A3B8;">${item.timeAgo || 'Recent'}</span></div>
      <button class="btn btn-yellow" style="padding: 8px 14px; font-size: 0.82rem; margin-top: 4px;" onclick="openClaimModal(${item.id})">
        ${item.type === 'lost' ? '🤝 I Found This' : 'Claim Item'}
      </button>
    </div>
  `).join('');
}

function triggerAIScanAnimation() {
  showToast('🤖 AI Computer Vision Model analyzing feature vectors...');
}

// Animate Stat Numbers on Load
function animateStatsCounters() {
  const stats = [
    { id: 'stat-1', target: 1240, suffix: '+' },
    { id: 'stat-2', target: 428, suffix: '' },
    { id: 'stat-3', target: 96, suffix: '%' },
    { id: 'stat-4', target: 12, suffix: '' }
  ];

  stats.forEach(stat => {
    const el = document.getElementById(stat.id);
    if (!el) return;
    let current = 0;
    const step = Math.ceil(stat.target / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= stat.target) {
        current = stat.target;
        clearInterval(timer);
      }
      el.innerText = current.toLocaleString() + stat.suffix;
    }, 40);
  });
}

// ==========================================================================
// Share Modal & Social Share Handlers
// ==========================================================================
let currentShareData = {
  title: 'CampusFind AI - Smart Campus Lost & Found',
  text: 'Check out CampusFind AI to locate lost items or report found items on campus!',
  url: window.location.href
};

function openShareModal(itemId) {
  const modal = document.getElementById('share-modal');
  const previewBox = document.getElementById('share-item-preview');
  const titleEl = document.getElementById('share-modal-title');
  const descEl = document.getElementById('share-modal-desc');
  const linkInput = document.getElementById('share-link-input');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (!modal) return;

  if (copyBtnText) copyBtnText.innerText = 'Copy';

  const baseUrl = window.location.origin + window.location.pathname;

  if (itemId) {
    const item = campusInventory.find(i => i.id === itemId);
    if (item) {
      const isLost = item.type === 'lost';
      currentShareData = {
        title: `${isLost ? '🔴 Lost Alert' : '🟢 Found Alert'}: ${item.title}`,
        text: `📢 ${isLost ? 'LOST ITEM' : 'FOUND ITEM'}: "${item.title}" (${item.brand || ''} ${item.color || ''}) at ${item.locationDetail || item.location}. Please check if you can help!`,
        url: `${baseUrl}#item-card-${item.id}`
      };

      if (titleEl) titleEl.innerText = `Share ${isLost ? 'Lost' : 'Found'} Item Alert`;
      if (descEl) descEl.innerText = `Broadcast this report to campus groups to help reunite it faster.`;

      if (previewBox) {
        previewBox.style.display = 'flex';
        const imgEl = document.getElementById('share-preview-img');
        const prevTitle = document.getElementById('share-preview-title');
        const prevLoc = document.getElementById('share-preview-loc');
        if (imgEl) imgEl.src = item.image;
        if (prevTitle) prevTitle.innerText = item.title;
        if (prevLoc) prevLoc.innerText = `📍 ${item.locationDetail || item.location}`;
      }
    }
  } else {
    currentShareData = {
      title: 'CampusFind AI - Smart Campus Lost & Found',
      text: 'Lost or found something on campus? Let AI scan and match items instantly across all campus locations!',
      url: baseUrl
    };

    if (titleEl) titleEl.innerText = 'Share CampusFind AI';
    if (descEl) descEl.innerText = 'Share our smart lost & found directory with fellow students.';
    if (previewBox) previewBox.style.display = 'none';
  }

  if (linkInput) linkInput.value = currentShareData.url;

  // Try native Web Share on mobile if supported
  if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    navigator.share({
      title: currentShareData.title,
      text: currentShareData.text,
      url: currentShareData.url
    }).then(() => {
      showToast('Shared successfully!');
    }).catch(() => {
      modal.classList.add('active');
    });
  } else {
    modal.classList.add('active');
  }
}

function copyShareLink() {
  const linkInput = document.getElementById('share-link-input');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (linkInput) {
    navigator.clipboard.writeText(linkInput.value).then(() => {
      if (copyBtnText) copyBtnText.innerText = '✓ Copied!';
      showToast('🔗 Link copied to clipboard!');
      setTimeout(() => {
        if (copyBtnText) copyBtnText.innerText = 'Copy';
      }, 2500);
    }).catch(() => {
      linkInput.select();
      document.execCommand('copy');
      if (copyBtnText) copyBtnText.innerText = '✓ Copied!';
      showToast('🔗 Link copied!');
    });
  }
}

function shareToWhatsApp() {
  const message = encodeURIComponent(`${currentShareData.text}\n\n🔗 ${currentShareData.url}`);
  window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
}

function shareToTelegram() {
  const text = encodeURIComponent(currentShareData.text);
  const url = encodeURIComponent(currentShareData.url);
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function shareToTwitter() {
  const text = encodeURIComponent(currentShareData.text);
  const url = encodeURIComponent(currentShareData.url);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareViaEmail() {
  const subject = encodeURIComponent(currentShareData.title);
  const body = encodeURIComponent(`${currentShareData.text}\n\nView details here: ${currentShareData.url}`);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
