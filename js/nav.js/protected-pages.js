// Passwords are stored as Base64 hashes (not secure but sufficient for basic protection)
// To generate a hash: btoa("your_password") in browser console
const protectedPages = {
    "business-plan": "Z29sZGVuZ29vc2U=" // Example hash for "goldengoose"
};

document.addEventListener('DOMContentLoaded', function() {
    // Only run protection if on a protected page
    if (Object.keys(protectedPages).length === 0) return;
    
    const path = window.location.pathname;
    let pageName = '';
    
    // Extract page name from path
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length >= 1) {
        pageName = pathParts[0];
    } else if (path.includes('index.html')) {
        pageName = 'home';
    }
    
    // Check if this page needs protection
    if (protectedPages[pageName]) {
        // Show loading overlay while verifying
        document.body.style.opacity = '0.5';
        
        let attempts = 0;
        const maxAttempts = 3;
        
        function promptPassword() {
            const password = prompt(`Password required to view this page (${maxAttempts - attempts} attempts remaining):`);
            
            if (password === null) {
                // User clicked Cancel
                window.location.href = "../";
                return;
            }
            
            attempts++;
            
            if (btoa(password) === protectedPages[pageName]) {
                // Password correct - restore full opacity
                document.body.style.opacity = '1';
                return;
            } else if (attempts < maxAttempts) {
                alert("Incorrect password. Please try again.");
                promptPassword();
            } else {
                alert("Too many failed attempts. Redirecting to homepage.");
                window.location.href = "../";
            }
        }
        
        promptPassword();
    }
});
