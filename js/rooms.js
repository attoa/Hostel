//Класс прокручиваемого контейнера с изображениями комнаты. Наследуется от ScrollableItem
function ScrollableRoom(object) {
	//Вызов конструктора базового класса
	ScrollableItem.apply(this, arguments);

	//Стрелки для пролистывания фото в контейнере
	this.setArrows(object.parentElement.querySelector(".room-card__arrow_left"),
				   object.parentElement.querySelector(".room-card__arrow_right"));

	//Массив ссылок на изображения внутри контейнера
	this.images = object.children;
	this.modal.addGallery(this.images);
}
//Наследование методов
ScrollableRoom.prototype = Object.create(ScrollableItem.prototype);
ScrollableRoom.prototype.constructor = ScrollableItem;

//Модальное окно
ScrollableRoom.prototype.modal = new Modal();

//Массив прокручиваемых контейнеров
var rooms = [];
var roomsDivs = document.querySelectorAll(".room-card__photos");
for (var i = 0; i < roomsDivs.length; i++)
	rooms[i] = new ScrollableRoom(roomsDivs[i]);
