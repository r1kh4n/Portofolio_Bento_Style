/* =========================================
   script.js — Shubhadip Bhowmik Bento Profile
   ========================================= */

// ─── Dark Mode Toggle ────────────────────────────────────────
(function initTheme() {
  const html      = document.documentElement;
  const btn       = document.getElementById('themeToggle');
  const icon      = document.getElementById('themeIcon');
  const STORAGE_KEY = 'theme-preference';

  // Restore saved preference (or default to light)
  const saved = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.className = 'bi bi-moon-stars-fill';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
})();


// ─── Copy Profile Link ────────────────────────────────────────
(function initCopyLink() {
  const btn      = document.getElementById('copyLinkBtn');
  const textEl   = document.getElementById('copyLinkText');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      textEl.textContent = '✓ Link Copied!';
      btn.style.color         = 'var(--accent)';
      btn.style.borderColor   = 'var(--accent)';

      setTimeout(() => {
        textEl.textContent      = 'Copy Profile Link';
        btn.style.color         = '';
        btn.style.borderColor   = '';
      }, 2500);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      textEl.textContent = '✓ Copied!';
      setTimeout(() => { textEl.textContent = 'Copy Profile Link'; }, 2500);
    }
  });
})();


// ─── Newsletter Form Validation ───────────────────────────────
(function initNewsletter() {
  const form       = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const successEl  = document.getElementById('newsletterSuccess');
  if (!form) return;

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = emailInput.value.trim();

    // Clear previous state
    successEl.textContent = '';
    emailInput.style.borderColor = '';

    if (!val) {
      showError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(val)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Simulate successful subscribe
    showSuccess('🎉 You\'re subscribed! Welcome aboard.');
    emailInput.value = '';

    // Reset after a while
    setTimeout(() => { successEl.textContent = ''; }, 5000);
  });

  function showError(msg) {
    successEl.textContent    = msg;
    successEl.style.color    = 'rgba(255,255,255,0.8)';
    emailInput.style.borderColor = 'rgba(255,200,100,0.7)';
  }

  function showSuccess(msg) {
    successEl.textContent    = msg;
    successEl.style.color    = 'rgba(255,255,255,1)';
    emailInput.style.borderColor = '';
  }
})();


// ─── Smooth Hover Tilt on Cards ───────────────────────────────
(function initCardTilt() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -4;
      const tiltY  = dx *  4;

      card.style.transform =
        `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ─── Link Items Ripple Effect ─────────────────────────────────
(function initRipple() {
  document.querySelectorAll('.link-item').forEach(el => {
    el.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left  - size / 2;
      const y      = e.clientY - rect.top   - size / 2;

      Object.assign(ripple.style, {
        position:     'absolute',
        width:        `${size}px`,
        height:       `${size}px`,
        left:         `${x}px`,
        top:          `${y}px`,
        background:   'rgba(99,102,241,0.15)',
        borderRadius: '50%',
        transform:    'scale(0)',
        animation:    'rippleAnim 0.5s ease-out forwards',
        pointerEvents:'none',
      });

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject keyframes once
  const style = document.createElement('style');
  style.textContent = `@keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }`;
  document.head.appendChild(style);
})();

