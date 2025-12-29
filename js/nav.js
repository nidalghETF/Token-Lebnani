// js/nav.js - Corrected Version
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.getElementById('dynamic-navigation');
    if (!navContainer) return;
    
    // Define your navigation items here (easy to update later)
    const navItems = [
        { text: "Home", icon: "fa-home", href: "../" },
        { text: "Business Plan", icon: "fa-file-contract", href: "../business-plan/" },
        { text: "Mindmap", icon: "fa-project-diagram", href: "../mindmap/" },
        { text: "Go To Market", icon: "fa-chart-line", href: "../Go to Market/" },
        { text: "Legal", icon: "fa-gavel", href: "../legal/" },
        { text: "Pathway", icon: "fa-road", href: "../pathway/" }
        // Add or remove items here as needed
    ];
    
    // Generate navigation HTML
    let navHTML = '';
    navItems.forEach(item => {
        navHTML += `
        <a href="${item.href}" class="nav-link">
            <i class="fas ${item.icon}"></i> ${item.text}
        </a>`;
    });
    
    navContainer.innerHTML = navHTML;
    
    // Highlight current page
    const currentPage = window.location.pathname.split('/').filter(Boolean)[0] || 'home';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.href.split('/').filter(Boolean).slice(-2)[0] || 'home';
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
