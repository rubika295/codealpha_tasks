// Quiz Data
const quizQuestions = [
    {
        question: "Which of the following is a strong indicator of a phishing email?",
        options: [
            "Personalized greeting with your name",
            "Urgent language threatening account suspension",
            "Professional email signature",
            "Correct spelling and grammar"
        ],
        correct: 1,
        explanation: "Urgent or threatening language is a common tactic used in phishing emails to create panic and bypass rational thinking."
    },
    {
        question: "What should you do if you receive a suspicious email from your bank?",
        options: [
            "Click the link to verify your account",
            "Reply to the email asking if it's legitimate",
            "Contact your bank directly using their official website or phone number",
            "Forward the email to your friends for their opinion"
        ],
        correct: 2,
        explanation: "Always contact organizations directly through official channels rather than using links or contact information in suspicious emails."
    },
    {
        question: "Which URL is most likely to be a phishing website?",
        options: [
            "https://www.amazon.com",
            "https://secure-paypal.com/login",
            "https://www.google.com",
            "https://microsoft.com"
        ],
        correct: 1,
        explanation: "The URL 'secure-paypal.com' is suspicious because it's not the official PayPal domain (paypal.com) and uses 'secure-' as a deceptive prefix."
    },
    {
        question: "What is social engineering?",
        options: [
            "A type of computer virus",
            "The psychological manipulation of people into performing actions or divulging confidential information",
            "A security software program",
            "A method for encrypting emails"
        ],
        correct: 1,
        explanation: "Social engineering is the art of manipulating people into performing actions or divulging confidential information, often used in phishing attacks."
    },
    {
        question: "Which of the following is NOT a recommended security practice?",
        options: [
            "Using unique passwords for each account",
            "Enabling two-factor authentication",
            "Sharing your password with trusted colleagues",
            "Regularly updating your software"
        ],
        correct: 2,
        explanation: "Never share your password with anyone, even trusted colleagues. Each person should have their own unique credentials."
    }
];

// Global Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let quizCompleted = false;

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const quizContent = document.getElementById('quizContent');
const quizResults = document.getElementById('quizResults');
const progressFill = document.getElementById('progressFill');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupEventListeners();
    setupScrollEffects();
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.indicator-card, .tactic-card, .practice-category').forEach(card => {
        observer.observe(card);
    });
}

// Quiz Functions
function initializeQuiz() {
    totalQuestionsSpan.textContent = quizQuestions.length;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';

    // Create question HTML
    const questionHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1}</h3>
            <p>${question.question}</p>
        </div>
        <div class="options">
            ${question.options.map((option, index) => `
                <div class="option" onclick="selectOption(${index})">
                    <span class="option-text">${option}</span>
                </div>
            `).join('')}
        </div>
        <div class="quiz-navigation">
            <button class="nav-button" onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'style="visibility: hidden;"' : ''}>
                <i class="fas fa-arrow-left"></i> Previous
            </button>
            <button class="nav-button next-button" onclick="nextQuestion()" disabled>
                Next <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    quizContent.innerHTML = questionHTML;
}

function selectOption(optionIndex) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selection to clicked option
    const options = document.querySelectorAll('.option');
    options[optionIndex].classList.add('selected');

    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;

    // Enable next button
    const nextButton = document.querySelector('.next-button');
    nextButton.disabled = false;
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        
        // Restore previous selection if exists
        if (userAnswers[currentQuestionIndex] !== undefined) {
            const options = document.querySelectorAll('.option');
            options[userAnswers[currentQuestionIndex]].classList.add('selected');
            document.querySelector('.next-button').disabled = false;
        }
    }
}

function showResults() {
    quizCompleted = true;
    
    // Calculate score
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            correctCount++;
        }
    });

    const percentage = Math.round((correctCount / quizQuestions.length) * 100);

    // Update results display
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('totalQuizQuestions').textContent = quizQuestions.length;

    // Set message based on score
    let message = '';
    if (percentage === 100) {
        message = 'Perfect! You\'re a phishing expert!';
    } else if (percentage >= 80) {
        message = 'Excellent! You have strong phishing awareness.';
    } else if (percentage >= 60) {
        message = 'Good job! Consider reviewing some topics.';
    } else {
        message = 'Keep learning! Review the training materials.';
    }
    document.getElementById('scoreMessage').textContent = message;

    // Show answer review
    const reviewHTML = quizQuestions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        return `
            <div class="answer-review ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>Question ${index + 1}</h4>
                <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                ${!isCorrect ? `<p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>` : ''}
                <p class="explanation">${question.explanation}</p>
            </div>
        `;
    }).join('');

    document.getElementById('answerReview').innerHTML = reviewHTML;

    // Show results, hide quiz
    quizContent.style.display = 'none';
    quizResults.style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    quizCompleted = false;
    
    quizContent.style.display = 'block';
    quizResults.style.display = 'none';
    
    initializeQuiz();
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate subscription
    showNotification('Successfully subscribed to security alerts!', 'success');
    event.target.reset();
}

// Resource Functions
function showResource(type) {
    let content = '';
    
    switch(type) {
        case 'report':
            content = `
                <h3>How to Report Phishing</h3>
                <p><strong>Email:</strong> Forward phishing emails to report@phishing.gov</p>
                <p><strong>Websites:</strong> Report fake sites to antiphishing.org</p>
                <p><strong>Internal:</strong> Contact your IT department immediately</p>
                <p><strong>Quick Tip:</strong> Include headers in email reports for better tracking</p>
            `;
            break;
        case 'tools':
            content = `
                <h3>Recommended Security Tools</h3>
                <p><strong>Password Managers:</strong> LastPass, 1Password, Bitwarden</p>
                <p><strong>Two-Factor Auth:</strong> Google Authenticator, Authy</p>
                <p><strong>Browser Extensions:</strong> uBlock Origin, HTTPS Everywhere</p>
                <p><strong>Email Security:</strong> Spam filters, virus scanners</p>
            `;
            break;
        case 'training':
            content = `
                <h3>Additional Training Resources</h3>
                <p><strong>Online Courses:</strong> Cybrary, Coursera, edX</p>
                <p><strong>Certifications:</strong> CompTIA Security+, CISSP</p>
                <p><strong>Government Resources:</strong> StaySafeOnline.gov, CISA.gov</p>
                <p><strong>Company Training:</strong> Contact your HR/IT department</p>
            `;
            break;
    }
    
    showModal(content);
}

// Modal Functions
function showModal(content) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('resourceModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'resourceModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="closeModal()">&times;</span>
                <div id="modalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background-color: white;
                margin: 5% auto;
                padding: 2rem;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                position: relative;
                animation: slideIn 0.3s ease;
            }
            
            .modal-close {
                position: absolute;
                right: 1rem;
                top: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-light);
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: var(--dark-color);
            }
            
            #modalBody h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            #modalBody p {
                margin-bottom: 0.5rem;
                line-height: 1.6;
            }
            
            #modalBody strong {
                color: var(--dark-color);
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Update content and show modal
    document.getElementById('modalBody').innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('resourceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('resourceModal');
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
        
        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            #notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
            }
            
            #notification.success {
                background: var(--success-color);
            }
            
            #notification.error {
                background: var(--danger-color);
            }
            
            #notification.info {
                background: var(--primary-color);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    // Set content and type
    notification.textContent = message;
    notification.className = type;
    notification.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.indicator-card, .tactic-card, .practice-category');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click-to-copy functionality for code examples
    document.querySelectorAll('code').forEach(codeElement => {
        codeElement.style.cursor = 'pointer';
        codeElement.title = 'Click to copy';
        
        codeElement.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy', 'error');
            });
        });
    });

    // Add interactive hover states for navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--text-color)';
        });
    });
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images when they come into viewport
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
});

// Analytics and Tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example events to track:
    // - quiz_started
    // - quiz_completed
    // - section_viewed
    // - resource_clicked
    // - newsletter_subscribed
}

// Track quiz start
document.addEventListener('DOMContentLoaded', function() {
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !quizCompleted) {
                    trackEvent('quiz_started');
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(quizSection);
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Arrow keys for quiz navigation
    if (document.getElementById('quizContent').style.display !== 'none') {
        if (e.key === 'ArrowRight' && !document.querySelector('.next-button').disabled) {
            nextQuestion();
        } else if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
            previousQuestion();
        } else if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option');
            if (options[optionIndex]) {
                selectOption(optionIndex);
            }
        }
    }
});

// Print functionality
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const printContents = section.innerHTML;
        const originalContents = document.body.innerHTML;
        
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        
        // Reinitialize event listeners
        location.reload();
    }
}

// Add print button styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    .print-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        transition: var(--transition);
        z-index: 100;
        box-shadow: var(--shadow-lg);
    }
    
    .print-button:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }
    
    @media print {
        .header, .footer, .print-button {
            display: none !important;
        }
        
        .section {
            page-break-inside: avoid;
        }
    }
`;
document.head.appendChild(printStyles);

// Add print button to each section
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '<i class="fas fa-print"></i> Print Section';
        printButton.onclick = () => printSection(section.id);
        printButton.style.display = 'none'; // Hidden by default
        
        section.appendChild(printButton);
        
        // Show print button on hover
        section.addEventListener('mouseenter', () => {
            printButton.style.display = 'block';
        });
        
        section.addEventListener('mouseleave', () => {
            printButton.style.display = 'none';
        });
    });
});
