document.addEventListener('DOMContentLoaded', function() {
    // State variables
    let isVisible = false;
    
    // DOM Elements
    const pageContent = document.querySelector('.page-content');
    
    // Initialize the page
    initPage();
    
    // Functions
    function initPage() {
        // Show the page content
        setTimeout(() => {
            pageContent.classList.add('visible');
            isVisible = true;
        }, 100);
    }
});