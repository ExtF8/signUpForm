// Add event listeners to input fields
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

// Validation function

function validateInput(event) {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    const inputId = inputElement.id;
    const errorElement = document.getElementById(`${inputId}-error`);

    let errorMessage = '';

    // Validation based on input id
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
    errorElement.innerText = errorMessage;

    // Add or remove error class based on validation
    if (errorMessage) {
        inputElement.classList.add('error-input');
    } else {
        inputElement.classList.remove('error-input');
    }
}

// Check if fields are valid
function isFieldsValid(inputFields) {
    let isValid = true;

    inputFields.forEach((field) => {
        const inputElement = document.getElementById(field);
        const inputValue = inputElement.value;

        if (!inputValue || inputElement.classList.contains('error-input')) {
            isValid = false;
        }
    });

    return isValid;
}

// Button alert
const submitBtn = document.getElementById('create-btn');

submitBtn.addEventListener('click', function () {
    if (isFieldsValid(inputFields)) {
        alert('Thanks for submitting your info to dev/null.');

        inputFields.forEach((field) => {
            const inputElement = document.getElementById(field);

            inputElement.value = '';
        });
    } else {
        inputFields.forEach((field) => {
            const inputElement = document.getElementById(field);
            if (
                !inputElement.value ||
                !inputElement.classList.contains('error-input')
            ) {
                validateInput({ target: inputElement });
            }
        });
    }
});
