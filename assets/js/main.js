// DeiTech Main Site JavaScript - Luxury Navigation & Interactions

class DeiTechSite {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupAnimations();
    }
    
    // Navigation functionality
    setupNavigation() {
        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close mobile menu when clicking on links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Active link highlighting
        this.updateActiveNavLink();
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    updateActiveNavLink() {
        const currentPath = window.location.pathname;
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            if (currentPath === linkPath || 
                (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll effects
    setupScrollEffects() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class to navbar
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = this.navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    // Luxury animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.card, .section-header, .animate-on-scroll');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
        
        // Parallax effect for background elements
        this.setupParallax();
    }
    
    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const rate = scrolled * -0.5;
                    element.style.transform = `translateY(${rate}px)`;
                });
            });
        }
    }
    
    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Enhanced card interactions
class LuxuryCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.setupCardEffects(card);
        });
    }
    
    setupCardEffects(card) {
        card.addEventListener('mouseenter', (e) => {
            this.createShimmerEffect(e.target);
        });
        
        card.addEventListener('mousemove', (e) => {
            this.updateCardTilt(e);
        });
        
        card.addEventListener('mouseleave', (e) => {
            this.resetCardTilt(e.target);
        });
    }
    
    createShimmerEffect(card) {
        const shimmer = card.querySelector('::before');
        if (shimmer) {
            shimmer.style.animation = 'none';
            setTimeout(() => {
                shimmer.style.animation = '';
            }, 10);
        }
    }
    
    updateCardTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    }
    
    resetCardTilt(card) {
        card.style.transform = '';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const site = new DeiTechSite();
    const cardEffects = new LuxuryCardEffects();
    
    // Store globally for debugging
    window.DeiTechSite = site;
    window.LuxuryCardEffects = cardEffects;
    
    // Add loading complete class for any CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});
