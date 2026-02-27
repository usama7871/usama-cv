# Contributing to Usama's Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on improving the project
- Respect intellectual property

## 🐛 Reporting Bugs

Found a bug? Please report it:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### Bug Report Template
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: 
- OS: 
- Device: 

## Screenshots
[If applicable]
```

## 💡 Feature Requests

Have an idea? We'd love to hear it!

1. **Check discussions** for similar ideas
2. **Create a feature request** with:
   - Clear title describing the feature
   - Detailed use case
   - Why it would be beneficial
   - Any UI/UX mockups

### Feature Request Template
```markdown
## Feature Description
[Clear description of the feature]

## Use Case
[Why would this be useful?]

## Proposed Solution
[How should it work?]

## Alternatives
[Any other approaches?]

## Additional Context
[Screenshots, links, references]
```

## 🔧 Making Changes

### Prerequisites
- Git
- Text editor (VS Code recommended)
- Familiarity with HTML, CSS, JavaScript

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/usama-cv.git
   cd usama-cv
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow coding standards (see below)
   - Test thoroughly
   - Keep commits focused and meaningful

4. **Test locally**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Type: Clear, descriptive message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description
   - Reference any related issues
   - Include screenshots for UI changes

## 📝 Commit Message Convention

Follow this format for commit messages:

```
Type: Brief description

Detailed explanation (optional)

Issue: #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `style`: CSS changes
- `perf`: Performance improvement
- `a11y`: Accessibility improvement
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Test changes

**Examples:**
```
feat: Add dark mode toggle
fix: Fix sidebar not collapsing on mobile
style: Update color palette for better contrast
perf: Optimize image loading with lazy loading
docs: Update README with setup instructions
```

## 🎨 Coding Standards

### HTML
- Use semantic HTML5 tags
- Always include alt text on images
- Use proper heading hierarchy (h1, h2, h3...)
- Include ARIA labels for interactive elements
- Keep markup clean and indented

### CSS
- Use variables for colors and sizing
- Follow mobile-first approach
- Organize by component
- Use meaningful class names
- Keep specificity low
- Comment complex sections

### JavaScript
- Use const/let (never var)
- Write descriptive function names
- Keep functions focused and small
- Add comments for complex logic
- Use template literals for strings
- Avoid console.logs in production

### Accessibility
- Maintain color contrast ratio of 4.5:1
- Support keyboard navigation
- Use semantic HTML
- Include alt text on images
- Test with screen readers

### Performance
- Minimize HTTP requests
- Optimize images
- Use CSS instead of JavaScript when possible
- Lazy load non-critical resources
- Cache static assets

## 🧪 Testing

Before submitting a PR:

- [ ] Test on Chrome (desktop)
- [ ] Test on Firefox (desktop)
- [ ] Test on Safari (desktop)
- [ ] Test on mobile (iOS)
- [ ] Test on mobile (Android)
- [ ] Check console for errors
- [ ] Test keyboard navigation
- [ ] Verify with screen reader
- [ ] Check Lighthouse scores

## 📋 Pull Request Process

1. **Create descriptive PR title**
   ```
   feat: Add skill search functionality
   ```

2. **Fill out PR template**
   - Description of changes
   - Related issues
   - Type of change (feature, fix, etc.)
   - Testing done

3. **Keep PR focused**
   - One feature/fix per PR
   - Minimal commits
   - Clean git history

4. **Respond to feedback**
   - Be open to suggestions
   - Make requested changes
   - Keep discussions professional

### PR Template
```markdown
## Description
[Brief description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123
Related to #456

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Accessibility checked

## Screenshots (if UI changes)
[Before and after screenshots]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I've tested my changes
- [ ] I've updated documentation
- [ ] No new warnings generated
```

## 📚 Documentation

### Updating README
- Keep it clear and current
- Include examples
- Add badges for status
- Document all features

### Code Comments
```javascript
// Bad
const x = y + 1; // increment

// Good
// Calculate the next item index for pagination
const nextIndex = currentIndex + 1;
```

## 🚀 Deployment

Changes are automatically deployed to GitHub Pages when merged to main branch.

- Automatic deployment via GitHub Actions
- No manual deployment needed
- Changes live within minutes

## 📞 Getting Help

- **Questions?** Open a discussion
- **Confused?** Check documentation
- **Bug?** Create an issue
- **Idea?** Open a feature request

## 👏 Recognition

Contributors are recognized in:
- Commit history
- GitHub contributors page
- Project documentation

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making this project better! 🎉
