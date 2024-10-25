// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        window.scrollTo({
            top: targetSection.offsetTop - 50,  // Adjusting offset for better visibility
            behavior: 'smooth'
        });
    });
});

// Floating icons animation (e.g., planets, stars)
const floatingIcons = document.createElement('div');
floatingIcons.classList.add('floating-icons');
document.body.appendChild(floatingIcons);

function createFloatingIcon() {
    const icon = document.createElement('span');
    icon.className = 'floating-icon';
    icon.style.left = Math.random() * 100 + 'vw';
    icon.style.animationDuration = Math.random() * 10 + 5 + 's';
    icon.style.opacity = Math.random() + 0.3;
    icon.style.fontSize = Math.random() * 20 + 10 + 'px';
    floatingIcons.appendChild(icon);

    setTimeout(() => {
        icon.remove();
    }, 15000); // Icons disappear after 15 seconds
}

setInterval(createFloatingIcon, 1000); // Create a floating icon every second

// Space shooting background animation (simple starfield effect)
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

animate();

// Dynamic message in About section (e.g., greeting based on time of day)
const aboutSection = document.getElementById('about');
const greeting = document.createElement('p');
const currentTime = new Date().getHours();

if (currentTime < 12) {
    greeting.textContent = "Good morning! Here's a bit about me.";
} else if (currentTime < 18) {
    greeting.textContent = "Good afternoon! Here's a bit about me.";
} else {
    greeting.textContent = "Good evening! Here's a bit about me.";
}

aboutSection.prepend(greeting);

// Contact section - WhatsApp click functionality
const whatsappLink = document.querySelector('#contact p:nth-child(5) a');
whatsappLink.addEventListener('click', function() {
    const phoneNumber = '03052150446';
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.textContent = '⬆️';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
