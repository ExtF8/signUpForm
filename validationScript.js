document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners and error messages
    function validateField(element, validationFunction) {
        element.addEventListener('input', function (event) {
            const errorElement = document.querySelector(`#${element.id}-error`);
            const errorMessage = validationFunction(
                element.value,
                element.validity
            );
            errorElement.textContent = errorMessage;
        });
    }
});
// Add Validation functions
function validateTextPresence(value) {
    return value === '' ? 'This field is required' : '';
}

function validateEmail(value, validity) {
    return validity.typeMismatch ? 'Please enter valid email' : '';
}

function validatePhoneNumber(value, validity) {
    return validity.patternMismatch
        ? 'Please enter a 10-digit phone number'
        : '';
}

function validatePassword(value) {
    let errors = [];

    if (!/[A-Z]/.test(value)) errors.push('Missing at least 1 capital letter');
    if (!/[0-9]/.test(value)) errors.push('Missing al least 1 number');
    if (value.length < 9) errors.push('Must be at least 8 characters');

    return errors.join(`\n`);
}

function validateConfirmPassword(value, _, refElement) {
    return value !== refElement.value ? 'Passwords do not match' : '';
}

// Select the input fields and error div's
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const phoneNumber = document.querySelector('#phone-number');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

// Validation
validateField(firstName, validateTextPresence);
validateField(lastName, validateTextPresence);
validateField(email, validateEmail);
validateField(phoneNumber, validatePhoneNumber);
validateField(password, validatePassword);
validateField(confirmPassword, (value, validity) =>
    validateConfirmPassword(value, validity, password)
);
