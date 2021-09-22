//Поля формы
var arrivalField = document.querySelector("#field-arrival");
var departureField = document.querySelector("#field-departure");
var quantityField = document.querySelector("#field-quantity");
var nameField = document.querySelector("#field-name");
var phoneField = document.querySelector("#field-phone");

//Элементы формы
var roomCtrl = document.querySelector("#room");
var arrivalCtrl = document.querySelector("#arrival-date");
var departureCtrl = document.querySelector("#departure-date");
var quantityCtrl = document.querySelector("#quantity");
var nameCtrl = document.querySelector("#name");
var phoneCtrl = document.querySelector("#phone");

//Объект для вывода сообщений
var messagesDiv = document.querySelector(".messages");

//Отправка формы
document.querySelector(".form__btn").onclick = function(event) {
	event.preventDefault();

	//Очистка объекта для вывода сообщений
	while (messagesDiv.firstChild)
		messagesDiv.removeChild(messagesDiv.firstChild);

	//Удаление маркеров ошибки с полей формы
	[arrivalField, departureField, quantityField, nameField, phoneField].forEach(function(field) {
		field.classList.remove("form__field_error");
	});

	//Данные для отправки на сервер
	var data = {
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
				messageObj = createMessage();
				messageObj.message.classList.add("message_success");
				messageObj.use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "img/svg/icons.svg#Success");

				//Подписи к данным заказа
				var titles = { bookingId: "Номер заказа: ", room: "Комната: ", 
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
				Object.keys(titles).forEach(function(key) {
					var li = messageObj.ul.appendChild(document.createElement("li"));
					li.innerHTML = titles[key] + response.data[key];
				});

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
					var p = quantityField.querySelector("p");

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
					messageObj = createMessage();
					messageObj.message.classList.add("message-error");
					messageObj.use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "img/svg/icons.svg#Error");
					var li = messageObj.ul.appendChild(document.createElement("li"));

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
	var message = messagesDiv.appendChild(document.createElement("div"));
	message.classList.add("message", "container", "container_narrow");
	//Добавление иконки
	var svg = message.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
	var use = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "use"));
	//Добавление списка
	var ul = message.appendChild(document.createElement("ul"));

	return { message: message, use: use, ul: ul };
}


window.addEventListener("load", getPriceAndVacantPlaces);
arrivalCtrl.oninput = getPriceAndVacantPlaces;
departureCtrl.oninput = getPriceAndVacantPlaces;
quantityCtrl.oninput = getPriceAndVacantPlaces;
roomCtrl.onchange = function() {
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
	var discountOutput = document.querySelector("#discount-price");
	//Для вывода стоимости со скидкой
	var totalOutput = document.querySelector("#total-price");

	//Удаление маркера ошибки
	quantityField.classList.remove("form__field_error");

	//Данные для отправки на сервер
	var data = {
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
				var p = quantityField.querySelector("p");

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
	var ajax = new XMLHttpRequest();

	ajax.onreadystatechange = function() {
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
	var requestString = "";
	Object.keys(data).forEach(function(prop) {
		requestString += prop + "=" + encodeURIComponent(data[prop]) + "&";
	});

	//Отправка запроса
	ajax.send(requestString);
}
