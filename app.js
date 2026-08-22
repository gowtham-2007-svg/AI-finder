/* ==========================================================================
   CampusFind AI - Interactive Application Logic
   ========================================================================== */

// Sample Mock Campus Lost & Found Inventory Data
const campusInventory = [
  {
    id: 1,
    title: 'Apple AirPods Pro Case',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor',
    status: 'Reported Found',
    time: '25 mins ago',
    image: 'assets/airpods_found.jpg'
  },
  {
    id: 2,
    title: 'Blue Hydro Flask Water Bottle',
    category: 'Other',
    location: 'Student Union Lounge',
    status: 'Reported Found',
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Black North Face Backpack',
    category: 'Bags',
    location: 'Science & Tech Building 102',
    status: 'Searching',
    time: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'University Student ID & Dorm Key',
    category: 'Keys',
    location: 'Dining Hall Entrance',
    status: 'Reported Found',
    time: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    title: 'Matte Black Ray-Ban Sunglasses',
    category: 'Clothing',
    location: 'Recreation Gym Desk',
    status: 'Reported Found',
    time: '2 days ago',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 6,
    title: 'MacBook Air M2 Silver (Sticker on Lid)',
    category: 'Electronics',
    location: 'Engineering Quad Bench',
    status: 'Verifying Claim',
    time: '3 days ago',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'
  }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderInventory(campusInventory);
  animateStatsCounters();
});

// Toast notification helper
function showToast(message) {
  const container = document.getElementById('toast-container');
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
}

function openSearchModal() {
  document.getElementById('search-modal').classList.add('active');
  renderInventory(campusInventory);
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
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

// File upload preview handler
function handleFileSelect(event, previewId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const container = document.getElementById(previewId);
      container.innerHTML = `
        <img src="${e.target.result}" alt="Preview" style="max-height: 120px; border-radius: 10px; object-fit: contain;">
        <p style="margin-top: 6px; font-weight: 600; font-size: 0.85rem; color: #059669;">✓ ${file.name} Loaded</p>
      `;
    };
    reader.readAsDataURL(file);
    showToast(`Photo "${file.name}" uploaded successfully!`);
  }
}

// Campus Route Tracker State
let selectedRoute = [];

// Route Builder Functions
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

// Handle AI Lost Submit Scan Process
function handleLostSubmit(event) {
  event.preventDefault();
  
  const title = document.getElementById('lost-title').value || 'Lost Item';
  const lastRemembered = document.getElementById('last-remembered-loc').value || 'Library';
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
        closeModal('lost-modal');
        submitBtn.disabled = false;
        progressBox.style.display = 'none';
        barFill.style.width = '0%';

        // Generate AI Estimated Top 3 Locations based on Route + Last Remembered
        const estimatedLocations = calculateAIEstimatedLocations(lastRemembered, selectedRoute);

        // Display AI Estimated Locations in Search Modal
        renderAIEstimatedLocations(estimatedLocations);

        // Prioritize found items matching top AI locations
        const prioritizedInventory = sortInventoryByAIPriority(estimatedLocations);

        // Open Search Modal with prioritized results!
        openSearchModalWithItems(prioritizedInventory);

        showToast(`🤖 AI analyzed route & estimated top 3 locations for "${title}"!`);
      }, 400);
    }
  }, 50);
}

// AI Location Estimation Logic
function calculateAIEstimatedLocations(lastRemembered, route) {
  // Extract route location basenames (e.g. "📚 Library" -> "Library")
  const cleanRoute = route.map(r => r.replace(/^[^\w\s]+/, '').trim());

  let loc1 = { name: '📚 Library', raw: 'Library', score: 82 };
  let loc2 = { name: '🍔 Canteen', raw: 'Canteen', score: 76 };
  let loc3 = { name: '🏫 Classroom', raw: 'Classroom', score: 64 };

  // Map of location icons
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

  // If user provided a specific route sequence, use it for estimation
  if (cleanRoute.length >= 2) {
    const r1 = cleanRoute[cleanRoute.length - 1] || 'Library';
    const r2 = cleanRoute[cleanRoute.length - 2] || 'Canteen';
    const r3 = cleanRoute[0] || 'Classroom';

    loc1 = { name: iconMap[r1] || `📍 ${r1}`, raw: r1, score: 85 };
    loc2 = { name: iconMap[r2] || `📍 ${r2}`, raw: r2, score: 74 };
    loc3 = { name: iconMap[r3] || `📍 ${r3}`, raw: r3, score: 62 };
  } else if (lastRemembered) {
    loc1 = { name: iconMap[lastRemembered] || `📍 ${lastRemembered}`, raw: lastRemembered, score: 82 };
    
    // Pick smart secondary & tertiary stops
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

// Sort Inventory by AI Location Priority
function sortInventoryByAIPriority(estimatedLocations) {
  const topRaws = estimatedLocations.map(e => e.raw.toLowerCase());
  
  return [...campusInventory].sort((a, b) => {
    const matchA = topRaws.some(loc => a.location.toLowerCase().includes(loc));
    const matchB = topRaws.some(loc => b.location.toLowerCase().includes(loc));
    if (matchA && !matchB) return -1;
    if (!matchA && matchB) return 1;
    return 0;
  });
}

function openSearchModalWithItems(items) {
  document.getElementById('search-modal').classList.add('active');
  renderInventory(items, true);
}

// Handle Found Item Submit
function handleFoundSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('found-title').value;
  const loc = document.getElementById('found-location').value;

  campusInventory.unshift({
    id: Date.now(),
    title: title,
    category: 'Found',
    location: loc,
    status: 'Reported Found',
    time: 'Just now',
    image: 'assets/airpods_found.jpg'
  });

  closeModal('found-modal');
  showToast(`Thank you! "${title}" has been added to campus database.`);
}

// Render Database Items
function renderInventory(items, isPrioritized = false) {
  const grid = document.getElementById('inventory-grid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748B; padding: 20px;">No matching lost items found in current database query.</p>`;
    return;
  }

  grid.innerHTML = items.map(item => {
    const isPriority = isPrioritized && (item.location.includes('Library') || item.location.includes('Canteen') || item.location.includes('Classroom'));
    return `
      <div class="inventory-item-card" style="${isPriority ? 'border: 2px solid #FDE68A; background: #FFFDF0;' : ''}">
        <div class="item-img-placeholder">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/airpods_lost.jpg'">
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <div class="item-status-pill">${item.status}</div>
          ${isPriority ? '<div class="priority-tag">⭐ AI Top Match</div>' : ''}
        </div>
        <div class="item-title">${item.title}</div>
        <div class="item-loc">📍 ${item.location} • <span style="color:#94A3B8;">${item.time}</span></div>
        <button class="btn btn-yellow" style="padding: 8px 14px; font-size: 0.82rem; margin-top: 4px;" onclick="showToast('Claim verification code sent to Security Desk for ${item.title}')">
          Claim Item
        </button>
      </div>
    `;
  }).join('');
}

// Active Category Filter State
let currentCategory = 'All';

function filterByCategory(category, btnElement) {
  currentCategory = category;
  document.querySelectorAll('.cat-chip').forEach(chip => chip.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const query = document.getElementById('search-input').value.toLowerCase();
  applySearchAndCategoryFilter(query, category);
}

// Filter Search Database
function filterSearchItems() {
  const query = document.getElementById('search-input').value.toLowerCase();
  applySearchAndCategoryFilter(query, currentCategory);
}

function applySearchAndCategoryFilter(query, category) {
  const filtered = campusInventory.filter(item => {
    const matchesCategory = (category === 'All') || (item.category.toLowerCase() === category.toLowerCase());
    const matchesQuery = !query || 
      item.title.toLowerCase().includes(query) || 
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  renderInventory(filtered);
}

// Trigger hero right side AI scan re-animation on click
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

