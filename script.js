// Preloader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('fade-out');
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Sidebar Toggle for Mobile
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');
const mobileToggleBtn = document.querySelector('.sidebar-toggle-mobile');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    const isExpanded = sidebar.classList.contains('active');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    mobileToggleBtn.setAttribute('aria-expanded', isExpanded);
    
    // Prevent scrolling when sidebar is open
    if (isExpanded) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

toggleBtn.addEventListener('click', toggleSidebar);
mobileToggleBtn.addEventListener('click', toggleSidebar);

// Close Sidebar on Link Click (Mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        // Scroll to section with offset for fixed header
        const yOffset = -80;
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });

        // Update aria-current for accessibility
        navLinks.forEach(nav => nav.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
        
        // Update URL without page reload
        history.pushState(null, null, `#${targetId}`);
    });
});

// Download CV Button with jsPDF implementation
const downloadBtn = document.querySelector('.download-btn');

downloadBtn.addEventListener('click', () => {
    // Check if jsPDF is available
    if (typeof jsPDF !== 'undefined') {
        // Create a new PDF instance
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(22);
        doc.setTextColor(40, 53, 147);
        doc.text('Usama Abdullah - CV', 105, 20, { align: 'center' });
        
        // Add subtitle
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('MBBS Student & AI Developer', 105, 30, { align: 'center' });
        
        // Add contact information
        doc.setFontSize(12);
        doc.text('Email: kusamakhan1234@gmail.com', 20, 45);
        doc.text('LinkedIn: linkedin.com/in/usama-abdullah', 20, 55);
        doc.text('GitHub: github.com/usama7871', 20, 65);
        doc.text('WhatsApp: +92 305 2150446', 20, 75);
        
        // Add a line separator
        doc.setDrawColor(79, 195, 247);
        doc.setLineWidth(0.5);
        doc.line(20, 80, 190, 80);
        
        // Add sections (simplified for PDF)
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text('About Me', 20, 90);
        
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text('Third-year MBBS student at Al-Tibri Medical College with a strong passion for software', 20, 100);
        doc.text('development, transitioning to focus on AI, machine learning, and technological', 20, 108);
        doc.text('advancements in medicine. Proficient in Python, TypeScript, and various web and app', 20, 116);
        doc.text('development technologies.', 20, 124);
        
        // Save the PDF
        doc.save('usama-abdullah-cv.pdf');
    } else {
        // Fallback if jsPDF is not loaded
        alert('PDF generation is currently unavailable. Please use print (Ctrl+P) to save as PDF for now.');
        console.log('jsPDF not loaded. Consider adding CDN: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px',
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Only run GSAP animations if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Animate sidebar elements
        gsap.from('.profile-pic', {
            duration: 1,
            y: -50,
            opacity: 0,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        gsap.from('.sidebar h1', {
            duration: 1,
            y: -30,
            opacity: 0,
            delay: 0.7,
            ease: 'power3.out'
        });
        
        gsap.from('.nav-link', {
            duration: 0.8,
            x: -30,
            opacity: 0,
            stagger: 0.1,
            delay: 1,
            ease: 'power3.out'
        });
        
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach((header, i) => {
            ScrollTrigger.create({
                trigger: header,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(header.querySelector('h2'), {
                        duration: 0.8,
                        x: -50,
                        opacity: 0,
                        ease: 'power3.out'
                    });
                    
                    gsap.from(header.querySelector('.section-decoration'), {
                        duration: 0.8,
                        width: 0,
                        opacity: 0,
                        delay: 0.3,
                        ease: 'power3.out'
                    });
                }
            });
        });
    }
});

// Theme Toggle Functionality
const themeToggleBtns = document.querySelectorAll('.theme-toggle, .theme-toggle-mobile');

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icons = document.querySelectorAll('.theme-toggle i, .theme-toggle-mobile i');
    icons.forEach(icon => {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
});

// Initialize Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set correct icon
    const icons = document.querySelectorAll('.theme-toggle i, .theme-toggle-mobile i');
    icons.forEach(icon => {
        if (savedTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

initializeTheme();

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        const originalIcon = submitBtn.querySelector('i').className;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Show success state
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.querySelector('i').className = 'fas fa-check';
            submitBtn.style.background = 'linear-gradient(45deg, var(--success), #66bb6a)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.querySelector('i').className = originalIcon;
                submitBtn.style.background = 'linear-gradient(45deg, var(--primary-dark), var(--primary))';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const progress = bar.querySelector('.progress');
        const width = bar.querySelector('.skill-info span:last-child').textContent;
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
}

// Animate skill bars when skills section is in view
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add hover effects to all cards
const cards = document.querySelectorAll('.card, .project-card, .education-card, .contact-card, .highlight-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Initialize tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = el.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        el._tooltip = tooltip;
    });
    
    el.addEventListener('mouseleave', () => {
        if (el._tooltip) {
            el._tooltip.remove();
            delete el._tooltip;
        }
    });
});

// Responsive adjustments
function handleResponsiveChanges() {
    // Adjustments for mobile
    if (window.innerWidth <= 768) {
        // Mobile-specific changes
    } else {
        // Desktop-specific changes
    }
}

window.addEventListener('resize', handleResponsiveChanges);
handleResponsiveChanges();
