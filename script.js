// EDITORIAL THEME ANIMATIONS

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 1. Hero Reveal
    const heroTl = gsap.timeline();

    heroTl.from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    })
        .from(".hero-subline", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .from(".hero-intro", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8")
        .from(".scroll-indicator", {
            opacity: 0,
            duration: 1
        }, "-=0.5");


    // 2. Section Headings (Philosophy, Exhibitions, Dialogue)
    gsap.utils.toArray(".section-heading").forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 3. Editorial Text Reveal (About Section)
    if (document.querySelector(".lead-text")) {
        gsap.from(".lead-text", {
            scrollTrigger: {
                trigger: ".lead-text",
                start: "top 80%"
            },
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    }

    // 4. Gallery Items (Staggered or individual)
    const galleryItems = gsap.utils.toArray(".gallery-item");
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // 5. Skills Ticker
    if (document.querySelector(".skills-ticker")) {
        gsap.from(".skills-ticker", {
            scrollTrigger: {
                trigger: ".skills-ticker",
                start: "top 90%"
            },
            opacity: 0,
            x: -50,
            duration: 1.5,
            ease: "power4.out"
        });
    }

    // 6. Contact Form Reveal
    if (document.querySelector(".simple-form")) {
        gsap.from(".simple-form", {
            scrollTrigger: {
                trigger: ".simple-form",
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }

    // 7. Technical Annotation Toggle
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.gallery-item');
            if (item) {
                item.classList.toggle('expanded');
            }
        });
    });

    // Floating Pill Scroll Effect
    const nav = document.querySelector('.navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.padding = '10px 28px';
                nav.style.background = 'rgba(253, 251, 247, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                nav.style.padding = '12px 32px';
                nav.style.background = 'rgba(253, 251, 247, 0.85)';
                nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
            }
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Check localStorage or system preference
        const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (isDark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }

    // Mobile nav toggle - Enhanced
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            // Toggle menu
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('open');
            const expanded = navLinks.classList.contains('open');
            navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');

            // Toggle body scroll
            document.body.style.overflow = expanded ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (ev) => {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(ev.target) &&
                !navToggle.contains(ev.target)) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Update active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu on larger screens
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // Animated Counters
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    const observeCounters = () => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const targetStr = entry.target.getAttribute('data-target');
                    const target = parseInt(targetStr);
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.1 }); // Lower threshold for better reliability

        counters.forEach(counter => {
            // Check if already in view
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            }
            observer.observe(counter);
        });
    };

    // Animate GitHub Stats
    const observeGitHubStats = () => {
        const githubStats = document.querySelectorAll('.stat-value[data-target]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            });
        }, { threshold: 0.5 });

        githubStats.forEach(stat => observer.observe(stat));
    };

    // Skills Progress Bar Animation
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    };

    // Initialize animations
    observeCounters();
    observeGitHubStats();
    animateSkills();

    // Animate new sections
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            x: -50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".testimonial-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".award-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            x: -30,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".blog-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".code-snippet-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray(".github-stat-card").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });
});

// --- CONTACT FORM HANDLER ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbzExL-Rk1pgczoScCLRZ5lCCM1z0HlfqHk7tGrXPBy47siJ0cxQjC0_1_O2ZrL9PAm0/exec'; // Replace this with your /exec URL
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        // Visual feedback for the user
        formMessage.textContent = 'Sending...';
        formMessage.style.color = '#666';

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.style.color = 'green';
                form.reset(); // Clears the form fields

                // Clear success message after 5 seconds
                setTimeout(() => { formMessage.textContent = ''; }, 5000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.textContent = 'Error sending message. Please try again.';
                formMessage.style.color = 'red';
            });
    });
}
