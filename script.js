// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Trigger initial scroll reveal check
        revealOnScroll();
    }, 1500);

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links li a');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // 3. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Parallax effect for Hero section
        const heroBg = document.querySelector('.hero-bg');
        if (window.scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.05)`;
        }
    });

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                
                // Trigger counter animation if element contains counters
                if (element.querySelector('.counter') && !element.classList.contains('counted')) {
                    element.classList.add('counted');
                    animateCounters();
                }
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // 5. Animated Counters
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 6. Form Validation & Submission
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const successMsg = document.getElementById('success-msg');
    const spinner = document.querySelector('.spinner');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Simple Validation
        const inputs = form.querySelectorAll('input:required, textarea:required');
        inputs.forEach(input => {
            const group = input.parentElement;
            if (!input.value.trim()) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
                // Email validation
                if (input.type === 'email' && !validateEmail(input.value)) {
                     group.classList.add('error');
                     isValid = false;
                }
            }
        });

        // Remove error on input change
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });

        if (isValid) {
            // Simulate form submission
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            submitBtn.style.color = 'transparent';
            
            setTimeout(() => {
                spinner.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.style.color = '';
                
                form.reset();
                successMsg.style.display = 'block';
                successMsg.style.opacity = '1';
                
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 300);
                }, 4000);
                
            }, 2000); // Fake 2 seconds processing
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

});
