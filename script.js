// ============================================
// ENHANCED PORTFOLIO SCRIPT - UI/UX IMPROVEMENTS
// ============================================

// Performance monitoring
const perf = {
    startTime: performance.now(),
    log: (label) => console.log(`⏱️ ${label}: ${performance.now() - perf.startTime}ms`)
};

// Preloader with Enhanced Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    if (!loader) return;
    
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }, 800);
});

// Trigger entrance animations after loading
function triggerEntranceAnimations() {
    if (typeof gsap !== 'undefined') {
        gsap.to('.sidebar', { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        gsap.to('.main-content', { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    }
}

// ============================================
// SIDEBAR TOGGLE & MOBILE NAVIGATION
// ============================================

const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');
const mobileToggleBtn = document.querySelector('.sidebar-toggle-mobile');

function toggleSidebar() {
    const isExpanded = sidebar.classList.toggle('active');
    if (toggleBtn) toggleBtn.classList.toggle('active');
    
    // Update ARIA attributes
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', isExpanded);
    if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', isExpanded);
    
    // Smooth scroll prevention with transition
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    
    // Animate with GSAP if available
    if (typeof gsap !== 'undefined' && isExpanded) {
        gsap.from('.nav-link', {
            x: -20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
}

if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', toggleSidebar);

// Close sidebar on link click for mobile
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            if (toggleBtn) toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============================================
// SMOOTH SCROLLING & NAVIGATION ENHANCEMENTS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) return;
        
        // Calculate scroll offset
        const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
        
        // Animate scroll
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                scrollTo: offsetTop,
                duration: 0.8,
                ease: 'power3.inOut'
            });
        } else {
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
        
        // Update navigation state
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        
        // Update URL
        history.pushState(null, null, `#${targetId}`);
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CV DOWNLOAD WITH ENHANCED UX
// ============================================

const downloadBtn = document.querySelector('.download-btn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', handleDownload);
}

function handleDownload() {
    const btn = downloadBtn;
    const originalHTML = btn.innerHTML;
    
    // Update button state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Preparing...</span>';
    
    // Simulate preparation time
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-cloud-download-alt"></i><span>Downloading...</span>';
        
        // Try to download PDF if library exists
        if (typeof jsPDF !== 'undefined') {
            try {
                generatePDF();
                btn.innerHTML = '<i class="fas fa-check-circle"></i><span>Downloaded!</span>';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
            } catch (error) {
                console.error('PDF generation error:', error);
                handleDownloadFallback();
            }
        } else {
            handleDownloadFallback();
        }
        
        // Reset button
        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 2000);
    }, 800);
}

function generatePDF() {
    try {
        // Get the main content to export
        const element = document.querySelector('.main-content');
        
        if (!element) {
            showNotification('Could not find CV content to download', 'error');
            return;
        }

        // Clone the element to avoid modifying original
        const clone = element.cloneNode(true);
        
        // Remove elements that shouldn't be in PDF
        const elementsToRemove = clone.querySelectorAll(
            '.fab-container, .scroll-top, .sidebar-toggle, .header-actions, ' +
            '.sidebar-toggle-mobile, .theme-toggle, .theme-toggle-mobile, ' +
            '.contact-form'
        );
        elementsToRemove.forEach(el => el.remove());

        // Configure html2pdf options
        const options = {
            margin: [10, 10, 10, 10],
            filename: 'Usama_Abdullah_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        // Generate PDF and download
        html2pdf()
            .set(options)
            .from(clone)
            .save()
            .then(() => {
                showNotification('✅ CV downloaded successfully!', 'success');
            })
            .catch((error) => {
                console.error('PDF generation error:', error);
                showNotification('Failed to generate PDF. Trying alternative method...', 'warning');
                handleDownloadFallback();
            });

    } catch (error) {
        console.error('PDF download error:', error);
        handleDownloadFallback();
    }
}


function handleDownloadFallback() {
    downloadBtn.innerHTML = '<i class="fas fa-file-pdf"></i><span>Print as PDF</span>';
    setTimeout(() => {
        window.print();
    }, 500);
}

// ============================================
// ADVANCED ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================

const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger GSAP animations
            if (typeof gsap !== 'undefined' && !entry.target.animated) {
                entry.target.animated = true;
                
                // Animate header
                const header = entry.target.querySelector('.section-header');
                if (header) {
                    gsap.from(header.querySelector('h2'), {
                        x: -50,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                    gsap.from(header.querySelector('.section-decoration'), {
                        width: 0,
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.2,
                        ease: 'power3.out'
                    });
                }
                
                // Animate cards with stagger
                const cards = entry.target.querySelectorAll('.card, .project-card, .education-card, .certification-badge, .testimonial-card');
                if (cards.length > 0) {
                    gsap.from(cards, {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            }
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ============================================
// GSAP INITIALIZATION & ENTRANCE ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;
    
    // Sidebar entrance
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        gsap.set(sidebar, { x: -100, opacity: 0 });
    }
    
    // Main content entrance
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        gsap.set(mainContent, { opacity: 0 });
    }
    
    // Profile animation
    gsap.from('.profile-pic', {
        delay: 0.7,
        duration: 1,
        y: -40,
        opacity: 0,
        ease: 'back.out'
    });
    
    // Sidebar text animations
    gsap.from('.sidebar h1', {
        delay: 0.85,
        duration: 0.8,
        y: -20,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.tagline', {
        delay: 1,
        duration: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });
    
    // Social links animation
    gsap.from('.social-links a', {
        delay: 1.1,
        duration: 0.6,
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        ease: 'back.out'
    });
    
    // Navigation links animation
    gsap.from('.nav-link', {
        delay: 1.25,
        duration: 0.7,
        x: -30,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.out'
    });
    
    // Download button animation
    gsap.from('.download-btn', {
        delay: 1.5,
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
    });
});

// ============================================
// THEME TOGGLE WITH SMOOTH TRANSITIONS
// ============================================

const themeToggleBtns = document.querySelectorAll('.theme-toggle, .theme-toggle-mobile');

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add rotation animation
    if (typeof gsap !== 'undefined') {
        themeToggleBtns.forEach(btn => {
            gsap.to(btn, {
                rotation: 360,
                duration: 0.6,
                ease: 'power2.inOut'
            });
        });
    }
    
    // Change theme
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icons
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
    });
    
    // Add visual feedback
    document.body.style.transition = 'background-color 0.3s ease';
}

themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
});

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set correct icon
    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            if (savedTheme === 'light') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
            initializeTheme();
        }
    });
}

initializeTheme();

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopBtn = document.querySelector('.scroll-top');
let scrollProgress = 0;

window.addEventListener('scroll', () => {
    // Calculate scroll percentage
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = (window.pageYOffset / windowHeight) * 100;
    
    // Show/hide button
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (typeof gsap !== 'undefined') {
        gsap.to(window, {
            scrollTo: 0,
            duration: 1.2,
            ease: 'power3.inOut'
        });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add ripple effect
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(scrollTopBtn, 
            { scale: 0.9 },
            { scale: 1, duration: 0.3, ease: 'back.out' }
        );
    }
});

// ============================================
// ADVANCED CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            validateField(e.target);
        });
        
        input.addEventListener('blur', (e) => {
            validateField(e.target);
        });
    });
    
    // Character counter for message
    const messageInput = document.getElementById('message');
    if (messageInput) {
        messageInput.addEventListener('input', (e) => {
            const count = e.target.value.length;
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = count;
                
                // Visual feedback
                if (count > 900) {
                    messageInput.style.borderColor = 'var(--warning)';
                } else if (count > 700) {
                    messageInput.style.borderColor = 'var(--success)';
                } else {
                    messageInput.style.borderColor = '';
                }
            }
        });
    }
    
    // Form submission with validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all fields correctly', 'error');
            return;
        }
        
        submitForm();
    });
}

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';
    
    if (field.value.trim() === '') {
        isValid = false;
        errorMessage = `${field.getAttribute('aria-label') || field.placeholder} is required`;
    } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.id === 'message' && field.value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    } else if (field.id === 'name' && field.value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
    }
    
    // Update UI
    field.style.borderColor = isValid ? '' : 'var(--error)';
    if (errorElement) {
        errorElement.textContent = isValid ? '' : errorMessage;
        errorElement.style.color = 'var(--error)';
    }
    
    return isValid;
}

function submitForm() {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formStatus = document.getElementById('form-status');
    const originalHTML = submitBtn.innerHTML;
    
    // Disable and update button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    
    // Simulate API call
    setTimeout(() => {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Log to console (in real app, send to server)
        console.log('Form submitted:', data);
        
        // Show success
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
        
        if (formStatus) {
            formStatus.innerHTML = '<div class="success-message">✓ Thank you! I\'ll get back to you soon.</div>';
            formStatus.style.color = 'var(--success)';
        }
        
        // Animate success state
        if (typeof gsap !== 'undefined') {
            gsap.from(submitBtn, {
                scale: 0.8,
                duration: 0.3,
                ease: 'back.out'
            });
        }
        
        // Reset after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            
            if (formStatus) {
                formStatus.innerHTML = '';
            }
            
            // Reset input borders
            formInputs.forEach(input => {
                input.style.borderColor = '';
                const errorEl = document.getElementById(`${input.id}-error`);
                if (errorEl) errorEl.textContent = '';
            });
        }, 2500);
    }, 1200);
}

function showNotification(message, type = 'info') {
    if (typeof gsap === 'undefined') return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    gsap.from(notification, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'back.out'
    });
    
    setTimeout(() => {
        gsap.to(notification, {
            y: -30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// ============================================
// SKILL BARS ANIMATION WITH COUNTER
// ============================================

const skillBars = document.querySelectorAll('.skill-bar');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    
    skillBars.forEach((bar, index) => {
        const progress = bar.querySelector('.progress');
        const skillInfo = bar.querySelector('.skill-info span:last-child');
        const targetWidth = skillInfo ? skillInfo.textContent : '0';
        const numValue = parseInt(targetWidth);
        
        // Reset to 0
        progress.style.width = '0';
        
        // Animate with stagger
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                // Animate bar width
                gsap.to(progress, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: 'power3.out'
                });
                
                // Animate percentage counter
                if (skillInfo) {
                    gsap.to({ value: 0 }, {
                        value: numValue,
                        duration: 1.5,
                        ease: 'power3.out',
                        onUpdate: function() {
                            skillInfo.textContent = Math.round(this.targets()[0].value) + '%';
                        }
                    });
                }
            } else {
                progress.style.width = targetWidth;
            }
        }, index * 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// ============================================
// INTERACTIVE CARD EFFECTS & HOVER STATES
// ============================================

const allCards = document.querySelectorAll('.project-card, .education-card, .certification-badge, .testimonial-card, .contact-card, .highlight-card');

allCards.forEach(card => {
    // Hover lift effect
    card.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Mouse move effect (3D perspective)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Store for CSS custom properties
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 3;
        const rotateY = ((x - centerX) / centerX) * -3;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - rect.left - radius) + 'px';
    circle.style.top = (event.clientY - rect.top - radius) + 'px';
    circle.classList.add('ripple');
    
    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

const rippleButtons = document.querySelectorAll('.submit-btn, .project-link, .nav-link, .download-btn');
rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============================================
// RESPONSIVE ADJUSTMENTS & ADAPTIVE FEATURES
// ============================================

function handleResponsiveChanges() {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth <= 1024;
    
    // Adjust animations for performance on mobile
    if (isMobile) {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.5s');
    } else if (isTablet) {
        document.documentElement.style.setProperty('--animation-duration', '0.7s');
    } else {
        document.documentElement.style.setProperty('--animation-duration', '0.8s');
    }
}

window.addEventListener('resize', handleResponsiveChanges);
handleResponsiveChanges();

// Debounce resize for better performance
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResponsiveChanges, 250);
});

// ============================================
// DYNAMIC FOOTER YEAR & UTILITY FUNCTIONS
// ============================================

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth color transition for heart icon
setInterval(() => {
    const hearts = document.querySelectorAll('.heart-icon');
    hearts.forEach((heart, index) => {
        if (typeof gsap !== 'undefined') {
            gsap.to(heart, {
                color: index % 2 === 0 ? '#ff4757' : '#1abc9c',
                duration: 0.5,
                repeat: -1,
                yoyo: true
            });
        }
    });
}, 0);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for main links
document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Announce dynamic content changes to screen readers
function announceToScreenReaders(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-9999px';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log performance metrics
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`✅ Portfolio loaded in ${loadTime}ms`);
    }
});

// Report Web Vitals if available
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.value}ms`);
            }
        });
        
        observer.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        console.log('Performance observer not fully supported');
    }
}
