// js/protected-pages.js - Enhanced Version
// Centralized password protection for selected pages
// Passwords are stored as Base64 hashes
// To generate a hash: btoa("your_password") in browser console

const protectedPages = {
    // Add pages that need protection here
    // Format: "folder-name": "base64_encoded_password"
    "business-plan": "VG9rZW4=",  // Password: "Token"
    // "another-page": "cGFzc3dvcmQ="  // Example: "password"
    // Add more pages as needed
};

// DO NOT EDIT BELOW THIS LINE
document.addEventListener('DOMContentLoaded', function() {
    // Only run protection if there are protected pages
    if (Object.keys(protectedPages).length === 0) {
        console.log('No protected pages configured');
        return;
    }
    
   // Replace this block (around line 25-35)
const path = window.location.pathname;
let pageName = '';
const pathParts = path.split('/').filter(part => part && part !== 'index.html');
if (pathParts.length > 0) {
  pageName = pathParts[pathParts.length - 1];
  if (path === '/' || path.endsWith('index.html') || path.endsWith('/')) {
    pageName = 'home';
  }
}

// With this improved version:
const path = window.location.pathname;
let pageName = 'home'; // default

// Check for data-page attribute first (most reliable)
if (document.body.dataset.page) {
  pageName = document.body.dataset.page;
} 
// Fallback to URL detection
else if (path.includes('business-plan')) {
  pageName = 'business-plan';
}
// Add other page detections as needed
    
    console.log('Checking protection for page:', pageName, 'from path:', path);
    
    // Check if this page needs protection
    if (protectedPages.hasOwnProperty(pageName)) {
        console.log(`Page "${pageName}" requires password protection`);
        
        // Create password overlay
        createPasswordOverlay(pageName, protectedPages[pageName]);
        
        // Hide content until authenticated
        document.body.style.overflow = 'hidden';
        
        // Add a class to body for styling
        document.body.classList.add('password-protected');
    } else {
        console.log(`Page "${pageName}" does not require protection`);
        // Ensure content is visible
        document.body.style.overflow = 'auto';
        document.body.classList.remove('password-protected');
    }
});

function createPasswordOverlay(pageName, correctHash) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'passwordOverlay';
    overlay.innerHTML = `
        <div class="password-container">
            <h2><i class="fas fa-lock"></i> Protected Content</h2>
            <p>This page is password protected. Please enter the password to continue.</p>
            <input type="password" class="password-input" placeholder="Enter password" id="passwordInput">
            <div class="password-error" id="passwordError">Incorrect password. Please try again.</div>
            <div class="attempts-counter" id="attemptsCounter">Attempts remaining: 3</div>
            <button class="password-button" id="submitPassword">Submit</button>
            <button class="password-button" id="cancelButton" style="background: transparent; color: #a0aec0; margin-left: 10px;">Cancel</button>
        </div>
    `;
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        #passwordOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 25, 47, 0.97);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            backdrop-filter: blur(10px);
        }
        
        .password-container {
            background: rgba(0, 0, 0, 0.85);
            padding: 40px;
            border-radius: 15px;
            border: 2px solid #D4AF37;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .password-container h2 {
            color: #D4AF37;
            margin-bottom: 15px;
            font-family: 'Cinzel', serif;
            font-size: 1.8em;
            border: none;
        }
        
        .password-container p {
            color: #cbd5e0;
            margin-bottom: 25px;
            font-size: 1.1em;
        }
        
        .password-input {
            width: 100%;
            padding: 15px;
            margin: 15px 0;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 1.1em;
            text-align: center;
            font-family: 'Cormorant Garamond', serif;
            transition: all 0.3s ease;
        }
        
        .password-input:focus {
            outline: none;
            border-color: #D4AF37;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }
        
        .password-button {
            background: #D4AF37;
            color: #0a192f;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-family: 'Cinzel', serif;
            font-weight: 600;
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        
        .password-button:hover {
            background: #e6c158;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
        }
        
        .password-error {
            color: #ff6b6b;
            margin: 10px 0;
            font-size: 0.95em;
            min-height: 20px;
        }
        
        .attempts-counter {
            color: #a0aec0;
            font-size: 0.85em;
            margin: 10px 0 20px;
        }
        
        body.password-protected {
            overflow: hidden !important;
        }
    `;
    
    document.head.appendChild(styles);
    document.body.appendChild(overlay);
    
    // Focus on input
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const attemptsCounter = document.getElementById('attemptsCounter');
    const submitButton = document.getElementById('submitPassword');
    const cancelButton = document.getElementById('cancelButton');
    
    passwordInput.focus();
    
    let attempts = 0;
    const maxAttempts = 3;
    
    // Submit password
    function submitPassword() {
        const password = passwordInput.value.trim();
        
        if (!password) {
            passwordError.textContent = 'Please enter a password';
            passwordError.style.display = 'block';
            return;
        }
        
        attempts++;
        
        if (btoa(password) === correctHash) {
            // Correct password
            document.body.removeChild(overlay);
            document.head.removeChild(styles);
            document.body.style.overflow = 'auto';
            document.body.classList.remove('password-protected');
            
            // Store session authentication (sessionStorage - clears on browser close)
            sessionStorage.setItem(`authenticated_${pageName}`, 'true');
            
            console.log('Password correct - access granted');
        } else {
            // Incorrect password
            passwordError.textContent = `Incorrect password. ${maxAttempts - attempts} attempts remaining.`;
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Update attempts counter
            attemptsCounter.textContent = `Attempts remaining: ${maxAttempts - attempts}`;
            
            if (attempts >= maxAttempts) {
                // Too many attempts
                passwordError.textContent = 'Too many failed attempts. Redirecting to homepage...';
                passwordInput.disabled = true;
                submitButton.disabled = true;
                
                setTimeout(() => {
                    window.location.href = "../";
                }, 2000);
            }
        }
    }
    
    // Event listeners
    submitButton.addEventListener('click', submitPassword);
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPassword();
        }
    });
    
    cancelButton.addEventListener('click', function() {
        window.location.href = "../";
    });
    
    // Check if already authenticated in this session
    if (sessionStorage.getItem(`authenticated_${pageName}`) === 'true') {
        console.log('Already authenticated in this session');
        document.body.removeChild(overlay);
        if (document.head.contains(styles)) {
            document.head.removeChild(styles);
        }
        document.body.style.overflow = 'auto';
        document.body.classList.remove('password-protected');
    }
}
