//Поля формы
const arrivalField = document.querySelector("#field-arrival");
const departureField = document.querySelector("#field-departure");
const quantityField = document.querySelector("#field-quantity");
const nameField = document.querySelector("#field-name");
const phoneField = document.querySelector("#field-phone");

//Элементы формы
const roomCtrl = document.querySelector("#room");
const arrivalCtrl = document.querySelector("#arrival-date");
const departureCtrl = document.querySelector("#departure-date");
const quantityCtrl = document.querySelector("#quantity");
const nameCtrl = document.querySelector("#name");
const phoneCtrl = document.querySelector("#phone");

//Объект для вывода сообщений
const messagesDiv = document.querySelector(".messages");

//Отправка формы
document.querySelector(".form__btn").onclick = event => {
	event.preventDefault();

	//Очистка объекта для вывода сообщений
	while (messagesDiv.firstChild)
		messagesDiv.removeChild(messagesDiv.firstChild);

	//Удаление маркеров ошибки с полей формы
	[arrivalField, departureField, quantityField, nameField, phoneField].forEach(field => {
		field.classList.remove("form__field_error");
	});

	//Данные для отправки на сервер
	const data = {
		//Флаг
		submit: true,
		//Значения полей формы
		room: roomCtrl.value,
		arrivalDate: arrivalCtrl.value,
		departureDate: departureCtrl.value,
		quantity: quantityCtrl.value,
		name: nameCtrl.value,
		phone: phoneCtrl.value
	};

	//Отправка данных на сервер
	sendAjax(data, responseHandler);

	function responseHandler(response) {
		if (response) {
			response = JSON.parse(response);

			//Введённые данные корректны - вывод сообщения с данными заказа
			if (response.errors === false) {
				const { message, use, ul } = createMessage();
				message.classList.add("message_success");
				use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "img/svg/icons.svg#Success");

				//Подписи к данным заказа
				const titles = { bookingId: "Номер заказа: ", room: "Комната: ", 
								arrivalDate: "Дата заселения: ", departureDate: "Дата выселения: ", 
								quantity: "Количество человек: ", name: "Ф.И.О.: ", 
								phone: "Номер телефона: ", totalPrice: "Стоимость, руб.: " };

				//Изменение значения свойства "room" с цифрового на текстовое
				switch (response.data["room"]) {
					case 1: response.data["room"] = "Мужская комната на 12 мест"; break;
					case 2: response.data["room"] = "Женская комната на 12 мест"; break;
					case 3: response.data["room"] = "Смешанная комната на 12 мест"; break;
					case 4: response.data["room"] = "Комната для двоих"; break;
				}

				//Добавление пунктов списка
				for (const key in titles) {
					let li = ul.appendChild(document.createElement("li"));
					li.innerHTML = titles[key] + response.data[key];
				}

				//Скрыть форму
				document.querySelector(".form").style.display = "none";
			}

			//Во введённых данных есть ошибки - добавление маркеров ошибки на соответствующие элементы формы
			else {
				if (response.errors.date === true) {
					arrivalField.classList.add("form__field_error");
					departureField.classList.add("form__field_error");
				}
				if (response.errors.qty === true || response.errors.vacant === true) {
					quantityField.classList.add("form__field_error");
					const p = quantityField.querySelector("p");

					if (response.errors.qty === true) p.innerHTML = p.dataset.errorQty;
					else p.innerHTML = p.dataset.errorVacant;
				}
				if (response.errors.name === true) {
					nameField.classList.add("form__field_error");
				}
				if (response.errors.phone === true) {
					phoneField.classList.add("form__field_error");
				}

				//Вывод сообщения с ошибкой сервера
				if (response.errors.db === true || response.errors.server === true) {
					const { message, use, ul } = createMessage();
					message.classList.add("message-error");
					use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "img/svg/icons.svg#Error");
					const li = ul.appendChild(document.createElement("li"));

					if (response.errors.db === true) li.innerHTML = "Ошибка установки соединения с базой данных";
					else li.innerHTML = "Ошибка сервера";
				}
			}
		}
		else {
			alert("Произошла ошибка отправки данных на сервер");
		}
	}
};

function createMessage() {
	//Добавление сообщения на страницу
	const message = messagesDiv.appendChild(document.createElement("div"));
	message.classList.add("message", "container", "container_narrow");
	//Добавление иконки
	const svg = message.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
	const use = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "use"));
	//Добавление списка
	const ul = message.appendChild(document.createElement("ul"));

	return { message, use, ul };
}


window.addEventListener("load", getPriceAndVacantPlaces);
arrivalCtrl.oninput = getPriceAndVacantPlaces;
departureCtrl.oninput = getPriceAndVacantPlaces;
quantityCtrl.oninput = getPriceAndVacantPlaces;
roomCtrl.onchange = () => {
	if (+roomCtrl.value === 4) {
		quantityCtrl.max = 2;
		quantityCtrl.value = 2;
	}
	else 
		quantityCtrl.max = 12;
	getPriceAndVacantPlaces();
};

//Обновление стоимости и кол-ва свободных мест
function getPriceAndVacantPlaces() {
	//Для вывода стоимости без скидки
	const discountOutput = document.querySelector("#discount-price");
	//Для вывода стоимости со скидкой
	const totalOutput = document.querySelector("#total-price");

	//Удаление маркера ошибки
	quantityField.classList.remove("form__field_error");

	//Данные для отправки на сервер
	const data = {
		//Флаг
		update: true,
		//Значения полей формы
		room: roomCtrl.value,
		arrivalDate: arrivalCtrl.value,
		departureDate: departureCtrl.value,
		quantity: quantityCtrl.value
	};

	//Отправка данных на сервер
	sendAjax(data, responseHandler);

	function responseHandler(response) {
		if (response) {
			response = JSON.parse(response);

			//Обновление стоимости
			if (response.totalPrice !== false) {
				discountOutput.innerHTML = response.totalPrice + " р.";
				totalOutput.innerHTML = response.discountPrice + " р.";
			}
			else {
				discountOutput.innerHTML = "--- р.";
				totalOutput.innerHTML = "--- р.";
			}

			//Обновление информации о свободных местах
			if (response.vacantPlaces !== false) {
				const p = quantityField.querySelector("p");

				if (response.capacity < data.quantity) {
					quantityField.classList.add("form__field_error");
					p.innerHTML = p.dataset.errorQty;
				}
				else if (response.vacantPlaces < data.quantity) {
					quantityField.classList.add("form__field_error");
					p.innerHTML = p.dataset.errorVacant;
				}
			}
		}
		else {
			discountOutput.innerHTML = "--- р.";
			totalOutput.innerHTML = "--- р.";
		}
	}
}

//Отправка ajax-запроса
function sendAjax(data, handler) {
	const ajax = new XMLHttpRequest();

	ajax.onreadystatechange = () => {
		if (ajax.readyState === 4) {	//Прием ответа от сервера завершён
			if (ajax.status === 200)	//Запрос обработан успешно
				handler(ajax.responseText);
			else
				handler(false);
		}
	};

	//Настройка запроса
	ajax.open("POST", "__booking_ajax.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	//Формирование строки запроса
	let requestString = "";
	for (const prop in data)
		requestString += `${prop}=${encodeURIComponent(data[prop])}&`;

	//Отправка запроса
	ajax.send(requestString);
}
