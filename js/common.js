//Открытие/закрытие меню
document.querySelector(".hamburger").onclick = function() {
	document.querySelector(".menu").classList.toggle("menu_opened");
};

//Для вызова свойства classList на svg в IE11
if (!Object.getOwnPropertyDescriptor(Element.prototype,'classList')) {
	if (HTMLElement && Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList')) {
		Object.defineProperty(Element.prototype,'classList',Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList'));
	}
}

var submenu = document.querySelector(".menu__sub-menu");
var icon = document.querySelector("#submenu-btn .icon");
//Открытие/закрытие подменю
document.getElementById("submenu-btn").onclick = function(event) {
	event.preventDefault();	//Запрет перехода по ссылке
	submenu.classList.toggle("menu__sub-menu_opened");
	icon.classList.toggle("icon_rotated");
};
//Закрытие подменю при клике куда-либо
window.addEventListener("click", function(event) {
	if (event.target.id === "submenu-btn" || event.target.parentElement.id === "submenu-btn")
		return;

	if (submenu.classList.contains("menu__sub-menu_opened")) {
		submenu.classList.remove("menu__sub-menu_opened");
		icon.classList.remove("icon_rotated");
	}
});

/*** Прокрутка к верху страницы ***/
//Кнопка прокрутки вверх
var upArrow = document.getElementById("up-arrow");
//Позиция верха экрана в координатах страницы
var currentScroll = 0;

//Скрытие стрелки вверху страницы
window.addEventListener("scroll", function() {
	currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	if (currentScroll === 0)
		upArrow.style.display = "none";
	else
		upArrow.style.display = "block";
});
//Прокрутка к верху страницы
upArrow.onclick = function up() {
	if (currentScroll > 0) {
		window.requestAnimationFrame(up);
		window.scrollTo(0, currentScroll - (currentScroll / 5));
	}
};



/*** Класс прокручиваемого контейнера ***/
function ScrollableItem(object) {
	this.item = object;						 //Ссылка на связанный контейнер в DOM
	this.number = this.item.children.length; //Кол-во элементов внутри контейнера
	this.first = 1;							 //Номер первого видимого элемента
	this.durationInit = getComputedStyle(this.item).transitionDuration;	//Длительность анимации

	//Обработчики событий
	var self = this;
	this.item.addEventListener("touchstart", function(event) { self.touchStart(event); });
	this.item.addEventListener("touchmove", function(event) { self.touchMove(event); });
	this.item.addEventListener("touchend", function(event) { self.touchEnd(event); });

	//Получение параметров контейнеров:
	//при загрузке
	window.addEventListener("load", function() { self.scroll(0) });
	//при изменении ширины экрана
	window.addEventListener("resize", function() { self.scroll(0) });
}

//Получение значений величин, зависимых от размера экрана
ScrollableItem.prototype.count = function() {
	//Элемент внутри контейнера
	var elem = this.item.children[0];
	//Ширина элемента внутри контейнера вместе с отступами
	this.itemWidth = elem.clientWidth + parseInt(getComputedStyle(elem).marginLeft) * 2;
	//Кол-во видимых элементов внутри контейнера
	this.shown = Math.round(this.item.clientWidth / this.itemWidth);
};

/*Прокрутка контейнера с фото
	если step > 0 - прокрутка влево,
	если step < 0 - прокрутка вправо
	если step = 0 - пересчёт значения св-ва left (исп-ся при изменении ширины окна)*/
ScrollableItem.prototype.scroll = function(step) {
	if (step !== 0)
		this.first += step; //Изменение номера первого видимого элемента
	else
		this.count();

	//Вышел ли этот номер за границы
	if (this.first > this.number - this.shown + 1)
		this.first = this.number - this.shown + 1;
	else if (this.first < 1)
		this.first = 1;

	this.item.style.left = -((this.first - 1) * this.itemWidth).toString() + "px";

	this.setArrowsState();
};

//Прокрутка касанием по экрану
ScrollableItem.prototype.touchStart = function(event) {
	//Запомнить X-координату места касания
	this.startTouchX = event.touches[0].clientX;
	//Сброс анимации
	this.item.style.transitionDuration = "0s";
};
ScrollableItem.prototype.touchMove = function(event) {
	//Длина перемещения
	this.changeTouchX = this.startTouchX - event.touches[0].clientX;
	//Перемещение контейнера вслед за пальцем
	this.item.style.left = ( -((this.first - 1) * this.itemWidth) - this.changeTouchX).toString() + "px";
};
ScrollableItem.prototype.touchEnd = function() {
	//Если длина перемещения не 0
	if (this.changeTouchX) {
		//Шаг - скольким целым ширинам элемента соответствует длина перемещения
		var step = Math.round(this.changeTouchX / this.itemWidth);

		//Изменить шаг, если было перемещение хотя бы на 1/10 от ширины элемента
		if (step === 0 && Math.abs(this.changeTouchX % this.itemWidth) > this.itemWidth / 10)
			if (this.changeTouchX > 0) step++;
			else step--;

		this.scroll(step);
	}

	//Восстановление анимации
	this.item.style.transitionDuration = this.durationInit;

	this.startTouchX = undefined;
	this.changeTouchX = undefined;
};

//Установка ссылок на стрелки
ScrollableItem.prototype.setArrows = function(arrowLeft, arrowRight) {
	this.arrowLeft = arrowLeft;
	this.arrowRight = arrowRight;

	var self = this;
	this.arrowLeft.addEventListener("click", function() { self.scroll(-1); });
	this.arrowRight.addEventListener("click", function() { self.scroll(1); });
};

//Установка состояния стрелок контейнера (видны/скрыты)
ScrollableItem.prototype.setArrowsState = function() {
	if (!this.arrowLeft || !this.arrowRight)
		return;

	this.arrowLeft.classList.remove("arrow-unactive-scroll");
	this.arrowRight.classList.remove("arrow-unactive-scroll");

	if (this.first === this.number - this.shown + 1)
		this.arrowRight.classList.add("arrow-unactive-scroll");
	if (this.first === 1)
		this.arrowLeft.classList.add("arrow-unactive-scroll");
};



/*** Класс модального окна ***/
function Modal(galleries) {
	//Модальное окно
	this.modal = document.querySelector(".modal");
	//Элементы для показа изображений
	this.modalImgs = this.modal.querySelectorAll(".modal__image img");
	//Контейнер изображений
	this.modalCont = this.modal.querySelector(".modal__images");
	//Элемент для отображения номера текущего изображения
	this.modalCounter = this.modal.querySelector(".modal__counter");
	//Стрелки для прокрутки фото
	this.arrowLeft = this.modal.querySelector(".modal__btn_left");
	this.arrowRight = this.modal.querySelector(".modal__btn_right");

	//Длительность анимации
	this.animDurat = parseFloat(getComputedStyle(this.modalCont).transitionDuration);
	//Номер изображения в модальном окне
	this.imgNumber = 0;

	var self = this;

	//Перебор массива галерей (наборов изображений)
	var _galleries = Array.prototype.slice.call(arguments);
	_galleries.forEach(function(gallery) { self.addGallery(gallery); });

	//Обработчик для закрытия модального окна
	this.modal.onclick = function(event) {
		var t = event.target.classList;
		if (t.contains("modal__image") || t.contains("modal__btn_exit"))
			self.close();
	};

	//Обработчики для прокрутки фото в модальном окне
	this.arrowLeft.onclick = function() { self.scroll(-1); };
	this.arrowRight.onclick = function() { self.scroll(1); };
	this.modalCont.addEventListener("touchstart", function(event) { self.touchStart(event); });
	this.modalCont.addEventListener("touchmove", function(event) { self.touchMove(event); });
	this.modalCont.addEventListener("touchend", function(event) { self.touchEnd(event); });

	//Обработчик нажатия клавиш, привязанный к текущему контексту
	this.keyHandlerBound = this.keyHandler.bind(this);
}

//Добавление галереи
Modal.prototype.addGallery = function(gallery) {
	var self = this;
	//Привязка обработчика для открытия модального окна
	for (var i = 0; i < gallery.length; i++)
		gallery[i].addEventListener("click", function(event) { self.open(this, gallery, event); });
};

//Установка изображений в модальном окне
Modal.prototype.display = function() {
	//Предыдущее изображение
	var prevImg = this.imgList[this.imgNumber - 1];
	if (prevImg) {
		this.modalImgs[0].src = prevImg.src || prevImg.href;
		this.modalImgs[0].style.visibility = "initial";
	} else
		this.modalImgs[0].style.visibility = "hidden";

	//Текущее изображение
	var currImg = this.imgList[this.imgNumber];
	this.modalImgs[1].src = currImg.src || currImg.href;

	//Следующее изображение
	var nextImg = this.imgList[this.imgNumber + 1];
	if (nextImg) {
		this.modalImgs[2].src = nextImg.src || nextImg.href;
		this.modalImgs[2].style.visibility = "initial";
	} else
		this.modalImgs[2].style.visibility = "hidden";

	//Отображение номера текущего изображения
	if (this.modalCounter)
		this.modalCounter.innerHTML = this.imgNumber+1 + " / " + this.imgList.length;
};

//Открытие модального окна
Modal.prototype.open = function(img, imgList, event) {
	event.preventDefault();

	//Список изображений для прокрутки
	this.imgList = imgList;

	//Порядковый номер открываемого изображения
	this.imgNumber = Array.prototype.indexOf.call(this.imgList, img);

	//Установка изображения в модальном окне
	this.display();

	//Установка состояния стрелок
	this.setArrowsState();

	//Показ модального окна
	this.modal.style.display = "block";
	//Запрет прокрутки страницы
	document.body.style.overflow = "hidden";
	//Добавление события нажатия клавиш
	window.addEventListener("keydown", this.keyHandlerBound);
};

//Закрытие модального окна
Modal.prototype.close = function() {
	//Скрытие модального окна
	this.modal.style.display = "none";
	//Разрешение прокрутки страницы
	document.body.style.overflow = "visible";
	//Удаление события нажатия клавиш
	window.removeEventListener("keydown", this.keyHandlerBound);
};

/*Прокрутка фото в модальном окне
	если direction = -1 - прокрутка влево,
	если direction = 1 - прокрутка вправо*/
Modal.prototype.scroll = function(direction) {
	if (this.imgNumber + direction >= 0 && this.imgNumber + direction < this.imgList.length) {
		if (direction === 1) this.modalCont.style.left = "-200%";
		else if (direction === -1) this.modalCont.style.left = "0";
		else return;

		this.imgNumber += direction;

		var self = this;
		//Задержка для окончания анимации
		setTimeout(function() {
			self.modalCont.style.transitionDuration = "0s";
			self.display();
			self.modalCont.style.left = "-100%";
			//Задержка для применения браузером св-ва transition-duration
			setTimeout(function() {
				self.modalCont.style.transitionDuration = self.animDurat + "s";
			}, 150);
		}, this.animDurat * 1000);

		this.setArrowsState();
	}
};

Modal.prototype.touchStart = function(event) {
	//Запомнить X-координату места касания
	this.startTouchX = event.touches[0].clientX;
	//Сброс анимации
	this.modalCont.style.transitionDuration = "0s";
};
Modal.prototype.touchMove = function(event) {
	event.preventDefault();
	//Длина перемещения
	this.changeTouchX = this.startTouchX - event.touches[0].clientX;
	//Перемещение контейнера вслед за пальцем
	this.modalCont.style.left = "calc(-100% - " + this.changeTouchX + "px)";
};
Modal.prototype.touchEnd = function(event) {
	//Восстановление анимации
	this.modalCont.style.transitionDuration = this.animDurat + "s";

	//Если длина перемещения не 0
	if (this.changeTouchX) {
		//Минимальная длина перемещения для пролистывания
		var min = window.innerWidth * 0.1;

		if (this.changeTouchX > min && this.imgNumber < this.imgList.length - 1)
			this.scroll(1);
		else if (this.changeTouchX < -min && this.imgNumber > 0)
			this.scroll(-1);
		else
			this.modalCont.style.left = "-100%";
	}

	this.startTouchX = undefined;
	this.changeTouchX = undefined;
};

//Обработчик нажатия клавиш в модальном окне
Modal.prototype.keyHandler = function(event) {
	switch (event.keyCode) {
		//Прокрутка фото клавишами влево/вправо
		case 37: this.scroll(-1); break;
		case 39: this.scroll(1); break;
		//Закрытие окна клавишей Esc
		case 27: this.close(); break;
	}
};

//Установка состояния стрелок модального окна (видны/скрыты)
Modal.prototype.setArrowsState = function() {
	this.arrowLeft.style.display = "block";
	this.arrowRight.style.display = "block";

	if (this.imgNumber === 0)
		this.arrowLeft.style.display = "none";
	if (this.imgNumber === this.imgList.length - 1)
		this.arrowRight.style.display = "none";
};



/*** Полифилл для загрузки внешних svg файлов в IE11 ***/
if (document.body.style["msTextCombineHorizontal"] != undefined) {	//Распознавание IE11
	//Массив с данными элементов <svg> на странице
	var svgsOnPage = [];
	//Элементы <use> на странице
	var useList = document.getElementsByTagName("use");

	//Получение массива данных элементов <svg>
	Array.prototype.forEach.call(useList, function(use) {
		svgsOnPage.push({
			svg: use.parentNode,
			id: (use.getAttribute("xlink:href")).split("#")[1]
		});
	});

	if (useList.length) {
		sendAjax(function(response) {
			//Перевод полученного svg из текстового формата в DOM-объект
			var parser = new DOMParser();
			var svgsResponce = parser.parseFromString(response, "text/html");

			//Перебор массива данных <svg>
			svgsOnPage.forEach(function(svgOnPage) {
				//Удаление <use> в <svg>
				svgOnPage.svg.removeChild(svgOnPage.svg.firstChild);

				//<symbol> из принятого svg, содержащий данные для вставки в <svg>
				var symbol = svgsResponce.getElementById(svgOnPage.id);
				if (symbol) {
					//Добавление в <svg> дочерних элементов из принятого svg
					Array.prototype.forEach.call(symbol.childNodes, function(svgChild) {
						if (svgChild.nodeName !== "#text")
							svgOnPage.svg.appendChild(svgChild.cloneNode(true));
					});
					//Добавление в <svg> атрибута viewBox из принятого svg
					svgOnPage.svg.setAttribute("viewBox", symbol.getAttribute("viewBox"));
				}
			});
		});
	}

	//Отправка ajax-запроса
	function sendAjax(handler) {
		var ajax = new XMLHttpRequest();

		ajax.onreadystatechange = function() {
			if (ajax.readyState === 4 && ajax.status === 200)
				handler(ajax.responseText);
		};

		//Настройка запроса
		ajax.open("GET", "img/svg/icons.svg");

		//Отправка запроса
		ajax.send();
	}
}
