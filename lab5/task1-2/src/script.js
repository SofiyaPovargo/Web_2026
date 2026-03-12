const formFields = [
    { tag: 'input', type: 'text', name: 'username', placeholder: 'Введите имя', label: 'Имя:' },
    { tag: 'input', type: 'text', name: 'email', placeholder: 'Email', label: 'Email:' },
    { tag: 'input', type: 'tel', name: 'phone', placeholder: 'Номер телефона', label: 'Телефон:' },
    { tag: 'input', type: 'text', name: 'adults', placeholder: 'Количество взрослых', label: 'Введите количество взрослых (14+):' },
    { tag: 'input', type: 'text', name: 'children', placeholder: 'Количество детей', label: 'Введите количество детей (3-14):' }
];

function showInfo(htmlMessage) {
    let infoBox = document.getElementById('infoMessage');
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.id = 'infoMessage';
        infoBox.style.marginTop = '15px';
        infoBox.style.padding = '10px';
        infoBox.style.borderRadius = '5px';
        infoBox.style.backgroundColor = '#d4edda'; 
        infoBox.style.color = '#155724'; 
        const centerCol = document.querySelector('.center-column');
        centerCol.appendChild(infoBox);
    }
    infoBox.innerHTML = htmlMessage;
}

const validationRules = {
    username: (value) => {
        if (!value.trim()) return "Имя обязательно для заполнения";
        if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) return "Имя может содержать только буквы";
        if (value.length < 2) return "Имя слишком короткое";
        return "";
    },
    email: (value) => {
        if (!value.trim()) return "Email обязателен";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Введите корректный email";
        return "";
    },
    phone: (value) => {
        if (!value.trim()) return "Телефон обязателен";
        if (!/^\+\d{10,15}$/.test(value)) return "Телефон должен начинаться с + и содержать от 10 до 15 цифр";
        return "";
    },
    adults: (value) => {
        if (!value.trim()) return "Укажите количество взрослых";
        if (!/^\d+$/.test(value)) return "Введите только число";
        return "";
    },
    children: (value) => {
        if (!value.trim()) return "Укажите количество детей (можно 0)";
        if (!/^\d+$/.test(value)) return "Введите только число";
        return "";
    }
};

function validateSingleField(input, fieldName) {
    const errorElement = document.getElementById(`error-${fieldName}`);
    const rule = validationRules[fieldName];
    
    if (rule) {
        const errorMessage = rule(input.value);
        if (errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.classList.add('error-input');
            return false;
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.classList.remove('error-input');
            return true;
        }
    }
    return true;
}

function createFormFields(fieldsArray, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.innerHTML = '';
    
    fieldsArray.forEach(fieldData => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('form-field');

        const label = document.createElement('label');
        label.textContent = fieldData.label;

        const input = document.createElement('input');
        input.type = fieldData.type;
        input.name = fieldData.name;
        input.placeholder = fieldData.placeholder;

        const errorSpan = document.createElement('div');
        errorSpan.id = `error-${fieldData.name}`;
        errorSpan.classList.add('error-message');

        input.addEventListener('input', function() {
            validateSingleField(input, fieldData.name);
        });

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        fieldWrapper.appendChild(errorSpan);
        form.appendChild(fieldWrapper);
    });

    const submitWrapper = document.createElement('div');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Забронировать';
    submitButton.classList.add('styled-button');
    
    submitWrapper.appendChild(submitButton);
    form.appendChild(submitWrapper);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        let isFormValid = true;

        fieldsArray.forEach(fieldData => {
            const input = form.querySelector(`input[name="${fieldData.name}"]`);
            const isFieldValid = validateSingleField(input, fieldData.name);
            if (!isFieldValid) isFormValid = false; 
        });

        if (!isFormValid) {
            const infoBox = document.getElementById('infoMessage');
            if (infoBox) infoBox.style.display = 'none';
            return; 
        }

        const name = form.querySelector('input[name="username"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const adults = form.querySelector('input[name="adults"]').value;
        const children = form.querySelector('input[name="children"]').value;

        console.log(`Успешное бронирование:\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nВзрослые: ${adults}\nДети: ${children}`);
        
        const infoBox = document.getElementById('infoMessage');
        if (infoBox) infoBox.style.display = 'block'; 
        showInfo(`Спасибо, <strong>${name}</strong>! Ваша заявка на бронирование принята!`);

        form.querySelectorAll('input').forEach(input => {
            if (input.type !== 'submit') {
                input.value = '';
                input.classList.remove('error-input'); 
            }
        });
    });

    showInfo(`Форма успешно создана! Пожалуйста, заполните все поля.`);
}

document.addEventListener('DOMContentLoaded', function() {
    createFormFields(formFields, 'myForm');
});