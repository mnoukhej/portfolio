/**
 * ==============================================================================
 * MUHAMMAD NOUKHEZ PORTFOLIO — INTERACTIVE ENGINE
 * Features:
 *  - Neural Constellation Canvas (Particle Network with Mouse Reactivity)
 *  - Typewriter Hero Animation
 *  - Dark / Light Theme Switcher with LocalStorage Memory
 *  - Scroll Reading Progress Bar
 *  - Navbar Scroll & Active Section Highlighting
 *  - Animated Number Counters with IntersectionObserver
 *  - Skills Categorized Live Filtering & Instant Text Search
 *  - Projects Category Filtering & Rich Detail Modal Dialog
 *  - One-Click Copy-to-Clipboard with Toast Notification
 *  - 3D Interactive Card Tilt
 *  - Interactive Contact Form with Validation
 *  - Back-to-Top Button & Mobile Drawer Navigation
 * ==============================================================================
 */

function initAll() {
    initTheme();
    initNeuralCanvas();
    initTypewriter();
    initNavbarAndScroll();
    initCounters();
    initSkillsFilterAndSearch();
    initProjectsFilterAndModal();
    initClipboardCopy();
    init3DTilt();
    initShowcaseSlider();
    initScrollReveal();
    initContactForm();
    initMobileNav();
    updateYear();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

/* --------------------------------------------------------------------------
   1. Dark / Light Theme System
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Retrieve saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'dark'); // default dark for cyber aesthetic
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Nebula Dark' : 'Clean Light'} theme`);
        });
    }
}

/* --------------------------------------------------------------------------
   2. Neural Constellation Canvas (Hero & Ambient Particle Web)
   -------------------------------------------------------------------------- */
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const maxDistance = 140;

    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            this.baseRadius = this.radius;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            // React to mouse proximity
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2.5;
                    this.y -= Math.sin(angle) * force * 2.5;
                    this.radius = this.baseRadius * 1.5;
                } else {
                    this.radius = this.baseRadius;
                }
            }
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.65)' : 'rgba(2, 132, 199, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect lines between nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const opacity = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.12);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isDark ? `rgba(6, 182, 212, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   3. Typewriter Hero Animation
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const phrases = [
        "FastAPI & High-Throughput APIs",
        "Full-Stack Website Development",
        "React.js & Interactive Frontends",
        "Node.js & Scalable Microservices",
        "Generative AI & LLM Solutions",
        "Production Python Architecture",
        "Computer Vision & YOLO Pipelines"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at completion
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   4. Navbar Scroll, Reading Progress & Active Links
   -------------------------------------------------------------------------- */
function initNavbarAndScroll() {
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Progress bar
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercent}%`;
        }

        // Navbar shadow on scroll
        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top button
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active link highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. Animated Number Counters
   -------------------------------------------------------------------------- */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const duration = 1600; // ms
                    const stepTime = Math.max(Math.floor(duration / target), 30);

                    const timer = setInterval(() => {
                        count += 1;
                        counter.textContent = count;
                        if (count >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsRibbon = document.querySelector('.stats-ribbon');
    if (statsRibbon) {
        observer.observe(statsRibbon);
    }
}

/* --------------------------------------------------------------------------
   6. Skills Categorized Filtering & Real-time Text Search
   -------------------------------------------------------------------------- */
function initSkillsFilterAndSearch() {
    const filterButtons = document.querySelectorAll('.skills-filter-nav .filter-btn');
    const searchInput = document.getElementById('skill-search-input');
    const skillTiles = document.querySelectorAll('.skills-cards-grid .skill-tile');

    let currentCategory = 'all';
    let searchQuery = '';

    function filterSkills() {
        skillTiles.forEach(tile => {
            const category = tile.getAttribute('data-category');
            const tileName = tile.querySelector('.tile-name')?.textContent.toLowerCase() || '';
            const tileDesc = tile.querySelector('.tile-desc')?.textContent.toLowerCase() || '';

            const matchesCategory = (currentCategory === 'all' || category === currentCategory);
            const matchesSearch = !searchQuery || tileName.includes(searchQuery) || tileDesc.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                tile.classList.remove('hidden');
            } else {
                tile.classList.add('hidden');
            }
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            filterSkills();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterSkills();
        });
    }
}

/* --------------------------------------------------------------------------
   7. Projects Filter Tabs & Interactive Modal System
   -------------------------------------------------------------------------- */
function initProjectsFilterAndModal() {
    const filterButtons = document.querySelectorAll('.projects-filter-nav .proj-filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Project Details Data
    const projectDatabase = {
        cbc: {
            title: "Complete Blood Count & Cell Detection System",
            category: "Medical AI & Computer Vision",
            image: "assets/project_cbc.jpg",
            accuracy: "98.5% Detection Accuracy",
            summary: "A cutting-edge automated hematology analysis platform engineered with YOLOv8. The model accurately identifies, counts, and classifies micro-cellular blood smear components including Red Blood Cells (RBCs), White Blood Cells (WBCs: Neutrophils, Lymphocytes, Monocytes), and Platelets.",
            architecture: [
                "YOLOv8 custom-trained convolutional vision backbone on high-resolution microscopic blood smear imagery.",
                "Real-time bounding box prediction and morphological cell categorization.",
                "Integrated automated reporting pipeline calculating Complete Blood Count indices and flagging potential anomalies.",
                "Streamlit and Flask interactive diagnostic interface for clinical laboratory technicians."
            ],
            techStack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "Streamlit", "NumPy", "Matplotlib"]
        },
        malaria: {
            title: "Deep Learning Malaria Parasite Detection",
            category: "Healthcare Diagnostic AI",
            image: "assets/project_malaria.jpg",
            accuracy: "96.5% Parasite Sensitivity",
            summary: "An automated microscopic screening solution designed to detect Plasmodium-infected erythrocytes in Giemsa-stained thin blood smears. The system addresses critical diagnostic delays in rural and emergency clinics.",
            architecture: [
                "Deep Convolutional Neural Network (CNN) architecture with transfer learning.",
                "Advanced image preprocessing pipeline: stain normalization, contrast enhancement, and watershed cell segmentation.",
                "Quantitative parasitemia percentage measurement to evaluate disease severity.",
                "REST API service built with Flask facilitating integration with laboratory information systems (LIS)."
            ],
            techStack: ["Python", "TensorFlow", "Keras", "Flask", "Scikit-image", "Docker"]
        },
        cancer: {
            title: "Mammogram Breast Cancer Lesion Detection",
            category: "Oncological Computer Vision",
            image: "assets/project_cancer.jpg",
            accuracy: "High Sensitivity Lesion Localization",
            summary: "A high-precision machine learning computer vision pipeline designed to analyze full-field digital mammography (FFDM) scans to detect suspicious microcalcifications and malignant soft tissue masses at early stages.",
            architecture: [
                "Dual-view mammography network processing both Cranio-Caudal (CC) and Medio-Lateral Oblique (MLO) orientations.",
                "Grad-CAM visual heatmap generation highlighting suspect radiological regions for clinician verification.",
                "DICOM standard image parsing and dynamic bit-depth normalization.",
                "Strict sensitivity thresholds designed to minimize false negatives in preliminary radiological screening."
            ],
            techStack: ["Python", "PyTorch", "ResNet / EfficientNet", "pydicom", "OpenCV", "Scikit-learn"]
        },
        genai: {
            title: "Azure OpenAI Enterprise Knowledge & Workflow Assistant",
            category: "Generative AI & LLM Orchestration",
            image: "assets/project_genai.jpg",
            accuracy: "Enterprise Production Grade",
            summary: "An enterprise-grade Generative AI platform harnessing Azure OpenAI models (GPT-4 / GPT-3.5) with Retrieval-Augmented Generation (RAG) to provide automated business intelligence, natural language document querying, and autonomous agent workflows.",
            architecture: [
                "Vector embedding pipeline converting enterprise documentation into high-dimensional semantic vectors.",
                "Hybrid search orchestration combining dense semantic vector retrieval with BM25 lexical keyword matching.",
                "Prompt guardrails and context window optimization to enforce compliance and prevent hallucinations.",
                "Flask RESTful gateway handling asynchronous agent tasks and streaming token responses to frontend clients."
            ],
            techStack: ["Python", "Azure OpenAI Service", "LangChain", "Vector Embeddings", "Flask API", "Redis"]
        }
    };

    const modalBackdrop = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close');

    function openModal(projectId) {
        const project = projectDatabase[projectId];
        if (!project || !modalContent) return;

        modalContent.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-hero-img">
            <span class="project-badge-success">${project.accuracy}</span>
            <h3 class="modal-title">${project.title}</h3>
            <p class="modal-subtitle">${project.category}</p>

            <div class="modal-section">
                <h4>System Overview</h4>
                <p>${project.summary}</p>
            </div>

            <div class="modal-section">
                <h4>Key Technical Highlights & Architecture</h4>
                <ul>
                    ${project.architecture.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h4>Technologies & Tools</h4>
                <div class="project-stack">
                    ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>

            <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="https://github.com/mnoukhej" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
                    <i class="fab fa-github"></i> View GitHub Profile
                </a>
                <a href="#contact" onclick="document.getElementById('project-modal').classList.remove('active');" class="btn btn-outline btn-sm">
                    <i class="fas fa-envelope"></i> Discuss This Project
                </a>
            </div>
        `;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Modal open buttons
    document.querySelectorAll('.modal-open-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = button.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
            closeModal();
        }
    });
}

/* --------------------------------------------------------------------------
   8. One-Click Copy-to-Clipboard & Toast System
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
    const copyTriggers = document.querySelectorAll('[data-copy]');

    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const textToCopy = trigger.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to clipboard: ${textToCopy}`);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast(`Copied: ${textToCopy}`);
            });
        });
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* --------------------------------------------------------------------------
   9. 3D Tilt Effect on Hero Card
   -------------------------------------------------------------------------- */
function init3DTilt() {
    const card = document.getElementById('hero-card-3d');
    if (!card || window.innerWidth < 992) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / (rect.height / 2)) * 12;
        const rotateY = (x / (rect.width / 2)) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

/* --------------------------------------------------------------------------
   10. Interactive Contact Form
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const subject = document.getElementById('contact-subject')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Show animation on submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Preparing Message...</span>`;
        }

        setTimeout(() => {
            // Compose mailto as graceful native fallback
            const mailtoUrl = `mailto:mnoukhej@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Contact from Portfolio'}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoUrl;

            if (feedback) {
                feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your email client has been opened. If it didn't open automatically, please reach out directly at <a href="mailto:mnoukhej@gmail.com" style="text-decoration: underline;">mnoukhej@gmail.com</a>.`;
                feedback.className = 'form-feedback success';
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Another Message</span> <i class="fas fa-paper-plane"></i>`;
            }

            showToast("Opening email client...");
            form.reset();
        }, 600);
    });
}

/* --------------------------------------------------------------------------
   11. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

/* --------------------------------------------------------------------------
   12. Current Year in Footer
   -------------------------------------------------------------------------- */
function updateYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* --------------------------------------------------------------------------
   13. Engineering Highlights Interactive Showcase Slider
   -------------------------------------------------------------------------- */
function initShowcaseSlider() {
    const sliderTrack = document.getElementById('slider-track');
    const slides = document.querySelectorAll('.showcase-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const tabs = document.querySelectorAll('.slider-tab');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const progressFill = document.getElementById('slider-progress-fill');
    const sliderContainer = document.getElementById('showcase-slider');

    if (!sliderTrack || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Move slider track
        sliderTrack.style.transform = `translateX(-${currentIndex * 20}%)`;

        // Update active class on slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update active category tab
        tabs.forEach((tab, i) => {
            const isActive = (i === currentIndex);
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive && window.innerWidth <= 768) {
                tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        // Update progress bar
        if (progressFill) {
            const percent = ((currentIndex + 1) / totalSlides) * 100;
            progressFill.style.width = `${percent}%`;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetSlide = parseInt(tab.getAttribute('data-slide-target'), 10);
            if (!isNaN(targetSlide)) {
                goToSlide(targetSlide);
                resetAutoPlay();
            }
        });
    });

    // Keyboard navigation when in viewport
    document.addEventListener('keydown', (e) => {
        const sliderRect = sliderTrack.getBoundingClientRect();
        const isInViewport = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;
        if (isInViewport) {
            if (e.key === 'ArrowRight') {
                goToSlide(currentIndex + 1);
                resetAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                goToSlide(currentIndex - 1);
                resetAutoPlay();
            }
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        } else if (touchEndX > touchStartX + threshold) {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        }
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
    goToSlide(0);
}

/* --------------------------------------------------------------------------
   14. Scroll Reveal Animations & Micro-Motions
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.section-header, .bento-card, .timeline-card, .project-card, .skill-tile, .venture-banner-card, .stat-box, .strength-card, .contact-card'
    );

    targets.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        });

        targets.forEach(el => observer.observe(el));
    } else {
        targets.forEach(el => el.classList.add('is-revealed'));
    }
}
