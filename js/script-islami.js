// ========================================
// JAVASCRIPT - MDTA SHIROTUL JANNAH
// DARK / LIGHT MODE SUPPORT
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            navbar.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // ===== TUTUP MENU SAAT KLIK LINK =====
    document.querySelectorAll('nav a:not(.btn-primary):not(.theme-toggle)').forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });

    // ===== SCROLL SPY =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a:not(.btn-primary):not(.theme-toggle)');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== HIJRI DATE =====
    function getHijriDate() {
        try {
            const today = new Date();
            const hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(today);
            return hijri;
        } catch (e) {
            return 'Bulan Hijriah';
        }
    }

    const hijriElement = document.getElementById('hijriDate');
    if (hijriElement) {
        hijriElement.textContent = '🕌 ' + getHijriDate();
    }

    // ===== LIGHTBOX =====
    function openLightbox(imgSrc) {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        if (lightbox && img) {
            img.src = imgSrc;
            lightbox.classList.add('active');
        }
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }

    // Tutup lightbox dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // ========================================
    // DARK / LIGHT MODE
    // ========================================

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('.theme-text');

        // Cek preferensi dari localStorage
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Terapkan tema awal
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeText) themeText.textContent = 'Terang';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeText) themeText.textContent = 'Gelap';
        }

        // Event klik tombol toggle
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                // Pindah ke Light Mode
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (themeText) themeText.textContent = 'Gelap';
            } else {
                // Pindah ke Dark Mode
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (themeText) themeText.textContent = 'Terang';
            }
        });
    }

    // ===== PREFERENSI SISTEM =====
    // Cek preferensi sistem (opsional)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Jika belum ada preferensi tersimpan, ikuti preferensi sistem
    if (!localStorage.getItem('theme')) {
        if (prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            const themeToggleEl = document.getElementById('themeToggle');
            if (themeToggleEl) {
                const icon = themeToggleEl.querySelector('i');
                const text = themeToggleEl.querySelector('.theme-text');
                if (icon) icon.className = 'fas fa-sun';
                if (text) text.textContent = 'Terang';
            }
        }
    }

    // Dengarkan perubahan preferensi sistem (real-time)
    prefersDark.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                const themeToggleEl = document.getElementById('themeToggle');
                if (themeToggleEl) {
                    const icon = themeToggleEl.querySelector('i');
                    const text = themeToggleEl.querySelector('.theme-text');
                    if (icon) icon.className = 'fas fa-sun';
                    if (text) text.textContent = 'Terang';
                }
            } else {
                document.documentElement.removeAttribute('data-theme');
                const themeToggleEl = document.getElementById('themeToggle');
                if (themeToggleEl) {
                    const icon = themeToggleEl.querySelector('i');
                    const text = themeToggleEl.querySelector('.theme-text');
                    if (icon) icon.className = 'fas fa-moon';
                    if (text) text.textContent = 'Gelap';
                }
            }
        }
    });

    // ===== ANIMASI SCROLL MASUK =====
    const animateItems = document.querySelectorAll('.program-item, .guru-card, .galeri-item, .card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    console.log('🕌 MDTA Shirotul Jannah - Theme Islami loaded successfully!');
});