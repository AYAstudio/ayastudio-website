// Language functionality
let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('bg-white', 'text-black');
            btn.classList.remove('text-gray-600', 'hover:text-black');
        } else {
            btn.classList.remove('bg-white', 'text-black');
            btn.classList.add('text-gray-600', 'hover:text-black');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-en][data-pt]').forEach(element => {
        const text = lang === 'en' ? element.dataset.en : element.dataset.pt;
        element.textContent = text;
    });
    
    // Save language preference
    localStorage.setItem('aya-language', lang);
}

// Mobile menu functionality
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('open');
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    menu.classList.remove('open');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('aya-language') || 'en';
    setLanguage(savedLanguage);
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger-btn');
    
    if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on scroll
window.addEventListener('scroll', function() {
    const menu = document.querySelector('.mobile-menu');
    if (menu.classList.contains('open')) {
        closeMobileMenu();
    }
});