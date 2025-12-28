// js/header.js
(function() {
    // Prevent duplicate injection
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

    // Inject at top of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Load navigation script dynamically
    const script = document.createElement('script');
    script.src = '../js/nav.js';
    script.defer = true;
    document.head.appendChild(script);
})();
