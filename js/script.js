// ===== HAMBURGER MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            navbar.classList.toggle('open');
            // Ganti icon
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // ===== TUTUP MENU SAAT KLIK LINK =====
    const navLinks = document.querySelectorAll('nav a:not(.btn-primary)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });

    // ===== ACTIVE LINK SCROLL SPY =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a:not(.btn-primary)');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // ===== SMOOTH SCROLL UNTUK SEMUA LINK INTERNAL =====
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

    console.log('MDTA Shirotul Jannah website loaded successfully!');
});