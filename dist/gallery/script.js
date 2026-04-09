// ─── Dark Mode Toggle (Sinkron dengan Page 1) ────────────────
(function initTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const STORAGE_KEY = 'theme-preference';

    // Ambil preferensi dari localStorage agar sinkron dengan Page 1
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    applyTheme(saved);

    btn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    });

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            icon.className = 'bi bi-sun-fill';
        } else {
            icon.className = 'bi bi-moon-stars-fill';
        }
    }
})();

// ─── Lightbox Logic ──────────────────────────────────────────
const modal = document.createElement('div');
modal.id = 'image-modal';
const modalImg = document.createElement('img');
modal.appendChild(modalImg);
document.body.appendChild(modal);

const images = document.querySelectorAll('.gallery-item img');

images.forEach(img => {
    img.addEventListener('click', function() {
        modalImg.src = this.src;
        modal.classList.add('active');
    });
});

modal.addEventListener('click', function(e) {
    if (e.target !== modalImg) {
        modal.classList.remove('active');
    }
});
