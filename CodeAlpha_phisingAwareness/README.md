# Phishing Awareness Training

A comprehensive, interactive phishing awareness training presentation designed for internship projects and corporate security training.

## Features

### Core Content
- **Phishing Email Recognition**: Learn to identify suspicious emails with real examples
- **Fake Website Identification**: Understand how to spot counterfeit websites
- **Social Engineering Tactics**: Explore psychological manipulation techniques
- **Best Practices**: Essential security habits and safety measures
- **Interactive Quiz**: Test your knowledge with engaging questions

### Interactive Elements
- Responsive design for all devices
- Smooth animations and transitions
- Interactive quiz with immediate feedback
- Click-to-copy code examples
- Modal popups for additional resources
- Newsletter subscription functionality
- Print-friendly sections

### Technical Features
- Modern HTML5 structure
- Professional CSS styling with animations
- Vanilla JavaScript (no dependencies required)
- Mobile-responsive design
- Accessibility considerations
- Performance optimized

## File Structure

```
phising awareness/
|-- index.html          # Main presentation file
|-- styles.css          # Professional styling and animations
|-- script.js           # Interactive functionality and quiz logic
|-- README.md           # This documentation file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start exploring the training materials

### Local Development
For development purposes, you can use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using Live Server in VS Code
# Install Live Server extension and right-click index.html
```

## Navigation

The presentation is organized into the following sections:

1. **Home**: Introduction with phishing statistics
2. **Email Phishing**: Red flags and real examples
3. **Fake Websites**: URL verification and SSL certificates
4. **Social Engineering**: Psychological tactics and prevention
5. **Best Practices**: Security recommendations
6. **Quiz**: Interactive knowledge assessment

## Quiz Features

- **5 comprehensive questions** covering all training topics
- **Immediate feedback** with explanations
- **Progress tracking** with visual indicators
- **Score calculation** and performance messages
- **Answer review** for learning reinforcement
- **Retry functionality** for improvement

## Interactive Elements

### Click Actions
- **Navigation links**: Smooth scrolling between sections
- **Quiz options**: Select answers with visual feedback
- **Code examples**: Click to copy to clipboard
- **Resource links**: Modal popups with additional information
- **Newsletter**: Subscribe to security alerts

### Keyboard Navigation
- **Arrow keys**: Navigate quiz questions
- **Number keys (1-4)**: Select quiz options
- **Escape key**: Close modal windows
- **Tab key**: Navigate through interactive elements

## Customization

### Branding
Update the following in `index.html`:
```html
<div class="nav-logo">
    <i class="fas fa-shield-alt"></i>
    <span>Your Company Name</span>
</div>
```

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --secondary-color: #10b981;  /* Success/accent color */
    --danger-color: #ef4444;     /* Warning/error color */
    /* ... other variables */
}
```

### Quiz Questions
Update the quiz data in `script.js`:
```javascript
const quizQuestions = [
    {
        question: "Your question here?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0, // Index of correct answer
        explanation: "Explanation for this question"
    }
    // Add more questions...
];
```

## Browser Compatibility

- **Chrome/Chromium**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Full responsive support

## Performance Features

- **Lazy loading**: Images load as needed
- **Optimized animations**: CSS transforms for smooth performance
- **Minimal dependencies**: Vanilla JavaScript for fast loading
- **Responsive images**: Optimized for different screen sizes
- **Efficient event handling**: Delegated event listeners

## Security Considerations

- **No external dependencies**: Reduces attack surface
- **HTTPS ready**: Works securely over encrypted connections
- **Input validation**: Form data validation and sanitization
- **Safe defaults**: Secure by default configurations

## Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA labels**: Screen reader compatibility
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: WCAG compliant color schemes
- **Focus indicators**: Clear visual focus states

## Analytics Integration

The code includes placeholder functions for analytics tracking:
```javascript
trackEvent('quiz_started');
trackEvent('quiz_completed', { score: 80 });
trackEvent('section_viewed', { section: 'best-practices' });
```

Replace with your preferred analytics service (Google Analytics, Mixpanel, etc.).

## Deployment

### Static Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload to static website bucket

### Corporate Intranet
Upload files to your internal web server and provide the URL to employees.

## Support and Maintenance

### Regular Updates
- Review quiz questions quarterly
- Update phishing examples with current trends
- Refresh statistics and data
- Test browser compatibility

### User Feedback
Collect feedback through:
- End-of-training surveys
- IT department reports
- Quiz performance analysis
- User engagement metrics

## License

This project is provided for educational and corporate training purposes. Feel free to modify and distribute within your organization.

## Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Contact

For questions or support regarding this phishing awareness training:
- Email: security@yourcompany.com
- Internal IT: ext. 1234
- Emergency: 24/7 security hotline

---

**Stay safe online and remember: Think before you click!**
