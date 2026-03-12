const formFields = [
    { tag: 'input', type: 'text', name: 'username', placeholder: 'Введите имя', label: 'Имя:' },
    { tag: 'input', type: 'email', name: 'email', placeholder: 'Email', label: 'Email:' },
    { tag: 'input', type: 'text', name: 'text', placeholder: 'количество взрослых', label: 'Введите количество взрослых (14+):' },
    { tag: 'input', type: 'text', name: 'text', placeholder: 'количество детей', label: 'Введите количество детей (3-14):' }
];

/**
 * Функция для динамической генерации полей формы
 * @param {Array} fieldsArray - массив объектов с настройками полей
 * @param {String} formId - имя (атрибут name) или ID формы
 */
function createFormFields(fieldsArray, formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    fieldsArray.forEach(fieldData => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.style.marginBottom = '10px';

        const label = document.createElement('label');
        label.textContent = fieldData.label + ': ';
        label.style.display = 'block';

        const input = document.createElement('input');
        input.type = field.type;
        input.name = field.name;
        input.placeholder = fieldData.label;

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        form.appendChild(fieldWrapper);
    });
}

createFormFields(formFields, 'myForm');
