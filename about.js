// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCounters();
    initializeAnimations();
    
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

// Counter animation for stats
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const increment = isDecimal ? target / 100 : target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
                counter.textContent = displayValue + suffix;
            }
        }, 30);
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize scroll animations and effects
function initializeAnimations() {
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
    
    // Philosophy cards animation
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    philosophyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
    
    // Stats cards animation
    const statCards = document.querySelectorAll('.stat-card');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, {
        threshold: 0.3
    });
    
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        statObserver.observe(card);
    });
}

// Add hover effects to cards
document.querySelectorAll('.stat-card, .philosophy-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline item hover effects
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const content = this.querySelector('.timeline-content');
        content.style.background = 'rgba(255, 255, 255, 0.08)';
        content.style.borderColor = 'rgba(59, 130, 246, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        const content = this.querySelector('.timeline-content');
        content.style.background = 'rgba(255, 255, 255, 0.03)';
        content.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});

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

// Add parallax effect to timeline
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        timeline.style.transform = `translateY(${rate}px)`;
    }
});
