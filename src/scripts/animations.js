// GSAP Animations for Web Club Natación
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {

    // --- Hero Section Animation ---
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

    // --- Section Titles Reveal ---
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

    // --- Bento Grid Reveal ---
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

    // --- About Image Reveal ---
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

    // --- Pricing Cards Reveal ---
    gsap.from(".pricing-card", {
        scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)"
    });

    // --- Stats Counter Animation ---
    const statsItems = document.querySelectorAll('.stat-number');

    if (statsItems.length > 0) {
        statsItems.forEach(stat => {
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
