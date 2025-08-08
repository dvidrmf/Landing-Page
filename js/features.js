// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initImageHoverEffects();
    initHeaderScrollEffect();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('Features page loaded successfully! ✨');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations (AOS-like functionality)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible && !element.classList.contains('aos-animate')) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initial check
    checkAnimations();
    
    // Check on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                checkAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.features-hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Image Hover Effects
function initImageHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(58, 90, 64, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 25px rgba(0,0,0,0.2)';
        } else {
            header.style.background = 'linear-gradient(135deg, #3A5A40, #588157)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Video Modal Functions
function playVideo(videoType) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    // Define video content based on type
    const videoContent = {
        process: {
            title: 'The Art of Tea Making',
            description: 'Watch our expert baristas craft the perfect milk tea using traditional brewing methods.',
            duration: '2:15'
        },
        experience: {
            title: 'Customer Experience',
            description: 'See why customers love their experience at Taste From The Greens.',
            duration: '1:45'
        },
        tour: {
            title: 'Virtual Store Tour',
            description: 'Take a virtual walk through our welcoming tea shop.',
            duration: '3:20'
        }
    };
    
    const content = videoContent[videoType];
    
    if (content) {
        player.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h3 style="margin-bottom: 1rem; color: white; font-size: 2rem;">${content.title}</h3>
                <p style="margin-bottom: 2rem; color: #DAD7CD; font-size: 1.2rem;">${content.description}</p>
                <div style="background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 15px; margin: 2rem 0;">
                    <p style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">🎬 Duration: ${content.duration}</p>
                    <p style="color: #DAD7CD;">In a real implementation, the actual video would play here.</p>
                    <p style="color: #DAD7CD; margin-top: 1rem; font-size: 0.9rem;">This is a demo showcasing the video modal functionality.</p>
                </div>
                <button onclick="closeVideo()" style="padding: 12px 24px; background: #ff9500; color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 600; font-size: 1.1rem; transition: all 0.3s ease;">Close Video</button>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add show animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }, 300);
}

// CTA Button Functions
function showLocationInfo() {
    showNotification('📍 Location Info', 'We have multiple locations! Call us at 09123456789 to find the nearest branch to you.', 'info');
}

function showOrderInfo() {
    showNotification('🛒 Order Now', 'Ready to order? Call us at 09123456789 or visit our store during operating hours (10:00 AM - 9:00 PM).', 'success');
}

// Notification System
function showNotification(title, message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const colors = {
        info: 'linear-gradient(45deg, #2196F3, #64B5F6)',
        success: 'linear-gradient(45deg, #4CAF50, #81C784)',
        warning: 'linear-gradient(45deg, #FF9800, #FFB74D)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1500;
        max-width: 350px;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 8px 0; font-weight: 600; font-size: 1.1rem;">${title}</h4>
                <p style="margin: 0; opacity: 0.95; line-height: 1.5;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; opacity: 0.7; transition: opacity 0.3s ease;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, 6000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close video modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal.style.display === 'block') {
            closeVideo();
        }
        
        // Also close mobile menu
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Press 'Space' to play first video when focused on play button
    if (e.key === ' ' && e.target.classList.contains('play-button')) {
        e.preventDefault();
        e.target.click();
    }
});

// Image Loading Optimization
function optimizeImages() {
    const images = document.querySelectorAll('.placeholder-image');
    
    // Add intersection observer for lazy loading effect
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(image => {
        imageObserver.observe(image);
    });
}

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// Smooth counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(target);
        
        if (isNumber) {
            const startValue = 0;
            const endValue = parseInt(target);
            const duration = 2000;
            const increment = endValue / (duration / 16);
            
            let currentValue = startValue;
            counter.textContent = '0';
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= endValue) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(currentValue);
                }
            }, 16);
        }
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.features-hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroSection);
}

// Performance optimization with debounced scroll
function debounce(func, wait) {
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

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Add click to expand functionality
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.item-info')) {
                expandGalleryItem(this, index);
            }
        });
        
        // Add keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                expandGalleryItem(this, index);
            }
        });
    });
}

function expandGalleryItem(item, index) {
    // Create expanded view modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    const content = item.cloneNode(true);
    content.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        font-size: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    modal.appendChild(content);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// Initialize gallery interactions
document.addEventListener('DOMContentLoaded', initGalleryInteractions);

// Video placeholder interactions
function initVideoInteractions() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(video => {
        // Add hover effect for play button
        const playButton = video.querySelector('.play-button');
        
        video.addEventListener('mouseenter', function() {
            if (playButton) {
                playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                playButton.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))';
            }
        });
        
        video.addEventListener('mouseleave', function() {
            if (playButton) {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                playButton.style.filter = 'none';
            }
        });
        
        // Add ripple effect on click
        video.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize video interactions
document.addEventListener('DOMContentLoaded', initVideoInteractions);

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach((button, index) => {
        button.setAttribute('aria-label', `Play video ${index + 1}`);
        button.setAttribute('role', 'button');
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#features';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhance focus indicators
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #ff9500';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`🚀 Features page loaded in ${Math.round(loadTime)}ms`);
        
        // Check for slow loading elements
        const images = document.querySelectorAll('.placeholder-image');
        if (images.length > 0) {
            console.log(`📸 ${images.length} placeholder images rendered`);
        }
        
        // Monitor animation performance
        let animationFrames = 0;
        let lastTime = performance.now();
        
        function monitorFPS() {
            animationFrames++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(animationFrames * 1000 / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn(`⚠️ Low FPS detected: ${fps}`);
                }
                animationFrames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(monitorFPS);
        }
        
        requestAnimationFrame(monitorFPS);
    });
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}

// Social sharing functionality
function initSocialSharing() {
    // Add social share buttons (hidden by default, shown on hover)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '📤';
        shareButton.className = 'share-button';
        shareButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 16px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 5;
        `;
        
        shareButton.addEventListener('click', function(e) {
            e.stopPropagation();
            shareImage(item);
        });
        
        item.style.position = 'relative';
        item.appendChild(shareButton);
        
        item.addEventListener('mouseenter', function() {
            shareButton.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            shareButton.style.opacity = '0';
        });
    });
}

function shareImage(item) {
    const title = item.querySelector('h4').textContent;
    const text = `Check out this amazing feature at Taste From The Greens: ${title}`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${text} - ${url}`).then(() => {
            showNotification('📋 Copied!', 'Link copied to clipboard for sharing.', 'success');
        });
    }
}

// Initialize social sharing
document.addEventListener('DOMContentLoaded', initSocialSharing);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error message for critical errors
    if (e.error && e.error.name !== 'ResizeObserver loop limit exceeded') {
        showNotification('⚠️ Notice', 'Something went wrong, but the page should still work normally.', 'warning');
    }
});

// Final initialization message
console.log('✅ All features page functionality loaded successfully!');
console.log('🍃 Taste From The Greens - Features Page Ready');

// Export functions for potential external use
window.TasteFromTheGreensFeatures = {
    playVideo,
    closeVideo,
    showLocationInfo,
    showOrderInfo,
    showNotification
};