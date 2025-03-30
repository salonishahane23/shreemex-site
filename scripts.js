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
    
    // Mobile dropdown toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    
    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', function() {
            mobileDropdown.classList.toggle('open');
            this.querySelector('i').classList.toggle('rotate-180');
        });
    }
    
    // Navigation links functionality
    const navLinks = document.querySelectorAll('[data-item]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default action to handle manually
            e.preventDefault();
            
            const page = this.getAttribute('data-item').toLowerCase().replace(/\s+/g, '-');
            
            // Get the base URL of the current site
            const baseUrl = window.location.href.split('/').slice(0, -1).join('/') + '/';
            
            // Determine target page based on the navigation item
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
            
            // Navigate to the target page with the full path
            window.location.href = baseUrl + targetPage;
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
            link.classList.add('active');
        }
    });
});