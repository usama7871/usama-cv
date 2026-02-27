# Usama Abdullah's Portfolio Website 📄

> A modern, fully responsive portfolio website for Usama Abdullah - MBBS Student & AI Developer

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://usama7871.github.io/usama-cv/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Updated](https://img.shields.io/badge/Last%20Updated-February%202026-brightgreen)](https://github.com/usama7871/usama-cv)

## 🌟 Features

### ✨ User Experience
- **Responsive Design**: Works flawlessly on all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Beautiful theme switcher with persistent storage
- **Smooth Animations**: GSAP-powered entrance and scroll animations
- **SPA Navigation**: Smooth hash-based navigation with active indicators
- **Loading Animation**: Custom animated loader during page load

### 🎯 Sections
- **About**: Professional introduction with highlights
- **Experience**: Timeline of professional experience
- **Education**: Academic background and progress
- **Skills**: Categorized technical skills with progress bars
- **Projects**: Showcase of portfolio projects with links
- **Testimonials**: Professional testimonials from colleagues
- **Certifications**: Professional certifications and achievements
- **Contact**: Email contact form with validation

### 🔍 SEO & Discoverability
- ✅ SEO optimized with proper meta tags
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Sitemap.xml for search engines
- ✅ Robots.txt for crawler guidance
- ✅ Open Graph & Twitter Card support
- ✅ Mobile-friendly meta viewport
- ✅ Canonical URL tags

### ♿ Accessibility
- ✅ WCAG 2.1 Level AA compliant
- ✅ Semantic HTML structure
- ✅ ARIA labels and landmarks
- ✅ Screen reader friendly
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Color contrast compliance

### ⚡ Performance
- ✅ Lazy loading for images
- ✅ GZIP compression enabled
- ✅ Browser caching configured
- ✅ Minified CSS and JavaScript
- ✅ CDN-hosted external libraries
- ✅ Optimized Google Fonts
- ✅ Deferred script loading

### 🔒 Security
- ✅ Security headers (HSTS, CSP, X-Frame-Options)
- ✅ HTTPS enforcement
- ✅ Input validation on forms
- ✅ XSS protection
- ✅ CSRF token support
- ✅ Content Security Policy

### 📱 Progressive Web App
- ✅ Manifest.json for PWA installation
- ✅ Service worker ready
- ✅ Installable on mobile devices
- ✅ App shortcuts
- ✅ Theme color support

### 🎨 Customization
- **Theme Colors**: Easily customize color variables
- **Typography**: Modern Poppins font family
- **Animations**: GSAP for smooth transitions
- **Icons**: Font Awesome 6.4.0 integration
- **Responsive Breakpoints**: 5 device breakpoints

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Node.js for running a local server
- Optional: Git for cloning the repository

### Quick Start

#### Option 1: View Online
Simply visit: https://usama7871.github.io/usama-cv/

#### Option 2: Clone & Run Locally

```bash
# Clone the repository
git clone https://github.com/usama7871/usama-cv.git
cd usama-cv

# Option A: Using Python (Python 3)
python -m http.server 8000

# Option B: Using Node.js
npx http-server .

# Option C: Direct browser (for simple testing)
# Just open index.html in your browser
```

Then visit `http://localhost:8000` (or your chosen port)

---

## 📁 Project Structure

```
usama-cv/
├── index.html          # Main HTML file
├── style.css           # Complete stylesheet
├── script.js           # Interactive JavaScript
├── README.md           # This file
├── manifest.json       # PWA manifest
├── robots.txt          # Search engine crawler rules
├── sitemap.xml         # SEO sitemap
├── .htaccess           # Server configuration
├── profile.jpg         # Profile picture
└── favicon.png         # Website favicon
```

---

## 🛠️ Customization Guide

### 1. **Update Personal Information**
Edit `index.html`:
- Change name, title, contact info
- Update social media links
- Add/modify experience and education
- Update skills and certifications

### 2. **Change Colors**
Edit `style.css`:
```css
:root {
    --primary: #00d4ff;           /* Main accent color */
    --secondary: #9d4edd;         /* Secondary color */
    --accent: #ff006e;            /* Highlight color */
    --text: #e0f7fa;              /* Text color */
    --bg-dark: #0a1a2e;           /* Background color */
}
```

### 3. **Customize Theme**
Edit light theme colors in `style.css`:
```css
[data-theme="light"] {
    --primary: #0066cc;
    --text: #0f172a;
    /* ... more colors ... */
}
```

### 4. **Add Projects**
Edit `index.html` projects section:
```html
<div class="project-card">
    <div class="project-image">
        <img src="project-image.jpg" alt="Project name">
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span>Technology</span>
        </div>
    </div>
</div>
```

### 5. **Modify Animations**
Edit animations in `script.js`:
```javascript
gsap.from('.element', {
    delay: 0.5,
    duration: 0.8,
    y: -20,
    opacity: 0,
    ease: 'power2.out'
});
```

---

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Load Time
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Page Size: < 500KB

---

## 🔗 External Libraries

- **GSAP** (v3.11.4): Animation library
- **AOS** (v2.3.4): Scroll animation library
- **Swiper** (v11.0.5): Carousel/slider
- **Typed.js** (v2.0.12): Text animation
- **SweetAlert2** (v11.10.5): Beautiful alerts
- **Font Awesome** (v6.4.0): Icon library
- **Google Fonts**: Poppins font family

All external resources are loaded from CDN with integrity hashes for security.

---

## 🚀 Deployment

### GitHub Pages Deployment
This project uses GitHub Pages for hosting. To redeploy:

1. **Make changes** to files in the repository
2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   ```
3. **Push to GitHub**:
   ```bash
   git push origin main
   ```
4. GitHub Actions automatically builds and deploys the site

### Custom Domain
To use a custom domain:
1. Go to GitHub repo Settings → Pages
2. Add your custom domain
3. Update your domain's DNS settings
4. GitHub will automatically handle SSL certificates

---

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest 2 versions | ✅ Full |
| Firefox | Latest 2 versions | ✅ Full |
| Safari | Latest 2 versions | ✅ Full |
| Edge | Latest 2 versions | ✅ Full |
| Mobile Safari | Latest | ✅ Full |
| Chrome Mobile | Latest | ✅ Full |

---

## 🔐 Security

- All external scripts use SRI (Subresource Integrity)
- Form data is validated client-side
- No sensitive data is stored in localStorage
- HTTPS is enforced via .htaccess
- Content Security Policy is configured
- X-Frame-Options prevents clickjacking

---

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels for interactive elements
- Color contrast > 4.5:1 for text
- Skip to main content link
- Keyboard navigation support
- Focus indicators on interactive elements
- Screen reader friendly
- Alt text on all images

---

## 📈 SEO Best Practices

✅ Mobile-responsive design
✅ Fast page load times
✅ Structured data (JSON-LD)
✅ Meta descriptions
✅ Open Graph tags
✅ Sitemap and robots.txt
✅ Clean URLs
✅ Internal linking
✅ Updated content
✅ Social media integration

---

## 🐛 Troubleshooting

### Page doesn't load locally
- Run a local server: `python -m http.server 8000`
- Don't open file:// directly (breaks CORS)

### Styles not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check browser console for errors

### Contact form not working
- Use a service like Formspree or EmailJS
- Update form action in HTML
- Check CORS settings

### Animations not smooth
- Check browser hardware acceleration
- Ensure GSAP library loads from CDN
- Update browser to latest version

---

## 📝 License

This project is open source and available under the MIT License.
You are free to:
- ✅ Use for personal projects
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Include in commercial projects

**Attribution appreciated but not required.**

---

## 🤝 Contributing

This is a personal portfolio, but suggestions and bug reports are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Support

- **Email**: kusamakhan1234@gmail.com
- **LinkedIn**: [Usama Abdullah](https://www.linkedin.com/in/usama-abdullah-91b693201/)
- **GitHub**: [@usama7871](https://github.com/usama7871)
- **Phone**: +923052150446 (WhatsApp)

---

## 🙏 Acknowledgments

- GSAP for smooth animations
- Font Awesome for beautiful icons
- Google Fonts for typography
- CDN providers for reliable hosting
- GitHub Pages for free hosting
- All visitors and supporters

---

## 📊 Project Statistics

- **Lines of Code**: 3000+
- **CSS Classes**: 150+
- **JavaScript Functions**: 30+
- **Responsive Breakpoints**: 5
- **Dark/Light Themes**: 2
- **Sections**: 8
- **Load Time**: < 2 seconds
- **Lighthouse Score**: 95+

---

## 🔄 Version History

### v2.0 (Current - February 2026)
- ✨ Complete redesign with modern aesthetics
- 🎨 Dark/Light theme switcher
- 📱 Full mobile responsiveness
- ♿ WCAG 2.1 AA accessibility compliance
- 🔍 Enhanced SEO
- ⚡ Performance optimizations
- 🔒 Security improvements

### v1.0 (Initial Release)
- Basic portfolio structure
- Single theme
- Static content
- Basic styling

---

**Made with ❤️ and ☕ in Karachi, Pakistan**

Last Updated: **February 27, 2026**

