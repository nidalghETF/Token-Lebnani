// js/header.js
(function() {
    // Prevent duplicate injection
    if (document.querySelector('.site-header')) return;

    const headerHTML = `
        <header class="site-header">
            <div class="logo-container">
                <img src="../images/logo.png" alt="Token Lebnani Logo" class="logo-img">  
                
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
// Add to a shared JS file (e.g., main.js)
document.addEventListener('DOMContentLoaded', function() {
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.toggle-container');
  
  if (!header || !toggle) return;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down & past header
      header.style.transform = 'translateY(-100%)';
      toggle.style.transform = 'translateY(-100%)';
    } else if (scrollTop < 20) {
      // At very top of page
      header.style.transform = 'translateY(0)';
      toggle.style.transform = 'translateY(0)';
    }
    // Don't show when scrolling up unless at top
    
    lastScrollTop = scrollTop;
  });
});
