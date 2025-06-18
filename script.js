document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link, .mobile-nav .contact-btn');
    
    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        const spans = this.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Companies scroller duplication
    const scrollerInner = document.querySelector('.scroller__inner');
    if (scrollerInner) {
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
        
        const scroller = document.querySelector('.scroller');
        scroller.addEventListener('mouseenter', () => {
            scrollerInner.style.animationPlayState = 'paused';
        });
        
        scroller.addEventListener('mouseleave', () => {
            scrollerInner.style.animationPlayState = 'running';
        });
        
        function adjustSpeed() {
            const containerWidth = scroller.offsetWidth;
            const contentWidth = scrollerInner.scrollWidth / 2;
            const speedRatio = contentWidth / containerWidth;
            const newSpeed = Math.max(20, 40 / speedRatio);
            scrollerInner.style.animationDuration = `${newSpeed}s`;
        }
        
        adjustSpeed();
        window.addEventListener('resize', adjustSpeed);
    }

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(aboutSection);
    }

    // Image hover tilt effect
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imageWrapper.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            const rotateY = (x - 0.5) * 10;
            const rotateX = (0.5 - y) * 10;
            imageWrapper.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        imageWrapper.addEventListener('mouseleave', () => {
            imageWrapper.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }

    // Portfolio filter
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Intersection Observer for portfolio animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.animationDelay = `${index * 0.1}s`;
        portfolioObserver.observe(item);
    });

    // Smooth scrolling for all CTA buttons
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});