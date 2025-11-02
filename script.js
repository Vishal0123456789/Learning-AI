// Password visibility toggle
const passwordInput = document.getElementById('password-input');
const passwordToggle = document.getElementById('password-toggle');

passwordToggle.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Update icon (toggle between eye and eye-slash)
    if (type === 'text') {
        passwordToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66667 10C1.66667 10 4.16667 5.83333 10 5.83333C15.8333 5.83333 18.3333 10 18.3333 10M1.66667 10C1.66667 10 4.16667 14.1667 10 14.1667C15.8333 14.1667 18.3333 10 18.3333 10M1.66667 10L18.3333 10" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;
    } else {
        passwordToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.66667 10C1.66667 10 4.16667 5.83333 10 5.83333C15.8333 5.83333 18.3333 10 18.3333 10M1.66667 10C1.66667 10 4.16667 14.1667 10 14.1667C15.8333 14.1667 18.3333 10 18.3333 10M1.66667 10L18.3333 10" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#666" stroke-width="1.5"/>
            </svg>
        `;
    }
});

// Form submission handler
const form = document.querySelector('.signup-form-content');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
});

// Google Sign-In Configuration
// IMPORTANT: Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google Client ID
// Get it from: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = '569806936213-bj3r7s1ivmns9aj7lfmjvun8usb4ap72.apps.googleusercontent.com';

// Initialize Google Sign-In when the page loads
function initializeGoogleSignIn() {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: true
        });
    } else {
        // Retry if Google script hasn't loaded yet
        setTimeout(initializeGoogleSignIn, 100);
    }
}

// Handle the credential response from Google
function handleCredentialResponse(response) {
    // Decode the JWT token (you'll need to verify this on your backend)
    console.log('Encoded JWT ID token: ' + response.credential);
    
    // Decode the JWT to get user info (client-side decoding for display only)
    // WARNING: Always verify the token on your backend for security
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const userData = JSON.parse(jsonPayload);
    
    // Display user information
    console.log('User signed in:', userData);
    alert('Welcome, ' + userData.name + '!\nEmail: ' + userData.email);
    
    // Here you would typically:
    // 1. Send the token to your backend
    // 2. Verify the token on the backend
    // 3. Create or update user session
    // 4. Redirect to dashboard or home page
    
    // Example: Send to backend
    // fetch('/api/auth/google', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ token: response.credential })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     window.location.href = '/dashboard';
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}

// Google button click handler
document.querySelector('.google-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
        alert('Please configure your Google Client ID in script.js');
        return;
    }
    
    if (typeof google !== 'undefined' && google.accounts) {
        // Trigger One Tap prompt
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed()) {
                console.log('One Tap not displayed - user may need to configure Google Cloud Console');
                alert('One Tap sign-in not available. Please check:\n1. Authorized JavaScript origins in Google Cloud Console\n2. OAuth consent screen configuration\n3. Make sure you\'re using http://localhost (not file://)');
            } else if (notification.isSkippedMoment()) {
                console.log('One Tap was skipped');
            } else if (notification.isDismissedMoment()) {
                console.log('One Tap was dismissed');
            }
        });
    } else {
        console.error('Google Sign-In library not loaded');
        alert('Google Sign-In library is not loaded. Please check your internet connection.');
    }
});

// Handle OAuth token response (alternative method)
function handleTokenResponse(tokenResponse) {
    // Get user info using the access token
    fetch('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + tokenResponse.access_token)
        .then(response => response.json())
        .then(data => {
            console.log('User info:', data);
            alert('Welcome, ' + data.name + '!\nEmail: ' + data.email);
            
            // Send to your backend for verification and session creation
            // fetch('/api/auth/google', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ access_token: tokenResponse.access_token })
            // })
            // .then(response => response.json())
            // .then(result => {
            //     window.location.href = '/dashboard';
            // });
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
}

// Initialize Google Sign-In when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGoogleSignIn);
} else {
    initializeGoogleSignIn();
}

