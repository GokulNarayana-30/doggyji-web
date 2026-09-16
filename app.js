document.addEventListener('DOMContentLoaded', () => {
  // ── Exact Doggy Ji Brand Palette ─────────────────────────────────────────────
  const DOGGY_TEAL = '#23C1C3';
  const DOGGY_PURPLE = '#7B1FA2';
  const DOGGY_AMBER = '#FEBB4A';
  const DOGGY_NAVY = '#142C73';
  const DOGGY_RED = '#E53935';
  const DOGGY_GREEN = '#4CAF50';

  // ── Theme Toggle ─────────────────────────────────────────────────────────────
  const themeToggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('doggyji_doc_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeBtnText(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('doggyji_doc_theme', newTheme);
    updateThemeBtnText(newTheme);
    updateChartTheme(newTheme);
  });

  function updateThemeBtnText(theme) {
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  // ── Mobile Menu Toggle ───────────────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileMenuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.textContent = '☰';
      });
    });
  }

  // ── Phone Simulator Tab Switching ───────────────────────────────────────────
  const simTabBtns = document.querySelectorAll('.sim-tab-btn');
  const simViews = document.querySelectorAll('.sim-view');

  simTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      simTabBtns.forEach(b => b.classList.remove('active'));
      simViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-sim');
      const targetView = document.getElementById(targetId);
      if (targetView) targetView.classList.add('active');
    });
  });

  // ── Phone Simulator Interactive Actions (Reactive Demos) ─────────────────────
  // 1. Online / Offline toggle inside provider view
  const simToggleOnlineBtn = document.getElementById('simToggleOnlineBtn');
  const simStatusText = document.getElementById('simStatusText');
  let isOnline = true;

  if (simToggleOnlineBtn && simStatusText) {
    simToggleOnlineBtn.addEventListener('click', () => {
      isOnline = !isOnline;
      if (isOnline) {
        simStatusText.innerHTML = '🟢 Accepting Bookings';
        simStatusText.style.color = '#FFFFFF';
        simToggleOnlineBtn.textContent = 'Pause';
      } else {
        simStatusText.innerHTML = '🔴 Offline / Paused';
        simStatusText.style.color = '#FFA7A6';
        simToggleOnlineBtn.textContent = 'Go Live';
      }
    });
  }

  // 2. Accept / Decline request inside provider view
  const simAcceptBtn = document.getElementById('simAcceptBtn');
  const simDeclineBtn = document.getElementById('simDeclineBtn');
  const simBookingCard = document.getElementById('simBookingCard');
  const simFeedbackMsg = document.getElementById('simFeedbackMsg');

  if (simAcceptBtn && simBookingCard) {
    simAcceptBtn.addEventListener('click', () => {
      simBookingCard.style.display = 'none';
      if (simFeedbackMsg) {
        simFeedbackMsg.style.display = 'block';
        simFeedbackMsg.innerHTML = '✅ Booking Accepted! Bruno & Rahul notified.';
      }
    });
  }

  if (simDeclineBtn && simBookingCard) {
    simDeclineBtn.addEventListener('click', () => {
      simBookingCard.style.display = 'none';
      if (simFeedbackMsg) {
        simFeedbackMsg.style.display = 'block';
        simFeedbackMsg.innerHTML = '❌ Request declined.';
        simFeedbackMsg.style.color = '#FFA7A6';
      }
    });
  }

  // 3. Reorder button inside home view
  const simReorderBtn = document.getElementById('simReorderBtn');
  if (simReorderBtn) {
    simReorderBtn.addEventListener('click', () => {
      simReorderBtn.textContent = '✓ Added to Cart';
      simReorderBtn.style.background = '#4CAF50';
      setTimeout(() => {
        simReorderBtn.textContent = 'Reorder ₹349';
        simReorderBtn.style.background = '';
      }, 2000);
    });
  }

  // ── Filter Pills for 7 Modules ───────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      moduleCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Chart.js Configurations (Using Exact Doggy Ji Colors) ────────────────────
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const getGridColor = () => isDark() ? 'rgba(255, 255, 255, 0.08)' : 'rgba(20, 44, 115, 0.08)';
  const getTextColor = () => isDark() ? '#94A3B8' : '#475569';

  // 1. Radar Chart: App Capabilities Breakdown
  const radarCtx = document.getElementById('radarChart')?.getContext('2d');
  let radarChart;
  if (radarCtx) {
    radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: [
          'E-Commerce & Subs',
          'SOS Blood Bank',
          'Pet Services Hub',
          'Provider Portal',
          'Health Passport',
          'Pet Match & Chat',
          'Paw Points Club'
        ],
        datasets: [{
          label: 'Maturity Score',
          data: [96, 98, 94, 92, 90, 88, 92],
          backgroundColor: 'rgba(35, 193, 195, 0.25)',
          borderColor: DOGGY_TEAL,
          borderWidth: 2.5,
          pointBackgroundColor: DOGGY_AMBER,
          pointBorderColor: '#FFFFFF',
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: getGridColor() },
            grid: { color: getGridColor() },
            pointLabels: {
              color: getTextColor(),
              font: { family: 'Nunito', size: 11, weight: '700' }
            },
            ticks: { display: false, max: 100, min: 0 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // 2. Bar Chart: Provider Monthly Earnings Potential
  const barCtx = document.getElementById('barChart')?.getContext('2d');
  let barChart;
  if (barCtx) {
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Dog Walker', 'Pet Sitter', 'Home Boarding', 'Daycare', 'Pet Trainer', 'Groomer'],
        datasets: [{
          label: 'Avg. Monthly Earnings (₹)',
          data: [24000, 32000, 48000, 36000, 52000, 42000],
          backgroundColor: [
            DOGGY_TEAL,
            DOGGY_PURPLE,
            DOGGY_AMBER,
            '#3A86FF',
            '#FB8500',
            DOGGY_GREEN
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: getTextColor(), font: { family: 'Nunito', size: 11, weight: '700' } }
          },
          y: {
            grid: { color: getGridColor() },
            ticks: {
              color: getTextColor(),
              font: { family: 'Nunito' },
              callback: (val) => '₹' + (val / 1000) + 'k'
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (item) => ' Monthly: ₹' + item.raw.toLocaleString('en-IN')
            }
          }
        }
      }
    });
  }

  // 3. Doughnut Chart: App User Ecosystem Retention
  const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
  let doughnutChart;
  if (doughnutCtx) {
    doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Daily Food/Treats Reorder',
          'Emergency SOS Blood Bank',
          'Care Services (Walks/Sitting)',
          'Vaccine & Health Tracking',
          'Pet Match & Community'
        ],
        datasets: [{
          data: [35, 15, 25, 15, 10],
          backgroundColor: [
            DOGGY_TEAL,
            DOGGY_RED,
            DOGGY_PURPLE,
            '#3A86FF',
            DOGGY_AMBER
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: getTextColor(),
              font: { family: 'Nunito', size: 11, weight: '700' },
              boxWidth: 12,
              padding: 12
            }
          }
        },
        cutout: '68%'
      }
    });
  }

  function updateChartTheme(theme) {
    const textColor = theme === 'dark' ? '#94A3B8' : '#475569';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(20, 44, 115, 0.08)';

    if (radarChart) {
      radarChart.options.scales.r.pointLabels.color = textColor;
      radarChart.options.scales.r.grid.color = gridColor;
      radarChart.options.scales.r.angleLines.color = gridColor;
      radarChart.update();
    }
    if (barChart) {
      barChart.options.scales.x.ticks.color = textColor;
      barChart.options.scales.y.ticks.color = textColor;
      barChart.options.scales.y.grid.color = gridColor;
      barChart.update();
    }
    if (doughnutChart) {
      doughnutChart.options.plugins.legend.labels.color = textColor;
      doughnutChart.update();
    }
  }

  // ── Tab Switcher for User Journeys ───────────────────────────────────────────
  const tabParent = document.getElementById('tabParent');
  const tabProvider = document.getElementById('tabProvider');
  const flowParent = document.getElementById('flowParent');
  const flowProvider = document.getElementById('flowProvider');

  if (tabParent && tabProvider) {
    tabParent.addEventListener('click', () => {
      tabParent.classList.add('active');
      tabProvider.classList.remove('active');
      flowParent.style.display = 'grid';
      flowProvider.style.display = 'none';
    });

    tabProvider.addEventListener('click', () => {
      tabProvider.classList.add('active');
      tabParent.classList.remove('active');
      flowParent.style.display = 'none';
      flowProvider.style.display = 'grid';
    });
  }

  // ── Interactive Provider Earnings Calculator ─────────────────────────────────
  const serviceTypeSelect = document.getElementById('serviceSelect');
  const hoursRange = document.getElementById('hoursRange');
  const hoursValue = document.getElementById('hoursValue');
  const calcOutput = document.getElementById('calcOutput');

  const hourlyRates = {
    walker: 250,    // ₹250 / walk or hr
    sitter: 500,    // ₹500 / session
    boarding: 800,  // ₹800 / day
    trainer: 750,   // ₹750 / hr
    groomer: 600    // ₹600 / session
  };

  function recalculateEarnings() {
    const hoursPerWeek = parseInt(hoursRange.value, 10);
    const service = serviceTypeSelect.value;
    const rate = hourlyRates[service] || 300;

    hoursValue.textContent = hoursPerWeek + ' hrs / week';
    const monthlyTotal = hoursPerWeek * rate * 4;
    calcOutput.textContent = '₹' + monthlyTotal.toLocaleString('en-IN');
  }

  if (serviceTypeSelect && hoursRange) {
    serviceTypeSelect.addEventListener('change', recalculateEarnings);
    hoursRange.addEventListener('input', recalculateEarnings);
    recalculateEarnings();
  }

  // ── Live Search & Filter for Screen Directory ────────────────────────────────
  const routeSearch = document.getElementById('routeSearch');
  const tableRows = document.querySelectorAll('#routeTableBody tr');

  if (routeSearch) {
    routeSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      tableRows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});
