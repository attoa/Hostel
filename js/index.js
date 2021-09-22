/* Код должен быть красивым */

/*** Карусель ***/
//Контейнер со слайдами
var crsSlides = document.querySelector(".carousel__slides");
//Кнопки
var crsBtnPrev = document.querySelector(".carousel__btn_prev");
var crsBtnNext = document.querySelector(".carousel__btn_next");
crsBtnNext.onclick = function() { crsSlideNext(1); };
crsBtnPrev.onclick = function() { crsSlidePrev(1); };

//Таймер автоматической прокрутки
var crsSliderTimer = crsStartTimer();
//Номер текущего слайда
var crsCurrent = 0;
//Длительность анимации
var crsAnimDurat = parseFloat(getComputedStyle(crsSlides).transitionDuration);

//Массив кнопок-точек
var crsDots = document.querySelectorAll(".carousel__dot");
if (crsDots.length) {
	crsDots[crsCurrent].classList.add("carousel__dot_active");

	//Привязка обработчиков нажатия на каждую точку
	for (var i = 0; i < crsDots.length; i++) {
		crsDots[i].onclick = function() {
			//Шаг пролистывания
			var step = Array.prototype.indexOf.call(crsDots, this) - crsCurrent;
			if (step < 0)
				crsSlidePrev(Math.abs(step));
			else if (step > 0)
				crsSlideNext(step);
		}
	}
}

//Установка таймера
function crsStartTimer() {
	return setInterval(function() { crsSlideNext(1); }, 6000);
}

//Прокрутка вправо
function crsSlideNext(step) {
	//Остановка таймера
	clearInterval(crsSliderTimer);

	crsSlides.style.left = -step + "00%";

	//Задержка для окончания анимации
	setTimeout(function() {
		crsSlides.style.transitionDuration = "0s";

		//Перемещение слайдов из начала в конец
		for (var i = 0; i < step; i++)
			crsSlides.appendChild(crsSlides.firstElementChild);

		crsSlides.style.left = "0";

		//Задержка для применения браузером св-ва transitionDuration
		setTimeout(function() {
			crsSlides.style.transitionDuration = crsAnimDurat + "s";
		}, 100);
	}, crsAnimDurat * 1000);

	crsChangeDot(step);

	//Восстановление таймера
	crsSliderTimer = crsStartTimer();
}

//Прокрутка влево
function crsSlidePrev(step) {
	//Остановка таймера
	clearInterval(crsSliderTimer);

	crsSlides.style.transitionDuration = "0s";
	crsSlides.style.left = -step + "00%";

	//Перемещение слайдов из конца в начало
	for (var i = 0; i < step; i++)
		crsSlides.insertBefore(crsSlides.lastElementChild, crsSlides.firstChild);

	//Задержка для применения браузером св-ва transitionDuration
	setTimeout(function() {
		crsSlides.style.transitionDuration = crsAnimDurat + "s";
		crsSlides.style.left = "0";
	}, 50);

	crsChangeDot(-step);

	//Восстановление таймера
	crsSliderTimer = crsStartTimer();
}

//Изменение активной точки
function crsChangeDot(step) {
	if (crsDots.length) {
		crsDots[crsCurrent].classList.remove("carousel__dot_active");

		crsCurrent += step;
		if (crsCurrent < 0)
			crsCurrent = crsDots.length - 1;
		else if (crsCurrent >= crsDots.length)
			crsCurrent = 0;

		crsDots[crsCurrent].classList.add("carousel__dot_active");
	}
}


/*** Прокрутка фона баннера ***/
var banner = document.querySelector(".banner");

window.addEventListener("scroll", scrolling);
window.addEventListener("load", scrolling);

function scrolling() {
	var elementBoundary = banner.getBoundingClientRect();

	var top = elementBoundary.top;
	var bottom = elementBoundary.bottom;
	var height = elementBoundary.height;

	if ((top + height >= 0) && (height + window.innerHeight >= bottom)) {
		var percent = 100 / window.innerHeight * top;
		banner.style.backgroundPositionY = percent + "%";
	}
}


/*** Прокрутка списка комнат и услуг ***/
//Контейнеры и кнопки для их прокрутки
var rooms = new ScrollableItem(document.getElementById("rooms"));
rooms.setArrows(document.getElementById("btn-prev-room"), document.getElementById("btn-next-room"));

var services = new ScrollableItem(document.getElementById("services"));
services.setArrows(document.getElementById("btn-prev-serv"), document.getElementById("btn-next-serv"));
