const inputFields = [
    'first-name',
    'last-name',
    'email',
    'phone-number',
    'password',
    'confirm-password',
];

inputFields.forEach((field) => {
    const inputElement = document.getElementById(field);
    inputElement.addEventListener('input', validateInput);
});

function validateInput(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    const inputId = inputElement.id;
    const errorElement = document.getElementById(`${inputId}-error`);

    let errorMessage = '';

    // Validate based on input id
    switch (inputId) {
        case 'first-name':
        case 'last-name':
            if (inputValue.length < 2) {
                errorMessage = 'Must be at least 2 characters';
            }
            break;

        case 'email':
            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(inputValue)) {
                errorMessage = 'Invalid email address';
            }
            break;

        case 'phone-number':
            if (inputValue.length !== 10) {
                errorMessage = 'Phone number must have 10 digits';
            }
            break;

        case 'password':
            if (inputValue.length < 6) {
                errorMessage = 'Password must be at least 6 characters long';
            }
            break;

        case 'confirm-password':
            const passwordValue = document.getElementById('password').value;
            if (inputValue !== passwordValue) {
                errorMessage = 'Passwords do not match';
            }
            break;

        default:
            break;
    }

    // Show error message
    errorElement.textContent = errorMessage;

    // Add or remove error class based on validation result
    if (errorMessage) {
        inputElement.classList.add('error-input');
    } else {
        inputElement.classList.remove('error-input');
    }
}
