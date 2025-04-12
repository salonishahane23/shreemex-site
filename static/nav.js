document.addEventListener('DOMContentLoaded', function() {
    // Detect touch devices and add class to body
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }
    
    // Fix all navigation links to ensure they have the correct format
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip external links or anchor links
        if (href.startsWith('http') || href.startsWith('#') || href === '/') {
            return;
        }
        
        // Clean up the href to remove any double slashes or trailing slashes
        const cleanedHref = '/' + href.replace(/^\/+|\/+$/g, '');
        link.setAttribute('href', cleanedHref);
    });
    
    // Handle Core Business dropdown
    const coreBusinessBtn = document.querySelector('.core-business-btn');
    const coreBusinessDropdown = document.querySelector('.core-business-dropdown');
    
    if (coreBusinessBtn && coreBusinessDropdown) {
        // For touch devices, use click event instead of hover
        if (document.body.classList.contains('touch-device')) {
            coreBusinessBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                coreBusinessDropdown.classList.toggle('active');
                coreBusinessDropdown.style.opacity = coreBusinessDropdown.classList.contains('active') ? '1' : '0';
                coreBusinessDropdown.style.transform = coreBusinessDropdown.classList.contains('active') ? 'scaleY(1)' : 'scaleY(0)';
                coreBusinessDropdown.style.visibility = coreBusinessDropdown.classList.contains('active') ? 'visible' : 'hidden';
                this.querySelector('i').classList.toggle('rotate-180');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!coreBusinessBtn.contains(e.target) && !coreBusinessDropdown.contains(e.target)) {
                    coreBusinessDropdown.classList.remove('active');
                    coreBusinessDropdown.style.opacity = '0';
                    coreBusinessDropdown.style.transform = 'scaleY(0)';
                    coreBusinessDropdown.style.visibility = 'hidden';
                    coreBusinessBtn.querySelector('i').classList.remove('rotate-180');
                }
            });
        }
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            
            // Add aria attributes for accessibility
            const isExpanded = mobileMenu.classList.contains('open');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Mobile dropdown toggle - updated to handle multiple dropdowns
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('open');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
                
                // Add aria attributes for accessibility
                const isExpanded = dropdown.classList.contains('open');
                this.setAttribute('aria-expanded', isExpanded);
            }
        });
    });
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll('[data-item]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Don't prevent default for dropdown toggles on touch devices
            if (this.classList.contains('core-business-btn') && document.body.classList.contains('touch-device')) {
                return;
            }
            
            // Get the page from data-item attribute
            const page = this.getAttribute('data-item').toLowerCase().replace(/\s+/g, '-');
    
            let targetPage;
            switch(page) {
                case 'home':
                    targetPage = '/';
                    break;
                case 'products':
                    targetPage = '/products';
                    break;
                case 'services':
                    targetPage = '/services';
                    break;
                case 'about-us':
                    targetPage = '/about';
                    break;
                case 'team':
                    targetPage = '/team';
                    break;
                case 'contact-us':
                    targetPage = '/contact';
                    break;
                default:
                    targetPage = '/' + page;
            }
    
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
            
            // Allow the default link behavior if it's an anchor tag
            if (this.tagName === 'A') {
                // Update href to ensure it's correct
                this.setAttribute('href', targetPage);
                // Let the normal navigation happen (don't prevent default)
                return true;
            } else {
                // For non-anchor elements, manually navigate
                event.preventDefault();
                window.location.href = targetPage;
            }
        });
    });
    
    // Highlight current page in the navigation
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase() || 'home';
    console.log("Current path:", currentPath); // Debug logging
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-item').toLowerCase().replace(/\s+/g, '-');
        console.log("Checking link:", linkPage); // Debug logging

        let isActive = false;

        // Check for exact matches
        if (currentPath === '' && linkPage === 'home') {
            isActive = true;
        } else if (currentPath === 'about' && linkPage === 'about-us') {
            isActive = true;
        } else if (currentPath === 'contact' && linkPage === 'contact-us') {
            isActive = true;
        } else if (currentPath === linkPage) {
            isActive = true;
        }

        // Apply active classes if this is the active link
        if (isActive) {
            console.log("Activating link:", linkPage); // Debug logging
            
            if (link.classList.contains('nav-link')) {
                link.classList.add('active');
                const underline = link.querySelector('.nav-link-underline');
                if (underline) {
                    underline.classList.add('active-underline');
                }
            } else if (link.classList.contains('mobile-nav-item')) {
                link.classList.add('active');
            } else {
                link.classList.add('active');
            }
        }
    });
    
    // Add scroll effect for navbar with throttling for better performance
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollTop = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll(lastScrollTop);
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    function handleScroll(scrollTop) {
        const nav = document.getElementById('main-nav');
        if (nav) {
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }
    
    // Handle window resize for better responsiveness
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile menu state if window is resized to desktop view
            if (window.innerWidth >= 768 && mobileMenu && mobileMenu.classList.contains('open')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
        }, 250);
    });

    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(meta);
    }
    
    // Debug the app.py routes
    console.log("Current URL:", window.location.href);
    console.log("Expected Flask routes: /, /about, /products, /services, /team, /contact");
});