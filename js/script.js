/**
 * AUTOSHINE — Premium Car Detailing & Automotive Care
 * Unified Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initNavbar();
  initMobileDrawer();
  initBeforeAfterSliders();
  initGalleryLightbox();
  initServiceSearchAndFilter();
  initBookingForm();
  initContactForm();
  initAuthForms();
  initUserDashboard();
  initAdminDashboard();
  initDashboardSidebar();
  initNewsletterForm();
  initFaqAccordions();
  initGlossTelemetry();
  initScrollAnimations();
  initStatCounters();
});

/* ==========================================================================
   1. Navigation & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initMobileDrawer() {
  const hamburgers = document.querySelectorAll('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtns = document.querySelectorAll('.mobile-drawer-close');
  
  if (!drawer || !overlay) return;

  function openDrawer() {
    hamburgers.forEach(h => {
      h.classList.add('active');
      h.setAttribute('aria-expanded', 'true');
    });
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeDrawer() {
    hamburgers.forEach(h => {
      h.classList.remove('active');
      h.setAttribute('aria-expanded', 'false');
    });
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  hamburgers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('active');
      if (isOpen) closeDrawer();
      else openDrawer();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  });

  overlay.addEventListener('click', closeDrawer);

  // Close when clicking any link inside drawer
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

function initDashboardSidebar() {
  const toggleBtns = document.querySelectorAll('.dash-menu-toggle, #dashMobileToggle, #adminMobileToggle, #dashSidebarToggle, #adminSidebarToggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.dashboard-sidebar-overlay');
  const closeBtns = document.querySelectorAll('.dashboard-sidebar-close');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeSidebar() {
    sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('active')) closeSidebar();
      else openSidebar();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close when selecting a tab link on mobile
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
}

/* ==========================================================================
   2. Toast Notification Engine
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `<strong>${icon}</strong> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   3. Interactive Before & After Slider
   ========================================================================== */
function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.ba-container');

  containers.forEach(container => {
    const beforeImage = container.querySelector('.ba-before');
    const handle = container.querySelector('.ba-handle');
    if (!beforeImage || !handle) return;

    let isDown = false;

    function setPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;
      const percentage = pos * 100;
      beforeImage.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDown = false; });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      setPosition(e.clientX);
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      isDown = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDown = false; });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* ==========================================================================
   4. Gallery & Lightbox
   ========================================================================== */
function initGalleryLightbox() {
  // Category Filter
  const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Modal Lightbox
  const lightbox = document.getElementById('lightboxModal');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentList = [];
  let currentIndex = 0;

  function openLightbox(index) {
    currentList = Array.from(galleryItems).filter(i => i.style.display !== 'none');
    if (currentList.length === 0) return;
    
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function updateLightboxContent() {
    const item = currentList[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4')?.textContent || img.alt || 'AutoShine Gallery';
    
    lightboxImg.src = img.src;
    lightboxImg.alt = title;
    lightboxCaption.textContent = title;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const activeIdx = Array.from(galleryItems).indexOf(item);
      openLightbox(activeIdx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
      updateLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentList.length;
      updateLightboxContent();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* ==========================================================================
   5. Service Page Search & Filter
   ========================================================================== */
function initServiceSearchAndFilter() {
  const searchInput = document.getElementById('serviceSearchInput');
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  if (!serviceCards.length) return;

  function filterServices() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const activeBtn = document.querySelector('.service-filter-btn.active');
    const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';

    let matchCount = 0;

    serviceCards.forEach(card => {
      const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
      const cat = card.dataset.category || '';

      const matchesQuery = !query || title.includes(query) || desc.includes(query);
      const matchesCategory = activeCategory === 'all' || cat === activeCategory;

      if (matchesQuery && matchesCategory) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('noServicesMsg');
    if (noResults) {
      noResults.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterServices);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterServices();
    });
  });
}

/* ==========================================================================
   6. Appointment Booking Form
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('appointmentBookingForm');
  if (!form) return;

  // Set minimum date to today (past-date prevention)
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Pre-fill query param selections if redirected from a specific card
  const urlParams = new URLSearchParams(window.location.search);
  const preService = urlParams.get('service');
  const prePackage = urlParams.get('package');

  const serviceSelect = document.getElementById('selectService');
  const packageSelect = document.getElementById('selectPackage');
  const vehicleTypeSelect = document.getElementById('vehicleType');

  if (serviceSelect && preService) serviceSelect.value = preService;
  if (packageSelect && prePackage) packageSelect.value = prePackage;

  // Live Summary Pricing Update
  const summaryService = document.getElementById('summaryService');
  const summaryPackage = document.getElementById('summaryPackage');
  const summaryVehicle = document.getElementById('summaryVehicle');
  const summaryTotal = document.getElementById('summaryTotal');

  const packagePrices = {
    'essential': 99,
    'premium': 249,
    'ultimate': 499,
    'none': 0
  };

  const servicePrices = {
    'wash': 49,
    'interior': 129,
    'full-detail': 199,
    'ceramic': 599,
    'correction': 349,
    'ppf': 899,
    'headlight': 79,
    'engine': 89,
    'wax': 99,
    'leather': 119,
    'odor': 69,
    'wheel-ceramic': 179
  };

  function updateSummary() {
    const pkg = packageSelect ? packageSelect.value : 'none';
    const srv = serviceSelect ? serviceSelect.value : '';
    const vType = vehicleTypeSelect ? vehicleTypeSelect.value : 'Sedan';

    let total = packagePrices[pkg] || 0;
    if (srv && servicePrices[srv]) {
      total += servicePrices[srv];
    }

    // Vehicle type multiplier
    let multiplier = 1.0;
    if (vType === 'SUV') multiplier = 1.15;
    if (vType === 'Luxury Car') multiplier = 1.25;

    const finalAmount = Math.round(total * multiplier);

    if (summaryPackage) {
      summaryPackage.textContent = packageSelect.options[packageSelect.selectedIndex]?.text || 'None';
    }
    if (summaryService) {
      summaryService.textContent = serviceSelect.options[serviceSelect.selectedIndex]?.text || 'None';
    }
    if (summaryVehicle) {
      summaryVehicle.textContent = vType || 'Standard';
    }
    if (summaryTotal) {
      summaryTotal.textContent = `$${finalAmount}`;
    }
  }

  if (packageSelect) packageSelect.addEventListener('change', updateSummary);
  if (serviceSelect) serviceSelect.addEventListener('change', updateSummary);
  if (vehicleTypeSelect) vehicleTypeSelect.addEventListener('change', updateSummary);
  updateSummary();

  // Form Validation & Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // 1. Customer Name (Letters and spaces only, min 2)
    const nameInput = document.getElementById('customerName');
    const nameError = document.getElementById('nameError');
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!nameInput.value.trim() || !nameRegex.test(nameInput.value.trim())) {
      showFieldError(nameInput, nameError, 'Please enter a valid full name (letters and spaces only).');
      isValid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    // 2. Email
    const emailInput = document.getElementById('customerEmail');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // 3. Mobile (Exactly 10 digits)
    const phoneInput = document.getElementById('customerPhone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phoneInput.value.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      showFieldError(phoneInput, phoneError, 'Please enter exactly 10 digits for phone number.');
      isValid = false;
    } else {
      clearFieldError(phoneInput, phoneError);
    }

    // 4. Vehicle Make & Model
    const makeInput = document.getElementById('vehicleMake');
    const makeError = document.getElementById('makeError');
    if (!makeInput.value.trim()) {
      showFieldError(makeInput, makeError, 'Please provide the vehicle make (e.g. BMW, Porsche).');
      isValid = false;
    } else {
      clearFieldError(makeInput, makeError);
    }

    const modelInput = document.getElementById('vehicleModel');
    const modelError = document.getElementById('modelError');
    if (!modelInput.value.trim()) {
      showFieldError(modelInput, modelError, 'Please provide the vehicle model (e.g. M3, 911).');
      isValid = false;
    } else {
      clearFieldError(modelInput, modelError);
    }

    // 5. Preferred Date (no past dates)
    const dateVal = dateInput.value;
    const dateError = document.getElementById('dateError');
    const todayStr = new Date().toISOString().split('T')[0];
    if (!dateVal || dateVal < todayStr) {
      showFieldError(dateInput, dateError, 'Please select today or a future date.');
      isValid = false;
    } else {
      clearFieldError(dateInput, dateError);
    }

    // 6. Time Slot
    const timeSlotSelect = document.getElementById('preferredTime');
    const timeError = document.getElementById('timeError');
    if (!timeSlotSelect.value) {
      showFieldError(timeSlotSelect, timeError, 'Please select a preferred time slot.');
      isValid = false;
    } else {
      clearFieldError(timeSlotSelect, timeError);
    }

    if (!isValid) {
      showToast('Please fix the errors indicated in the form.', 'error');
      return;
    }

    // Generate Demo Booking Reference
    const bookingRef = 'ASH-' + Math.floor(100000 + Math.random() * 900000);
    const bookingData = {
      ref: bookingRef,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: cleanPhone,
      vehicle: `${makeInput.value.trim()} ${modelInput.value.trim()} (${vehicleTypeSelect.value})`,
      regNumber: document.getElementById('vehicleReg')?.value.trim() || 'N/A',
      service: serviceSelect.options[serviceSelect.selectedIndex]?.text || 'Custom Detail',
      package: packageSelect.options[packageSelect.selectedIndex]?.text || 'None',
      date: dateVal,
      time: timeSlotSelect.value,
      notes: document.getElementById('additionalRequirements')?.value.trim() || 'Standard instructions',
      price: summaryTotal ? summaryTotal.textContent : '$199',
      status: 'Confirmed (Demo)'
    };

    // Store in LocalStorage for User Dashboard
    const savedBookings = JSON.parse(localStorage.getItem('autoshine_bookings') || '[]');
    savedBookings.unshift(bookingData);
    localStorage.setItem('autoshine_bookings', JSON.stringify(savedBookings));

    // Show Confirmation Modal
    showBookingConfirmationModal(bookingData);
  });
}

function showFieldError(input, errorElement, message) {
  input.classList.add('is-invalid');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
}

function clearFieldError(input, errorElement) {
  input.classList.remove('is-invalid');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }
}

function showBookingConfirmationModal(data) {
  let modal = document.getElementById('bookingConfirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bookingConfirmModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-icon-success">✓</div>
      <h2>Appointment Requested!</h2>
      <p class="text-silver">Demo Booking Reference: <strong class="text-red">${data.ref}</strong></p>
      
      <div class="modal-receipt-box">
        <div class="summary-item"><span>Customer:</span> <strong>${data.name}</strong></div>
        <div class="summary-item"><span>Vehicle:</span> <strong>${data.vehicle}</strong></div>
        <div class="summary-item"><span>Package / Service:</span> <strong>${data.package} / ${data.service}</strong></div>
        <div class="summary-item"><span>Date & Slot:</span> <strong>${data.date} at ${data.time}</strong></div>
        <div class="summary-item"><span>Demo Estimate:</span> <strong>${data.price}</strong></div>
        <div class="summary-item"><span>Status:</span> <span class="status-badge confirmed">Demo Confirmed</span></div>
      </div>

      <div style="font-size: 0.8rem; color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 0.6rem; border-radius: 6px; margin-bottom: 1.5rem;">
        ⚠️ Front-end demo notice: This appointment is recorded in your browser demo session and is not connected to a live production database.
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="user-dashboard.html" class="btn btn-primary">Go to User Dashboard</a>
        <button id="closeConfirmModal" class="btn btn-secondary">Close & New Booking</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');

  modal.querySelector('#closeConfirmModal').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.getElementById('appointmentBookingForm')?.reset();
  });
}

/* ==========================================================================
   7. Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const phone = document.getElementById('contactPhone');
    const message = document.getElementById('contactMessage');

    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      isValid = false;
    } else name.classList.remove('is-invalid');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.classList.add('is-invalid');
      isValid = false;
    } else email.classList.remove('is-invalid');

    const cleanPhone = phone.value.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      phone.classList.add('is-invalid');
      isValid = false;
    } else phone.classList.remove('is-invalid');

    if (!message.value.trim() || message.value.trim().length < 10) {
      message.classList.add('is-invalid');
      isValid = false;
    } else message.classList.remove('is-invalid');

    if (!isValid) {
      showToast('Please fill out all fields accurately.', 'error');
      return;
    }

    showToast('Thank you! Your message has been received (Front-end Demo).', 'success');
    form.reset();
  });
}

/* ==========================================================================
   8. Authentication (Login & Register)
   ========================================================================== */
function initAuthForms() {
  // Password Visibility Toggle
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = '👁️';
        } else {
          input.type = 'password';
          btn.textContent = '🔒';
        }
      }
    });
  });

  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Demo autofill pills
    const fillUserBtn = document.getElementById('btnFillUser');
    const fillAdminBtn = document.getElementById('btnFillAdmin');

    if (fillUserBtn) {
      fillUserBtn.addEventListener('click', () => {
        document.getElementById('loginEmail').value = 'alex.driver@example.com';
        document.getElementById('loginPassword').value = 'UserPass123!';
        document.getElementById('loginRole').value = 'user';
      });
    }

    if (fillAdminBtn) {
      fillAdminBtn.addEventListener('click', () => {
        document.getElementById('loginEmail').value = 'admin@autoshine.com';
        document.getElementById('loginPassword').value = 'AdminSecret99!';
        document.getElementById('loginRole').value = 'admin';
      });
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      const role = document.getElementById('loginRole').value;

      if (!email || !password) {
        showToast('Please enter both email and password.', 'error');
        return;
      }

      showToast(`Welcome back! Logging in as ${role}...`, 'success');
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'user-dashboard.html';
        }
      }, 700);
    });
  }

  // Registration Form
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('regName');
      const email = document.getElementById('regEmail');
      const phone = document.getElementById('regPhone');
      const pass = document.getElementById('regPassword');
      const confirmPass = document.getElementById('regConfirmPassword');
      const role = document.getElementById('regRole');

      if (!name.value.trim()) { name.classList.add('is-invalid'); isValid = false; }
      else name.classList.remove('is-invalid');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) { email.classList.add('is-invalid'); isValid = false; }
      else email.classList.remove('is-invalid');

      if (phone.value.replace(/\D/g, '').length !== 10) { phone.classList.add('is-invalid'); isValid = false; }
      else phone.classList.remove('is-invalid');

      if (!pass.value || pass.value.length < 6) { pass.classList.add('is-invalid'); isValid = false; }
      else pass.classList.remove('is-invalid');

      if (pass.value !== confirmPass.value) { confirmPass.classList.add('is-invalid'); isValid = false; }
      else confirmPass.classList.remove('is-invalid');

      if (!isValid) {
        showToast('Please correct form validation errors.', 'error');
        return;
      }

      showToast('Registration successful! Redirecting...', 'success');
      setTimeout(() => {
        if (role.value === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'user-dashboard.html';
        }
      }, 800);
    });
  }
}

/* ==========================================================================
   9. User Dashboard
   ========================================================================== */
function initUserDashboard() {
  const userDash = document.querySelector('.user-dashboard-page');
  if (!userDash) return;

  // Sidebar Tab Switching
  const links = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-tab]');
  const tabs = document.querySelectorAll('.dashboard-tab-content');

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => t.style.display = 'none');

      link.classList.add('active');
      const target = document.getElementById(link.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });

  // Render Saved Bookings
  renderUserAppointments();

  // Cancel Booking prompt
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-cancel-booking')) {
      const ref = e.target.dataset.ref;
      if (confirm(`Are you sure you want to cancel appointment ${ref}? (Front-end demo)`)) {
        let bookings = JSON.parse(localStorage.getItem('autoshine_bookings') || '[]');
        bookings = bookings.filter(b => b.ref !== ref);
        localStorage.setItem('autoshine_bookings', JSON.stringify(bookings));
        showToast(`Appointment ${ref} cancelled successfully.`, 'info');
        renderUserAppointments();
      }
    }
  });
}

function renderUserAppointments() {
  const container = document.getElementById('userAppointmentsList');
  if (!container) return;

  const defaultBookings = [
    {
      ref: 'ASH-849201',
      name: 'Alex Mercer',
      vehicle: 'Porsche 911 Carrera (Coupe)',
      service: 'Ceramic Coating 9H',
      package: 'Ultimate Protection',
      date: '2026-10-22',
      time: '10:00 AM',
      price: '$599',
      status: 'Confirmed'
    },
    {
      ref: 'ASH-329482',
      name: 'Alex Mercer',
      vehicle: 'BMW M3 Competition (Sedan)',
      service: 'Paint Correction & Interior Deep Clean',
      package: 'Premium Detail',
      date: '2026-10-18',
      time: '02:30 PM',
      price: '$249',
      status: 'In Progress'
    }
  ];

  const stored = JSON.parse(localStorage.getItem('autoshine_bookings') || '[]');
  const allBookings = [...stored, ...defaultBookings];

  container.innerHTML = allBookings.map(b => `
    <div class="service-card" style="padding: 1.5rem; margin-bottom: 1.2rem; background: var(--bg-card);">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <div>
          <span style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--red-primary); font-weight: 800;">REF: ${b.ref}</span>
          <h3 style="font-size: 1.3rem; margin: 0.2rem 0;">${b.package || b.service}</h3>
          <p style="margin: 0; font-size: 0.9rem; color: var(--silver-light);">Vehicle: <strong>${b.vehicle}</strong></p>
        </div>
        <span class="status-badge ${b.status.toLowerCase().includes('confirm') ? 'confirmed' : 'progress'}">${b.status}</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.88rem; color: var(--silver-mid); border-top: 1px solid var(--border-subtle); padding: 0.8rem 0; margin-bottom: 1rem;">
        <div>📅 <strong>${b.date}</strong></div>
        <div>⏰ <strong>${b.time}</strong></div>
        <div>💰 Demo Est: <strong style="color: #fff;">${b.price}</strong></div>
      </div>
      <div style="display: flex; gap: 0.8rem; justify-content: flex-end;">
        <button class="btn btn-secondary btn-sm" onclick="alert('Viewing full inspection checklist and vehicle handover status for Ref: ${b.ref}')">View Details</button>
        <button class="btn btn-outline-red btn-sm btn-cancel-booking" data-ref="${b.ref}">Cancel Booking</button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   10. Admin Dashboard
   ========================================================================== */
function initAdminDashboard() {
  const adminDash = document.querySelector('.admin-dashboard-page');
  if (!adminDash) return;

  // Sidebar Tab Switching
  const links = document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-tab]');
  const tabs = document.querySelectorAll('.dashboard-tab-content');

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => t.style.display = 'none');

      link.classList.add('active');
      const target = document.getElementById(link.dataset.tab);
      if (target) target.style.display = 'block';
    });
  });

  // Demo status toggler
  document.addEventListener('change', (e) => {
    if (e.target.matches('.admin-status-select')) {
      const select = e.target;
      const newStatus = select.value;
      showToast(`Appointment status updated to ${newStatus} (Demo)`, 'success');
    }
  });

  // Demo record deletion confirmation
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-admin-delete')) {
      const item = e.target.dataset.item || 'record';
      if (confirm(`Are you sure you want to permanently delete this ${item}?`)) {
        const row = e.target.closest('tr');
        if (row) {
          row.style.opacity = '0';
          setTimeout(() => row.remove(), 300);
          showToast(`${item} deleted successfully.`, 'info');
        }
      }
    }
  });
}

/* ==========================================================================
   11. Newsletter Form
   ========================================================================== */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input || !emailRegex.test(input.value.trim())) {
      showToast('Please enter a valid email for newsletter subscription.', 'error');
      return;
    }

    showToast('Subscribed! Check your inbox for exclusive car care tips.', 'success');
    input.value = '';
  });
}

/* ==========================================================================
   12. FAQ Accordions
   ========================================================================== */
function initFaqAccordions() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ==========================================================================
   13. Multi-Theme Engine & Switcher (Stackly Mint, Red Racing, Monaco Gold, Cyber Ice)
   ========================================================================== */
function initThemeSwitcher() {
  const savedTheme = localStorage.getItem('autoshine_theme') || 'stackly-mint';
  applyTheme(savedTheme, false);

  // Create floating theme HUD if not already present
  if (!document.querySelector('.theme-hud-bar')) {
    const hud = document.createElement('div');
    hud.className = 'theme-hud-bar';
    hud.setAttribute('role', 'region');
    hud.setAttribute('aria-label', 'Theme Selector');
    hud.innerHTML = `
      <span class="theme-hud-label">🎨 Finish</span>
      <div class="theme-hud-swatches">
        <button class="theme-swatch-btn swatch-mint ${savedTheme === 'stackly-mint' ? 'active' : ''}" data-theme="stackly-mint" title="Stackly Mint (Signature)"></button>
        <button class="theme-swatch-btn swatch-red ${savedTheme === 'red-racing' ? 'active' : ''}" data-theme="red-racing" title="Red Racing (Track)"></button>
        <button class="theme-swatch-btn swatch-gold ${savedTheme === 'luxury-gold' ? 'active' : ''}" data-theme="luxury-gold" title="Monaco Gold (Luxury)"></button>
        <button class="theme-swatch-btn swatch-cyan ${savedTheme === 'cyber-titanium' ? 'active' : ''}" data-theme="cyber-titanium" title="Cyber Ice (Hypercar)"></button>
      </div>
    `;
    document.body.appendChild(hud);

    hud.querySelectorAll('.theme-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        applyTheme(theme, true);
        hud.querySelectorAll('.theme-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
}

function applyTheme(themeName, showNotification = true) {
  document.documentElement.setAttribute('data-theme', themeName);
  document.body.setAttribute('data-theme', themeName);
  localStorage.setItem('autoshine_theme', themeName);

  if (showNotification) {
    const names = {
      'stackly-mint': 'Stackly Mint (Signature)',
      'red-racing': 'Obsidian Red Racing',
      'luxury-gold': 'Monaco Luxury Gold',
      'cyber-titanium': 'Cyber Ice Titanium'
    };
    showToast(`Theme Engaged: ${names[themeName] || themeName}`, 'info');
  }
}

/* ==========================================================================
   14. Interactive Gloss & Telemetry Simulator
   ========================================================================== */
function initGlossTelemetry() {
  const buttons = document.querySelectorAll('.telemetry-btn');
  const scoreEl = document.getElementById('glossScoreVal');
  const scaleFill = document.getElementById('glossScaleFill');
  const glossModeTitle = document.getElementById('glossModeTitle');
  const glossModeDesc = document.getElementById('glossModeDesc');
  const dropletEl = document.getElementById('dropletCircle');
  const contactAngleEl = document.getElementById('contactAngleVal');

  if (!buttons.length || !scoreEl) return;

  const modes = {
    'raw': {
      score: '64.2',
      unit: 'GU',
      fill: '45%',
      title: 'Raw / Unprotected Clear Coat',
      desc: 'Moderate gloss with heavy micro-marring, wash swirls, and zero chemical protection. Water sheets flat and pools onto surfaces.',
      angle: '42° Flat Sheet'
    },
    'polish': {
      score: '91.8',
      unit: 'GU',
      fill: '82%',
      title: 'Stage-2 Jeweled Machine Polish',
      desc: '95%+ swirl elimination, deep optical reflection, wet-look depth, and micro-contaminant leveling under high-CRI inspection.',
      angle: '85° Water Shedding'
    },
    'ceramic': {
      score: '99.8',
      unit: 'GU',
      fill: '99%',
      title: '9H Nano-Diamond Ceramic Matrix',
      desc: 'Extreme glass reflectivity with hydrophobic self-cleaning tension. Water beads roll off at 115° contact angles carrying road dirt away.',
      angle: '115° Pearl Bead'
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modeKey = btn.dataset.mode;
      const data = modes[modeKey];
      if (!data) return;

      scoreEl.textContent = data.score;
      if (scaleFill) scaleFill.style.width = data.fill;
      if (glossModeTitle) glossModeTitle.textContent = data.title;
      if (glossModeDesc) glossModeDesc.textContent = data.desc;
      if (contactAngleEl) contactAngleEl.textContent = data.angle;

      if (dropletEl) {
        if (modeKey === 'raw') {
          dropletEl.style.borderRadius = '20% 20% 50% 50%';
          dropletEl.style.transform = 'scaleY(0.4)';
        } else if (modeKey === 'polish') {
          dropletEl.style.borderRadius = '40% 40% 50% 50%';
          dropletEl.style.transform = 'scale(0.85)';
        } else {
          dropletEl.style.borderRadius = '50%';
          dropletEl.style.transform = 'scale(1.1)';
        }
      }
    });
  });
}

/* ==========================================================================
   14. Global Scroll Reveal & Stat Counter Animations
   ========================================================================== */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.feature-box, .pricing-card, .service-card, .trust-card, .review-card, ' +
    '.gallery-item, .ba-container, .step-card, .cert-card, .booking-form-card, ' +
    '.section-header, .stat-item, .process-step, .tech-chamfer'
  );

  if (!targets.length) return;

  // Accessibility check: Reveal immediately if reduced motion is preferred or IntersectionObserver unsupported
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  targets.forEach(el => {
    el.classList.add('reveal-on-scroll');
    // Stagger siblings in grids
    const parent = el.parentElement;
    if (parent) {
      const idx = Array.from(parent.children).indexOf(el);
      if (idx > 0 && idx < 8) {
        el.style.transitionDelay = `${(idx % 4) * 0.08}s`;
      }
    }
    observer.observe(el);
  });
}

function initStatCounters() {
  const stats = document.querySelectorAll('.stat-item h3, .stats-two-col h3, .stats-4-col h3, .hero-stats h3');
  if (!stats.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  stats.forEach(stat => observer.observe(stat));

  function animateCounter(el) {
    const raw = el.textContent.trim();
    // Match pattern like "3,500+", "99.8%", "100%", "48 GU", "12+", "< 2.5 µm"
    const match = raw.match(/^([<+]?\s*)([\d,]+(\.\d+)?)(\s*.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const numericStr = match[2].replace(/,/g, '');
    const targetNum = parseFloat(numericStr);
    const suffix = match[4] || '';
    const isDecimal = numericStr.includes('.');
    const decimalPlaces = isDecimal ? numericStr.split('.')[1].length : 0;
    const duration = 1400; // 1.4s
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * ease;

      const formatted = isDecimal
        ? current.toFixed(decimalPlaces)
        : Math.floor(current).toLocaleString();

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = raw; // Restore original formatting exactly
      }
    }

    requestAnimationFrame(tick);
  }
}


