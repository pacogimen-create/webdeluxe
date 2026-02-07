// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav--open');
            menuToggle.classList.toggle('active');

            // Prevent scrolling when menu is open
            document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav--open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
