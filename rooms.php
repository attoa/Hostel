<!DOCTYPE html>
<html lang="ru">
<head>
	<?php 
		$title = 'Наши комнаты';
		include "__head.php";
	?>
	<link rel="stylesheet" href="css/style-common.css">
	<link rel="stylesheet" href="css/style-rooms.css">
</head>
<body>
	<?php
		$pagename = 'rooms';
		include "__header.php";
	?>
	<!--MAIN CONTENT-->
	<main>
		<h1 class="h1">Наши комнаты</h1>
		<div class="room-card container" id="room1">
			<div class="overflow">
				<div class="room-card__photos">
					<a href="img/rooms/men-room_1.jpg" class="room-card__photo" style="background-image: url(img/rooms/men-room_1.jpg);"></a>
					<a href="img/rooms/men-room_2.jpg" class="room-card__photo" style="background-image: url(img/rooms/men-room_2.jpg);"></a>
					<a href="img/rooms/men-room_3.jpg" class="room-card__photo" style="background-image: url(img/rooms/men-room_3.jpg);"></a>
					<a href="img/rooms/men-room_4.jpg" class="room-card__photo" style="background-image: url(img/rooms/men-room_4.jpg);"></a>
				</div>
				<button class="room-card__arrow room-card__arrow_left" title="Предыдущее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronLeft"></use>
					</svg>
				</button>
				<button class="room-card__arrow room-card__arrow_right" title="Следующее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronRight"></use>
					</svg>
				</button>
			</div>
			<div class="room-card__info">
				<div class="room-card__section">
					<div class="room-card__name">Мужская комната на 12 мест</div>
					<div class="room-card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptate ducimus distinctio, nobis ab quae dignissimos explicabo impedit placeat sint.</div>
				</div>
				<div class="room-card__section">
					<div class="room-card__price">600 руб. / ночь</div>
					<form action="booking.php" method="post">
						<input type="hidden" name="room-num" value="1">
						<button class="btn-submit" type="submit">Забронировать</button>
					</form>
				</div>
			</div>
		</div>
		<div class="room-card container" id="room2">
			<div class="overflow">
				<div class="room-card__photos">
					<a href="img/rooms/women-room_1.jpg" class="room-card__photo" style="background-image: url(img/rooms/women-room_1.jpg);"></a>
					<a href="img/rooms/women-room_2.jpg" class="room-card__photo" style="background-image: url(img/rooms/women-room_2.jpg);"></a>
					<a href="img/rooms/women-room_3.jpg" class="room-card__photo" style="background-image: url(img/rooms/women-room_3.jpg);"></a>
				</div>
				<button class="room-card__arrow room-card__arrow_left" title="Предыдущее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronLeft"></use>
					</svg>
				</button>
				<button class="room-card__arrow room-card__arrow_right" title="Следующее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronRight"></use>
					</svg>
				</button>
			</div>
			<div class="room-card__info">
				<div class="room-card__section">
					<div class="room-card__name">Женская комната на 12 мест</div>
					<div class="room-card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptate ducimus distinctio, nobis ab quae dignissimos explicabo impedit placeat sint.</div>
				</div>
				<div class="room-card__section">
					<div class="room-card__price">600 руб. / ночь</div>
					<form action="booking.php" method="post">
						<input type="hidden" name="room-num" value="2">
						<button class="btn-submit" type="submit">Забронировать</button>
					</form>
				</div>
			</div>
		</div>
		<div class="room-card container" id="room3">
			<div class="overflow">
				<div class="room-card__photos">
					<a href="img/rooms/room-for8_1.jpg" class="room-card__photo" style="background-image: url(img/rooms/room-for8_1.jpg);"></a>
					<a href="img/rooms/room-for8_2.jpg" class="room-card__photo" style="background-image: url(img/rooms/room-for8_2.jpg);"></a>
					<a href="img/rooms/room-for8_3.jpg" class="room-card__photo" style="background-image: url(img/rooms/room-for8_3.jpg);"></a>
				</div>
				<button class="room-card__arrow room-card__arrow_left" title="Предыдущее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronLeft"></use>
					</svg>
				</button>
				<button class="room-card__arrow room-card__arrow_right" title="Следующее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronRight"></use>
					</svg>
				</button>
			</div>
			<div class="room-card__info">
				<div class="room-card__section">
					<div class="room-card__name">Смешанная комната на 12 мест</div>
					<div class="room-card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptate ducimus distinctio, nobis ab quae dignissimos explicabo impedit placeat sint.</div>
				</div>
				<div class="room-card__section">
					<div class="room-card__price">500 руб. / ночь</div>
					<form action="booking.php" method="post">
						<input type="hidden" name="room-num" value="3">
						<button class="btn-submit" type="submit">Забронировать</button>
					</form>
				</div>
			</div>
		</div>
		<div class="room-card container" id="room4">
			<div class="overflow">
				<div class="room-card__photos">
					<a href="img/rooms/room-for2_1.jpg" class="room-card__photo" style="background-image: url(img/rooms/room-for2_1.jpg);"></a>
					<a href="img/rooms/room-for2_2.jpg" class="room-card__photo" style="background-image: url(img/rooms/room-for2_2.jpg);"></a>
				</div>
				<button class="room-card__arrow room-card__arrow_left" title="Предыдущее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronLeft"></use>
					</svg>
				</button>
				<button class="room-card__arrow room-card__arrow_right" title="Следующее изображение">
					<svg class="icon">
						<use xlink:href="img/svg/icons.svg#ChevronRight"></use>
					</svg>
				</button>
			</div>
			<div class="room-card__info">
				<div class="room-card__section">
					<div class="room-card__name">Комната для двоих</div>
					<div class="room-card__descr">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptate ducimus distinctio, nobis ab quae dignissimos explicabo impedit placeat sint.</div>
				</div>
				<div class="room-card__section">
					<div class="room-card__price">1000 руб. / ночь</div>
					<form action="booking.php" method="post">
						<input type="hidden" name="room-num" value="4">
						<button class="btn-submit" type="submit">Забронировать</button>
					</form>
				</div>
			</div>
		</div>
	</main>
	<?php
		include "__modalwindow.php";
		include "__footer.php";
	?>
	<script src="js/common.js"></script>
	<script src="js/rooms.js"></script>
</body>
</html>