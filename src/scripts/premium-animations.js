/**
 * Premium GSAP Animations for UCAM Swimming Club
 * Includes scroll-triggered animations, parallax effects, and micro-interactions
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize all animations when DOM is ready
 */
export function initAnimations() {
    // Smooth scroll configuration
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150
    });

    // Initialize individual animation modules
    initHeroAnimations();
    initScrollAnimations();
    initCardAnimations();
    initNavbarAnimations();
    initParallaxEffects();
    initCounterAnimations();
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });

    heroTimeline
        .from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0.2
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
        }, '-=0.4')
        .from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1
        }, '-=0.8');

    // Floating animation for hero elements
    gsap.to('.hero-float', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
    });
}

/**
 * Scroll-triggered fade and slide animations
 */
function initScrollAnimations() {
    // Fade in from bottom
    gsap.utils.toArray('.fade-in-up').forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Fade in from left
    gsap.utils.toArray('.fade-in-left').forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: -60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Fade in from right
    gsap.utils.toArray('.fade-in-right').forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Stagger animations for lists/grids
    gsap.utils.toArray('.stagger-container').forEach((container) => {
        const items = container.querySelectorAll('.stagger-item');

        gsap.from(items, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        });
    });
}

/**
 * Card hover and interaction animations
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.card-animated');

    cards.forEach((card) => {
        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Animate card image if exists
            const cardImage = card.querySelector('.card-image');
            if (cardImage) {
                gsap.to(cardImage, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });

            const cardImage = card.querySelector('.card-image');
            if (cardImage) {
                gsap.to(cardImage, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Navbar scroll animations
 */
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'navbar-scrolled',
            targets: '.navbar'
        }
    });

    // Hide/show navbar on scroll
    let lastScroll = 0;

    ScrollTrigger.create({
        onUpdate: (self) => {
            const currentScroll = self.scroll();

            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                gsap.to(navbar, {
                    y: -100,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                // Scrolling up
                gsap.to(navbar, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            lastScroll = currentScroll;
        }
    });
}

/**
 * Parallax scroll effects
 */
function initParallaxEffects() {
    gsap.utils.toArray('.parallax').forEach((element) => {
        const speed = element.dataset.speed || 0.5;

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
            ease: 'none'
        });
    });

    // Parallax background images
    gsap.utils.toArray('.parallax-bg').forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });
    });
}

/**
 * Animated counters for statistics
 */
function initCounterAnimations() {
    gsap.utils.toArray('.counter').forEach((counter) => {
        const target = parseInt(counter.dataset.target || counter.textContent);
        const duration = parseFloat(counter.dataset.duration || 2);

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.from(counter, {
                    textContent: 0,
                    duration: duration,
                    ease: 'power1.out',
                    snap: { textContent: 1 },
                    onUpdate: function () {
                        counter.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                });
            }
        });
    });
}

/**
 * Page transition animations
 */
export function pageTransitionIn() {
    const tl = gsap.timeline();

    tl.from('main', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
    });

    return tl;
}

export function pageTransitionOut() {
    const tl = gsap.timeline();

    tl.to('main', {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in'
    });

    return tl;
}

/**
 * Button ripple effect
 */
export function initButtonRipples() {
    document.querySelectorAll('.btn-ripple').forEach((button) => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
}

/**
 * Smooth scroll to anchor links
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

/**
 * Image reveal animation
 */
export function initImageReveal() {
    gsap.utils.toArray('.image-reveal').forEach((container) => {
        const image = container.querySelector('img');

        gsap.set(container, { overflow: 'hidden' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        tl.from(container, {
            clipPath: 'inset(0 100% 0 0)',
            duration: 1,
            ease: 'power2.out'
        })
            .from(image, {
                scale: 1.3,
                duration: 1,
                ease: 'power2.out'
            }, 0);
    });
}

/**
 * Text split and reveal animation
 */
export function initTextReveal() {
    gsap.utils.toArray('.text-reveal').forEach((element) => {
        const text = element.textContent;
        element.innerHTML = '';

        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            element.appendChild(span);
        });

        gsap.from(element.children, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });
    });
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
}
