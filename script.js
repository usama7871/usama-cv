// Sidebar Toggle for Mobile
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.sidebar-toggle');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  toggleBtn.setAttribute('aria-expanded', sidebar.classList.contains('active'));
});

// Close Sidebar on Link Click (Mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Update aria-current for accessibility
    navLinks.forEach(nav => nav.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  });
});

// Download CV Button (Placeholder for PDF Generation)
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', () => {
  alert('PDF download functionality is under development. Please use print (Ctrl+P) to save as PDF for now.');
  // Future implementation: Use a library like jsPDF to generate a PDF
  // Example: const { jsPDF } = window.jspdf; const doc = new jsPDF(); doc.html(document.body, { callback: () => doc.save('usama-cv.pdf') });
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

// Dark Mode Toggle (Optional, for future expansion)
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  // Persist preference in localStorage
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Initialize Dark Mode (Optional)
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Add visible class for animations (CSS will handle the effect)
sections.forEach(section => {
  section.classList.add('fade-in');
});
