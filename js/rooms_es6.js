//Класс прокручиваемого контейнера с изображениями комнаты. Наследуется от ScrollableItem
class ScrollableRoom extends ScrollableItem {
	constructor(object) {
		//Вызов конструктора базового класса
		super(object);

		//Стрелки для пролистывания фото в контейнере
		this.setArrows(object.parentElement.querySelector(".room-card__arrow_left"),
					   object.parentElement.querySelector(".room-card__arrow_right"));

		//Массив ссылок на изображения внутри контейнера
		this.images = object.children;
		this.modal.addGallery(this.images);
	}
}
//Модальное окно
ScrollableRoom.prototype.modal = new Modal();

//Массив прокручиваемых контейнеров
let rooms = [];
const roomsDivs = document.querySelectorAll(".room-card__photos");
roomsDivs.forEach(room => { rooms.push(new ScrollableRoom(room)) });
