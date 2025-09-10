// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    
    // Page transition
    setTimeout(() => {
        document.querySelector('.page-transition').classList.add('loaded');
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth page transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.querySelector('.page-transition').style.opacity = '0';
            document.querySelector('.page-transition').style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const submitText = submitBtn.querySelector('.submit-text');
    const originalText = submitText.textContent;
    
    // Validate all fields
    if (!validateForm(form)) {
        showMessage('Please fix the errors above.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    try {
        // Send email using EmailJS or similar service
        await sendEmail({
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        });
        
        showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = originalText;
    }
}

// Send email function (using EmailJS)
async function sendEmail(data) {
    // EmailJS configuration
    const serviceID = 'service_your_service_id'; // Replace with your EmailJS service ID
    const templateID = 'template_your_template_id'; // Replace with your EmailJS template ID
    const userID = 'your_user_id'; // Replace with your EmailJS user ID
    
    // For demo purposes, we'll simulate the email sending
    // In production, uncomment the EmailJS code below and configure it properly
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) { // 90% success rate for demo
                resolve();
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
    
    /* 
    // Uncomment and configure this for production use with EmailJS
    try {
        const response = await emailjs.send(serviceID, templateID, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'prachichoudhary0504@gmail.com'
        }, userID);
        
        return response;
    } catch (error) {
        throw error;
    }
    */
}

// Form validation
function validateForm(form) {
    let isValid = true;
    
    // Required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = form.querySelector('[name="email"]');
    if (emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Privacy policy checkbox
    const privacyCheckbox = form.querySelector('[name="privacy"]');
    if (!privacyCheckbox.checked) {
        showMessage('Please agree to the privacy policy to continue.', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show message
function showMessage(text, type) {
    const messageDiv = document.querySelector('.message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add hover effects to contact methods
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    method.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click to copy functionality for email and phone
document.querySelectorAll('.contact-method').forEach(method => {
    const link = method.querySelector('a');
    if (link && (link.href.startsWith('mailto:') || link.href.startsWith('tel:'))) {
        method.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                e.preventDefault();
                const text = link.href.startsWith('mailto:') 
                    ? link.href.replace('mailto:', '')
                    : link.href.replace('tel:', '');
                
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: #22c55e;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        font-size: 0.8rem;
                        z-index: 1000;
                        pointer-events: none;
                        transform: translateX(-50%);
                    `;
                    
                    method.style.position = 'relative';
                    method.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                }).catch(() => {
                    // Fallback: just follow the link
                    window.location.href = link.href;
                });
            }
        });
    }
});
