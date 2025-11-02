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

// Social login button handlers
document.querySelector('.google-button').addEventListener('click', function() {
    console.log('Google login clicked');
    // Add Google OAuth logic here
});

