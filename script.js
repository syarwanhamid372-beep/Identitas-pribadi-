/* ================================================================
   SYARWAN HAMID — PORTFOLIO SCRIPT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. TAHUN OTOMATIS DI FOOTER
       ============================================================ */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ============================================================
       2. NAVBAR: SCROLL EFFECT & ACTIVE LINK
       ============================================================ */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar shadow
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        // Scroll-top button
        if (scrollTopBtn) {
            if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
            else scrollTopBtn.classList.remove('visible');
        }
    });

    /* ============================================================
       3. HAMBURGER MENU
       ============================================================ */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ============================================================
       4. THEME TOGGLE (DARK / LIGHT)
       ============================================================ */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (themeIcon) {
                themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }

    /* ============================================================
       5. ROLE ROTATOR (BERANDA)
       ============================================================ */
    const roles = ['Student', 'Creative Learner', 'Future Professional'];
    const roleEl = document.getElementById('roleRotator');
    let roleIndex = 0;

    if (roleEl) {
        setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleEl.style.opacity = 0;
            setTimeout(() => {
                roleEl.textContent = roles[roleIndex];
                roleEl.style.opacity = 1;
            }, 250);
        }, 2500);
        roleEl.style.transition = 'opacity 0.25s';
    }

    /* ============================================================
       6. ANIMASI SAAT SCROLL
       ============================================================ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    /* ============================================================
       7. SCROLL TOP BUTTON
       ============================================================ */
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       8. FILTER KARYA
       ============================================================ */
    const karyaFilterBtns = document.querySelectorAll('[data-filter]');
    const karyaCards = document.querySelectorAll('.karya-card');

    karyaFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            karyaFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            karyaCards.forEach(card => {
                const cat = card.dataset.category;
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ============================================================
       9. FILTER GALERI
       ============================================================ */
    const galeriFilterBtns = document.querySelectorAll('[data-gfilter]');
    const galeriItems = document.querySelectorAll('.galeri-item');

    galeriFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galeriFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.gfilter;

            galeriItems.forEach(item => {
                const type = item.dataset.type;
                if (filter === 'all' || type === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ============================================================
       10. MODAL KARYA
       ============================================================ */
    const modal = document.getElementById('karyaModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', () => {
            modalTitle.textContent = btn.dataset.title || 'Judul Karya';
            modalDesc.textContent = btn.dataset.desc || 'Deskripsi karya.';
            modal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    /* ============================================================
       11. LIGHTBOX GALERI
       ============================================================ */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    /* ============================================================
       12. TESTIMONI SLIDER
       ============================================================ */
    const testiSlides = document.querySelectorAll('.testimoni-slide');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');
    const testiDots = document.getElementById('testiDots');
    let currentSlide = 0;

    if (testiSlides.length > 0) {
        // Buat dots
        if (testiDots) {
            testiSlides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(i));
                testiDots.appendChild(dot);
            });
        }

        function goToSlide(index) {
            testiSlides[currentSlide].classList.remove('active');
            currentSlide = (index + testiSlides.length) % testiSlides.length;
            testiSlides[currentSlide].classList.add('active');

            document.querySelectorAll('.testi-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        if (testiPrev) testiPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
        if (testiNext) testiNext.addEventListener('click', () => goToSlide(currentSlide + 1));

        // Auto-slide
        setInterval(() => goToSlide(currentSlide + 1), 7000);
    }

    /* ============================================================
       13. VALIDASI FORM KONTAK
       ============================================================ */
    const kontakForm = document.getElementById('kontakForm');

    if (kontakForm) {
        kontakForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('nama');
            const email = document.getElementById('email');
            const subjek = document.getElementById('subjek');
            const pesan = document.getElementById('pesan');

            const errNama = document.getElementById('errNama');
            const errEmail = document.getElementById('errEmail');
            const errSubjek = document.getElementById('errSubjek');
            const errPesan = document.getElementById('errPesan');

            let valid = true;

            // Reset
            [nama, email, subjek, pesan].forEach(el => el.classList.remove('error'));
            [errNama, errEmail, errSubjek, errPesan].forEach(el => el.textContent = '');

            if (nama.value.trim().length < 2) {
                nama.classList.add('error');
                errNama.textContent = 'Nama minimal 2 karakter.';
                valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.classList.add('error');
                errEmail.textContent = 'Masukkan email yang valid.';
                valid = false;
            }

            if (subjek.value.trim().length < 3) {
                subjek.classList.add('error');
                errSubjek.textContent = 'Subjek minimal 3 karakter.';
                valid = false;
            }

            if (pesan.value.trim().length < 10) {
                pesan.classList.add('error');
                errPesan.textContent = 'Pesan minimal 10 karakter.';
                valid = false;
            }

            if (!valid) return;

            // Kirim ke WhatsApp
            const waNumber = '6281234567890'; // ===== EDIT NOMOR WA =====
            const waText = encodeURIComponent(
                `Halo, saya ${nama.value}.\n\nEmail: ${email.value}\nSubjek: ${subjek.value}\n\nPesan:\n${pesan.value}`
            );
            window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');

            kontakForm.reset();
        });
    }

    /* ============================================================
       14. CETAK CV
       ============================================================ */
    const printCVBtn = document.getElementById('printCV');
    if (printCVBtn) {
        printCVBtn.addEventListener('click', () => {
            window.print();
        });
    }

    /* ============================================================
       15. CEK KEBERADAAN FILE CV PDF
       ============================================================ */
    const downloadCV = document.getElementById('downloadCV');
    if (downloadCV) {
        downloadCV.addEventListener('click', (e) => {
            // Buka cek apakah file ada; jika tidak, tampilkan pesan
            fetch(downloadCV.href, { method: 'HEAD' })
                .then(res => {
                    if (!res.ok) {
                        e.preventDefault();
                        alert(
                            'File CV PDF belum tersedia.\n\n' +
                            'Silakan simpan file cv.pdf Anda di folder:\n' +
                            'assets/documents/cv.pdf'
                        );
                    }
                })
                .catch(() => {
                    // Abaikan jika tidak bisa dicek (misal offline)
                });
        });
    }

});
