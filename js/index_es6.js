/* Код должен быть красивым */

/*** Карусель ***/
//Контейнер со слайдами
const crsSlides = document.querySelector(".carousel__slides");
//Кнопки
const crsBtnPrev = document.querySelector(".carousel__btn_prev");
const crsBtnNext = document.querySelector(".carousel__btn_next");
crsBtnNext.onclick = () => { crsSlideNext(1); };
crsBtnPrev.onclick = () => { crsSlidePrev(1); };

//Таймер автоматической прокрутки
let crsSliderTimer = crsStartTimer();
//Номер текущего слайда
let crsCurrent = 0;
//Длительность анимации
const crsAnimDurat = parseFloat(getComputedStyle(crsSlides).transitionDuration);

//Массив кнопок-точек
const crsDots = document.querySelectorAll(".carousel__dot");
if (crsDots.length) {
	crsDots[crsCurrent].classList.add("carousel__dot_active");

	//Привязка обработчиков нажатия на каждую точку
	crsDots.forEach(dot => {
		dot.onclick = () => {
			//Шаг пролистывания
			const step = [].indexOf.call(crsDots, dot) - crsCurrent;
			if (step < 0)
				crsSlidePrev(Math.abs(step));
			else if (step > 0)
				crsSlideNext(step);
		}
	});
}

//Установка таймера
function crsStartTimer() {
	return setInterval(() => { crsSlideNext(1); }, 6000);
}

//Прокрутка вправо
function crsSlideNext(step) {
	//Остановка таймера
	clearInterval(crsSliderTimer);

	crsSlides.style.left = -step + "00%";

	//Задержка для окончания анимации
	setTimeout(() => {
		crsSlides.style.transitionDuration = "0s";

		//Перемещение слайдов из начала в конец
		for (let i = 0; i < step; i++)
			crsSlides.appendChild(crsSlides.firstElementChild);

		crsSlides.style.left = "0";

		//Задержка для применения браузером св-ва transitionDuration
		setTimeout(() => {
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
	for (let i = 0; i < step; i++)
		crsSlides.insertBefore(crsSlides.lastElementChild, crsSlides.firstChild);

	//Задержка для применения браузером св-ва transitionDuration
	setTimeout(() => {
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
const banner = document.querySelector(".banner");

window.addEventListener("scroll", scrolling);
window.addEventListener("load", scrolling);

function scrolling() {
	const { top, bottom, height } = banner.getBoundingClientRect();

	if ((top + height >= 0) && (height + window.innerHeight >= bottom)) {
		const percent = 100 / window.innerHeight * top;
		banner.style.backgroundPositionY = percent + "%";
	}
}


/*** Прокрутка списка комнат и услуг ***/
//Контейнеры и кнопки для их прокрутки
const rooms = new ScrollableItem(document.getElementById("rooms"));
rooms.setArrows(document.getElementById("btn-prev-room"), document.getElementById("btn-next-room"));

const services = new ScrollableItem(document.getElementById("services"));
services.setArrows(document.getElementById("btn-prev-serv"), document.getElementById("btn-next-serv"));
