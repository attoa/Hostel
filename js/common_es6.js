//Открытие/закрытие меню
document.querySelector(".hamburger").onclick = () => {
	document.querySelector(".menu").classList.toggle("menu_opened");
};

const submenu = document.querySelector(".menu__sub-menu");
const icon = document.querySelector("#submenu-btn .icon");
//Открытие/закрытие подменю
document.getElementById("submenu-btn").onclick = event => {
	event.preventDefault();	//Запрет перехода по ссылке
	submenu.classList.toggle("menu__sub-menu_opened");
	icon.classList.toggle("icon_rotated");
};
//Закрытие подменю при клике куда-либо
window.addEventListener("click", event => {
	if (event.target.id === "submenu-btn" || event.target.parentElement.id === "submenu-btn")
		return;

	if (submenu.classList.contains("menu__sub-menu_opened")) {
		submenu.classList.remove("menu__sub-menu_opened");
		icon.classList.remove("icon_rotated");
	}
});

/*** Прокрутка к верху страницы ***/
//Кнопка прокрутки вверх
const upArrow = document.getElementById("up-arrow");
//Позиция верха экрана в координатах страницы
let currentScroll = 0;

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
class ScrollableItem {
	constructor(object) {
		this.item = object;						 //Ссылка на связанный контейнер в DOM
		this.number = this.item.children.length; //Кол-во элементов внутри контейнера
		this.first = 1;							 //Номер первого видимого элемента
		this.durationInit = getComputedStyle(this.item).transitionDuration;	//Длительность анимации

		//Обработчики событий
		this.item.addEventListener("touchstart", event => { this.touchStart(event); });
		this.item.addEventListener("touchmove", event => { this.touchMove(event); });
		this.item.addEventListener("touchend", event => { this.touchEnd(event); });

		//Получение параметров контейнеров:
		//при загрузке
		window.addEventListener("load", () => { this.scroll(0) });
		//при изменении ширины экрана
		window.addEventListener("resize", () => { this.scroll(0) });
	}

	//Получение значений величин, зависимых от размера экрана
	count() {
		//Элемент внутри контейнера
		const elem = this.item.children[0];
		//Ширина элемента внутри контейнера вместе с отступами
		this.itemWidth = elem.clientWidth + parseInt(getComputedStyle(elem).marginLeft) * 2;
		//Кол-во видимых элементов внутри контейнера
		this.shown = Math.round(this.item.clientWidth / this.itemWidth);
	}

	/*Прокрутка контейнера с фото
		если step > 0 - прокрутка влево,
		если step < 0 - прокрутка вправо
		если step = 0 - пересчёт значения св-ва left (исп-ся при изменении ширины окна)*/
	scroll(step) {
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
	}

	//Прокрутка касанием по экрану
	touchStart(event) {
		//Запомнить X-координату места касания
		this.startTouchX = event.touches[0].clientX;
		//Сброс анимации
		this.item.style.transitionDuration = "0s";
	}
	touchMove(event) {
		//Длина перемещения
		this.changeTouchX = this.startTouchX - event.touches[0].clientX;
		//Перемещение контейнера вслед за пальцем
		this.item.style.left = ( -((this.first - 1) * this.itemWidth) - this.changeTouchX).toString() + "px";
	}
	touchEnd() {
		//Если длина перемещения не 0
		if (this.changeTouchX) {
			//Шаг - скольким целым ширинам элемента соответствует длина перемещения
			let step = Math.round(this.changeTouchX / this.itemWidth);

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
	}

	//Установка ссылок на стрелки
	setArrows(arrowLeft, arrowRight) {
		this.arrowLeft = arrowLeft;
		this.arrowRight = arrowRight;

		this.arrowLeft.addEventListener("click", () => { this.scroll(-1); });
		this.arrowRight.addEventListener("click", () => { this.scroll(1); });
	}

	//Установка состояния стрелок контейнера (видны/скрыты)
	setArrowsState() {
		if (!this.arrowLeft || !this.arrowRight)
			return;

		this.arrowLeft.classList.remove("arrow-unactive-scroll");
		this.arrowRight.classList.remove("arrow-unactive-scroll");

		if (this.first === this.number - this.shown + 1)
			this.arrowRight.classList.add("arrow-unactive-scroll");
		if (this.first === 1)
			this.arrowLeft.classList.add("arrow-unactive-scroll");
	}
}



/*** Класс модального окна ***/
class Modal {
	constructor(galleries) {
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

		//Перебор массива галерей (наборов изображений)
		[...arguments].forEach(gallery => { this.addGallery(gallery); });

		//Обработчик для закрытия модального окна
		this.modal.onclick = event => {
			const t = event.target.classList;
			if (t.contains("modal__image") || t.contains("modal__btn_exit"))
				this.close();
		};

		//Обработчики для прокрутки фото в модальном окне
		this.arrowLeft.onclick = () => { this.scroll(-1); };
		this.arrowRight.onclick = () => { this.scroll(1); };
		this.modalCont.addEventListener("touchstart", event => { this.touchStart(event); });
		this.modalCont.addEventListener("touchmove", event => { this.touchMove(event); });
		this.modalCont.addEventListener("touchend", event => { this.touchEnd(event); });

		//Обработчик нажатия клавиш, привязанный к текущему контексту
		this.keyHandlerBound = this.keyHandler.bind(this);
	}

	//Добавление галереи
	addGallery(gallery) {
		//Привязка обработчика для открытия модального окна
		for (const image of gallery)
			image.addEventListener("click", event => { this.open(image, gallery, event); });
	}

	//Установка изображений в модальном окне
	display() {
		//Предыдущее изображение
		const prevImg = this.imgList[this.imgNumber - 1];
		if (prevImg) {
			this.modalImgs[0].src = prevImg.src || prevImg.href;
			this.modalImgs[0].style.visibility = "initial";
		} else
			this.modalImgs[0].style.visibility = "hidden";

		//Текущее изображение
		const currImg = this.imgList[this.imgNumber];
		this.modalImgs[1].src = currImg.src || currImg.href;

		//Следующее изображение
		const nextImg = this.imgList[this.imgNumber + 1];
		if (nextImg) {
			this.modalImgs[2].src = nextImg.src || nextImg.href;
			this.modalImgs[2].style.visibility = "initial";
		} else
			this.modalImgs[2].style.visibility = "hidden";

		//Отображение номера текущего изображения
		if (this.modalCounter)
			this.modalCounter.innerHTML = this.imgNumber+1 + " / " + this.imgList.length;
	}

	//Открытие модального окна
	open(img, imgList, event) {
		event.preventDefault();

		//Список изображений для прокрутки
		this.imgList = imgList;

		//Порядковый номер открываемого изображения
		this.imgNumber = [].indexOf.call(this.imgList, img);

		//Установка изображений в модальном окне
		this.display();

		//Установка состояния стрелок
		this.setArrowsState();

		//Показ модального окна
		this.modal.style.display = "block";
		//Запрет прокрутки страницы
		document.body.style.overflow = "hidden";
		//Добавление события нажатия клавиш
		window.addEventListener("keydown", this.keyHandlerBound);
	}

	//Закрытие модального окна
	close() {
		//Скрытие модального окна
		this.modal.style.display = "none";
		//Разрешение прокрутки страницы
		document.body.style.overflow = "visible";
		//Удаление события нажатия клавиш
		window.removeEventListener("keydown", this.keyHandlerBound);
	}

	/*Прокрутка фото в модальном окне
		если direction = -1 - прокрутка влево,
		если direction = 1 - прокрутка вправо*/
	scroll(direction) {
		if (this.imgNumber + direction >= 0 && this.imgNumber + direction < this.imgList.length) {
			if (direction === 1) this.modalCont.style.left = "-200%";
			else if (direction === -1) this.modalCont.style.left = "0";
			else return;

			this.imgNumber += direction;

			//Задержка для окончания анимации
			setTimeout(() => {
				this.modalCont.style.transitionDuration = "0s";
				this.display();
				this.modalCont.style.left = "-100%";
				//Задержка для применения браузером св-ва transition-duration
				setTimeout(() => {
					this.modalCont.style.transitionDuration = this.animDurat + "s";
				}, 150);
			}, this.animDurat * 1000);

			this.setArrowsState();
		}
	}

	touchStart(event) {
		//Запомнить X-координату места касания
		this.startTouchX = event.touches[0].clientX;
		//Сброс анимации
		this.modalCont.style.transitionDuration = "0s";
	}
	touchMove(event) {
		event.preventDefault();
		//Длина перемещения
		this.changeTouchX = this.startTouchX - event.touches[0].clientX;
		//Перемещение контейнера вслед за пальцем
		this.modalCont.style.left = "calc(-100% - " + this.changeTouchX + "px)";
	}
	touchEnd(event) {
		//Восстановление анимации
		this.modalCont.style.transitionDuration = this.animDurat + "s";

		//Если длина перемещения не 0
		if (this.changeTouchX) {
			//Минимальная длина перемещения для пролистывания
			const min = window.innerWidth * 0.1;

			if (this.changeTouchX > min && this.imgNumber < this.imgList.length - 1)
				this.scroll(1);
			else if (this.changeTouchX < -min && this.imgNumber > 0)
				this.scroll(-1);
			else
				this.modalCont.style.left = "-100%";
		}

		this.startTouchX = undefined;
		this.changeTouchX = undefined;
	}

	//Обработчик нажатия клавиш в модальном окне
	keyHandler(event) {
		switch (event.keyCode) {
			//Прокрутка фото клавишами влево/вправо
			case 37: this.scroll(-1); break;
			case 39: this.scroll(1); break;
			//Закрытие окна клавишей Esc
			case 27: this.close(); break;
		}
	}

	//Установка состояния стрелок модального окна (видны/скрыты)
	setArrowsState() {
		this.arrowLeft.style.display = "block";
		this.arrowRight.style.display = "block";

		if (this.imgNumber === 0)
			this.arrowLeft.style.display = "none";
		if (this.imgNumber === this.imgList.length - 1)
			this.arrowRight.style.display = "none";
	}
}
