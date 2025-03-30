document.addEventListener('DOMContentLoaded', function() {
    // Handle Core Business dropdown
    const coreBusinessBtn = document.querySelector('.core-business-btn');
    const coreBusinessDropdown = document.querySelector('.core-business-dropdown');
    
    if (coreBusinessBtn) {
        coreBusinessBtn.addEventListener('click', function() {
            coreBusinessDropdown.classList.toggle('active');
            this.querySelector('i').classList.toggle('rotate-180');
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }
    
    // Mobile dropdown toggle - updated to handle multiple dropdowns
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('open');
            this.querySelector('i').classList.toggle('rotate-180');
        });
    });
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll('[data-item]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-item').toLowerCase().replace(/\s+/g, '-');
    
            let targetPage;
            switch(page) {
                case 'home':
                    targetPage = 'index.html';
                    break;
                case 'products':
                    targetPage = 'products.html';
                    break;
                case 'services':
                    targetPage = 'services.html';
                    break;
                case 'about-us':
                    targetPage = 'about.html';
                    break;
                case 'team':
                    targetPage = 'team.html';
                    break;
                case 'contact-us':
                    targetPage = 'contact.html';
                    break;
                default:
                    targetPage = page + '.html';
            }
    
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            }
            
            // Navigate to the target page
            window.location.href = window.location.origin + '/' + targetPage;
        });
    });
    
    // Highlight current page in the navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageToHighlight = currentPage.replace('.html', '');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-item').toLowerCase().replace(/\s+/g, '-');
        if ((currentPage === 'index.html' && linkPage === 'home') || 
            (pageToHighlight === linkPage) ||
            (currentPage === 'about.html' && linkPage === 'about-us') ||
            (currentPage === 'contact.html' && linkPage === 'contact-us')) {
            
            // Apply the appropriate active class based on the element type
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
    
    // Add scroll effect for navbar
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});