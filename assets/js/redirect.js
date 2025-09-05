// DeiTech Redirect Page JavaScript
// Handles backup redirect functionality and enhanced UX

class RedirectController {
    constructor() {
        this.redirectDelay = 2000; // 2 seconds
        this.init();
    }
    
    init() {
        this.setupRedirect();
        this.enhanceUX();
    }
    
    // Setup backup redirect functionality
    setupRedirect() {
        // Get redirect URL from data attribute or default
        const redirectUrl = document.body.dataset.redirectUrl || '/wip/';
        
        // Backup JavaScript redirect
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, this.redirectDelay);
        
        // Handle manual link clicks
        const redirectLink = document.querySelector('.redirect-link');
        if (redirectLink) {
            redirectLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.redirectNow(redirectUrl);
            });
        }
    }
    
    // Immediate redirect function
    redirectNow(url) {
        window.location.href = url;
    }
    
    // Enhance user experience
    enhanceUX() {
        // Add smooth animations
        document.body.classList.add('redirect-ready');
        
        // Handle visibility changes (pause when hidden)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Preload WIP page for faster transition
        this.preloadWIPPage();
    }
    
    // Pause animations when page is hidden
    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }
    
    // Resume animations when page is visible
    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }
    
    // Preload the WIP page for faster loading
    preloadWIPPage() {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/wip/';
        document.head.appendChild(link);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const redirectController = new RedirectController();
    
    // Store globally for debugging
    window.redirectController = redirectController;
});
