// js/header.js
function injectHeader() {
    // Only inject if site-header doesn't already exist
    if (document.querySelector('.site-header')) return;
    
    const headerHTML = `
        <header class="site-header">
            <div class="logo-container">
                <img src="../images/logo.png" alt="Token Lebnani Logo" class="logo-img">
                <div class="brand-text">
                    <h1 class="brand-name">TOKEN LEBNANI</h1>
                    <p class="brand-tagline">A Regulated Path to Fractional Real-Estate</p>
                </div>
            </div>
            <nav class="nav-links" id="dynamic-navigation"></nav>
        </header>
    `;
    
    // Insert header at top of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Load navigation after header is added
    loadScript('../js/nav.js');
}

function loadScript(src) {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
} else {
    injectHeader();
}
