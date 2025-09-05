// DeiTech Landing Page Animations
// Enhanced animation controller with performance optimization

class LandingPageAnimations {
    constructor() {
        this.config = {
            duration: 1200,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            staggerDelay: 200
        };
        
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    // Initialize all animations
    init() {
        this.setupIntersectionObserver();
        this.observeAnimatedElements();
        this.optimizeInitialRender();
    }
    
    // Set up intersection observer for performance
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    // Trigger any additional animations if needed
                    this.handleElementInView(entry.target);
                }
            });
        }, this.observerOptions);
    }
    
    // Observe all animated elements
    observeAnimatedElements() {
        const animatedElements = document.querySelectorAll('.service, .container, .logo, .main-content');
        animatedElements.forEach(el => this.observer.observe(el));
    }
    
    // Handle element coming into view
    handleElementInView(element) {
        // Add any custom logic for elements coming into view
        if (element.classList.contains('service')) {
            this.enhanceServiceAnimation(element);
        }
    }
    
    // Enhance service card animations
    enhanceServiceAnimation(serviceElement) {
        // Add subtle hover enhancement
        serviceElement.addEventListener('mouseenter', () => {
            serviceElement.style.transform = 'translateY(-5px)';
        });
        
        serviceElement.addEventListener('mouseleave', () => {
            serviceElement.style.transform = 'translateY(0)';
        });
    }
    
    // Optimize initial page render
    optimizeInitialRender() {
        document.body.style.opacity = '1';
        
        // Preload critical animations
        requestAnimationFrame(() => {
            document.body.classList.add('animations-ready');
        });
    }
    
    // Clean up observers when needed
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animations = new LandingPageAnimations();
    
    // Store instance globally for potential debugging
    window.landingAnimations = animations;
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});
