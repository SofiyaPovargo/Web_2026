let taxiPark = {};

function AddCar(name, info) {
    taxiPark[name] = info;
    console.log(`Машина "${name}" успешно добавлена!`);
    showMessage(`Машина "${name}" успешно добавлена!`);
}

function DeleteCar(name) {
    if (taxiPark.hasOwnProperty(name)) {
        delete taxiPark[name];
        console.log(`Машина "${name}" удалена!`);
        showMessage(`Машина "${name}" удалена!`);
    } else {
        console.log(`Машина "${name}" не найдена!`);
        showMessage(`Машина "${name}" не найдена!`);
    }
}

function GetCarInfo(name) {
    if (taxiPark.hasOwnProperty(name)) {
        console.log(`Название машины: ${name}\nОписание: ${taxiPark[name]}`);
        showMessage(`Название машины: ${name}\nОписание: ${taxiPark[name]}`);
    } else {
        console.log(`Машина "${name}" не найдена!`);
        showMessage(`Машина "${name}" не найдена!`);
    }
}

function ListCars() {
    if (Object.keys(taxiPark).length === 0) {
        console.log("В таксопарке нет машин!");
        showMessage("В таксопарке нет машин!");
        return;
    }
    
    let result = "СПИСОК ВСЕХ МАШИН:\n\n";
    for (let name in taxiPark) {
        result += `🚗 ${name}\n📝 ${taxiPark[name]}\n\n`;
    }
    console.log(result);
    showMessage(result);
}

function showMessage(text) {
    let messageDiv = document.getElementById('message-area');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'message-area';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.padding = '15px';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.maxWidth = '500px';
        messageDiv.style.whiteSpace = 'pre-wrap';
        messageDiv.style.textAlign = 'left';
        messageDiv.style.fontSize = '14px';
        
        const container = document.querySelector('.container');
        container.appendChild(messageDiv);
    }
    
    messageDiv.textContent = text;
    
}