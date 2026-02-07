document.addEventListener("DOMContentLoaded", function() {
    
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial Setup
    const header = document.querySelector('.header');
    
    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        // Simple toggle for now, can be improved with animation
    });

    // --- Animations ---

    // Hero Section
    const heroTl = gsap.timeline();

    heroTl.from(".hero__title .hero__line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    })
    .from(".hero__subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to(".hero__actions", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");

    // Section Titles Reveal
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Bento Grid Reveal
    gsap.from(".bento-item", {
        scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

    // About Image Reveal
    gsap.from(".about__image img", {
        scrollTrigger: {
            trigger: ".about__image",
            start: "top 80%",
        },
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });

    // Stats Counter Animation
    const stats = isNaN(document.querySelectorAll('.stat-number')) ? [] : document.querySelectorAll('.stat-number');
    
    // Fallback for simple iteration if not empty
    if(document.querySelectorAll('.stat-number').length > 0) {
         document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    gsap.to(stat, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power1.out"
                    });
                }
            });
        });
    }
});
