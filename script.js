const form = document.querySelector('form');
const inputs = document.querySelectorAll('input, select');
const dobInputs = document.querySelectorAll('.dob-inputs input, .dob-inputs select');
const genderInputs = document.querySelectorAll('.gender-inputs input');
const cancelButton = document.querySelector('#cancel');

function addUserToTable(firstName, lastName, gender, dob) {
    const tableBody = document.getElementById('userTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${gender}</td>
        <td>${dob}</td>
    `;
    tableBody.appendChild(row);
}

const isRequired = (input) => {
    if (input.classList.contains('dob-input')) {
        const dobInputs = document.querySelectorAll('.dob-input');
        return Array.from(dobInputs).every(dobInput => dobInput.value.trim() !== '');
    } else if (input.type === 'radio') {
        const name = input.name;
        const radios = document.getElementsByName(name);
        return Array.from(radios).some(radio => radio.checked);
    } else {
        return input.value.trim() !== '';
    }
};


const showError = (input, message) => {
    let formField;
    if (input.type === 'radio') {
        formField = input.closest('.gender-inputs');
    } else {
        formField = input.parentElement;
    }
    formField.classList.add('error');
    const error = formField.querySelector('.error-message');
    error.textContent = message;
    error.style.display = 'inline';
};

function showSuccess(input) {
    let formField;
    if (input.classList.contains('dob-input')) {
        formField = input.closest('.dob-inputs');
    } else if (input.type === 'radio') {
        formField = input.closest('.gender-inputs');
    } else {
        formField = input.closest('.input-group');
    }
    if (formField) {
        formField.classList.remove('error');
        const error = formField.querySelector('.error-message');
        if (error) {
            error.textContent = '';
        }
    }
};

const checkInput = (input) => {
    let formField;
    if (input.classList.contains('dob-input')) {
        formField = input.closest('.dob-inputs');
    } else {
        formField = input.closest('.input-group');
    }
    if (!isRequired(input)) {
        if (formField) {
            showError(formField, 'Please fill out this field.');
        }
        return false;
    } else {
        if (formField) {
            showSuccess(formField);
        }
        return true;
    }
};

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isFormValid = true;
    Array.from(inputs).forEach(input => {
        if (!checkInput(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        const firstName = document.getElementById('firstname-input').value;
        const lastName = document.getElementById('lastname-input').value;
        const gender = document.querySelector('.gender-inputs input:checked').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const dob = `${day}/${month}/${year}`;

        addUserToTable(firstName, lastName, gender, dob);

        form.reset();
        Array.from(inputs).forEach(input => showSuccess(input));
        Array.from(document.querySelectorAll('#dob .dob-input, #gender input')).forEach(input => showSuccess(input));
    }
});

form.addEventListener('input', function (e) {
    checkInput(e.target);
});

cancelButton.addEventListener('click', function(e) {
    e.preventDefault();
    form.reset();
    Array.from(inputs).forEach(input => showSuccess(input));
    Array.from(document.querySelectorAll('#dob .dob-input, #gender input')).forEach(input => showSuccess(input)); // call showSuccess for each dob and gender input
});