// Skills Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSkillAnimations();
    initializeSkillLevels();
    
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

// Initialize skill card animations
function initializeSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize skill level animations
function initializeSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level-fill');
    
    const levelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                setTimeout(() => {
                    entry.target.style.width = level + '%';
                }, 300);
                levelObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillLevels.forEach(level => {
        levelObserver.observe(level);
    });
}

// Add hover effects to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        
        // Animate skill tags
        const tags = this.querySelectorAll('.skill-tag');
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
                tag.style.background = tag.style.background.replace('0.1', '0.2');
            }, index * 50);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        // Reset skill tags
        const tags = this.querySelectorAll('.skill-tag');
        tags.forEach(tag => {
            tag.style.transform = 'scale(1)';
            tag.style.background = tag.style.background.replace('0.2', '0.1');
        });
    });
});

// Add click effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for skill sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const skillSections = document.querySelectorAll('.skills-section');
    
    skillSections.forEach((section, index) => {
        const rate = scrolled * (0.05 + index * 0.01);
        section.style.transform = `translateY(${rate}px)`;
    });
});

// Add floating animation to skill icons
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite ${index * 0.2}s`;
});

// Add floating keyframes
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-5px) rotate(1deg); }
        66% { transform: translateY(2px) rotate(-1deg); }
    }
`;
document.head.appendChild(floatStyle);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add section reveal animation
const sections = document.querySelectorAll('.skills-section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = `all 0.8s ease ${index * 0.2}s`;
    sectionObserver.observe(section);
});
