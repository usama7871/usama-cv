document.addEventListener("DOMContentLoaded", function() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          targetSection.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Highlight the current section in the navigation bar
  const sections = document.querySelectorAll('section');
  const navLi = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
              current = section.getAttribute('id');
          }
      });

      navLi.forEach(li => {
          li.classList.remove('active');
          if (li.getAttribute('href').substring(1) === current) {
              li.classList.add('active');
          }
      });
  });
});
