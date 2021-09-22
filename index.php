<!DOCTYPE html>
<html lang="ru">
<head>
	<?php 
		$title = 'Хостел';
		include "__head.php";
	?>
	<link rel="stylesheet" href="css/style-common.css">
	<link rel="stylesheet" href="css/style-index.css">
</head>
<body>
	<?php
		$pagename = '';
		include "__header.php";
	?>
	<!--MAIN CONTENT-->
	<main>
	<!-- CAROUSEL -->
	<div class="carousel section container container_wide">
		<div class="carousel__slides">
			<div class="slide carousel__slide" style="background-image: url(img/index/slide1.jpg);">
				<div class="slide__text">
					<div class="slide__head">Хостел «У бабули»</div>
					<span class="slide__span">Так по-домашнему...</span>
				</div>
				<a class="button-more" href="rules.php">Правила проживания</a>
			</div>
			<div class="slide carousel__slide" style="background-image: url(img/index/slide2.jpg);">
				<div class="slide__text">
					<div class="slide__head">Лучшие места нашего города</div>
				</div>
				<a class="button-more" href="places.php">Узнать подробнее</a>
			</div>
		</div>
		<button class="carousel__btn carousel__btn_prev" title="Предыдущий слайд">
			<svg class="icon">
				<use xlink:href="img/svg/icons.svg#ChevronLeft"></use>
			</svg>
		</button>
		<button class="carousel__btn carousel__btn_next" title="Следующий слайд">
			<svg class="icon">
				<use xlink:href="img/svg/icons.svg#ChevronRight"></use>
			</svg>
		</button>
	</div>
	<!-- ROOMS -->
	<section class="section">
		<header class="section__header container">
			<h2 class="section__name"><a href="rooms.php">Наши комнаты</a></h2>
			<button class="section__btn" id="btn-prev-room" title="Предыдущая комната">
				<svg class="icon icon_font">
					<use xlink:href="img/svg/icons.svg#DoubleChevronLeft"></use>
				</svg>
			</button>
			<button class="section__btn" id="btn-next-room" title="Следующая комната">
				<svg class="icon icon_font">
					<use xlink:href="img/svg/icons.svg#DoubleChevronRight"></use>
				</svg>
			</button>
		</header>
		<div class="overflow container">
			<div id="rooms">
				<div class="room" style="background-image: url(img/index/room_for_two.jpg);">
					<div class="room__description">
						<a href="rooms.php#room4" class="room__name">Комната для двоих</a>
						<a href="rooms.php#room4" class="room__more">Подробнее
							<svg class="icon icon_font">
								<use xlink:href="img/svg/icons.svg#ChevronRightThin"></use>
							</svg>
						</a>
					</div>
				</div>
				<div class="room" style="background-image: url(img/index/room_for_all.jpg);">
					<div class="room__description">
						<a href="rooms.php#room3" class="room__name">Смешанная комната на 8 мест</a>
						<a href="rooms.php#room3" class="room__more">Подробнее
							<svg class="icon icon_font">
								<use xlink:href="img/svg/icons.svg#ChevronRightThin"></use>
							</svg>
						</a>
					</div>
				</div>
				<div class="room" style="background-image: url(img/index/room_for_w.jpg);">
					<div class="room__description">
						<a href="rooms.php#room2" class="room__name">Женская комната на 12 мест</a>
						<a href="rooms.php#room2" class="room__more">Подробнее
							<svg class="icon icon_font">
								<use xlink:href="img/svg/icons.svg#ChevronRightThin"></use>
							</svg>
						</a>
					</div>
				</div>
				<div class="room" style="background-image: url(img/index/room_for_m.jpg);">
					<div class="room__description">
						<a href="rooms.php#room1" class="room__name">Мужская комната на 12 мест</a>
						<a href="rooms.php#room1" class="room__more">Подробнее
							<svg class="icon icon_font">
								<use xlink:href="img/svg/icons.svg#ChevronRightThin"></use>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
		<a class="button-more" href="rooms.php">Все комнаты</a>
	</section>
	<!-- BANNER -->
	<div class="banner section container container_wide" style="background-image: url(img/index/banner.jpg);">
		<div class="container">
			<span class="banner__text">Забронируй online и получи скидку 20%!</span>
			<form action="booking.php">
				<button class="btn-submit" type="submit">Забронировать</button>
			</form>
		</div>
	</div>
	<!-- SERVICES -->
	<section class="section">
		<header class="section__header container">
			<h2 class="section__name"><a href="services.php">Наши услуги</a></h2>
			<button class="section__btn" id="btn-prev-serv" title="Предыдущая услуга">
				<svg class="icon icon_font">
					<use xlink:href="img/svg/icons.svg#DoubleChevronLeft"></use>
				</svg>
			</button>
			<button class="section__btn" id="btn-next-serv" title="Следующая услуга">
				<svg class="icon icon_font">
					<use xlink:href="img/svg/icons.svg#DoubleChevronRight"></use>
				</svg>
			</button>
		</header>
		<div class="overflow container">
			<div id="services">
				<figure class="service">
					<img class="service__logo" src="img/services/s_parking.png" alt="">
					<figcaption class="service__name">Парковка</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_wifi.png" alt="">
					<figcaption class="service__name">Бесплат&shy;ный Wi&#8209;Fi</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_transfer.png" alt="">
					<figcaption class="service__name">Трансфер</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_24h.png" alt="">
					<figcaption class="service__name">24/7</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_breakfast.png" alt="">
					<figcaption class="service__name">Завтрак</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_shower.png" alt="">
					<figcaption class="service__name">Душ</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_laundry.png" alt="">
					<figcaption class="service__name">Прачеч&shy;ная</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_luggage.png" alt="">
					<figcaption class="service__name">Хранение багажа</figcaption>
				</figure>
				<figure class="service">
					<img class="service__logo" src="img/services/s_care.png" alt="">
					<figcaption class="service__name">Ванные принад&shy;леж&shy;ности</figcaption>
				</figure>
			</div>
		</div>
		<a class="button-more" href="services.php">Все услуги</a>
	</section>
	<!-- REVIEWS -->
	<section class="section">
		<header class="section__header container">
			<h2 class="section__name"><a href="reviews.php">Отзывы</a></h2>
		</header>
		<div class="reviews container">
			<?php 
			include "__dbconnect.php";

			if (mysqli_connect_errno() || !isset($db)): ?>
				<p class="db-error-info">Ошибка установки соединения с базой данных :(</p>

			<?php else: {
				mysqli_set_charset($db, 'utf8');
				$query = "SELECT * FROM `reviews` WHERE 1 ORDER BY `date` DESC LIMIT 3";
				$result = mysqli_query($db, $query);

				if (empty($result)): ?>
					<p class="reviews__empty">Отзывов пока нет</p>

				<?php else:
					while ($rev = mysqli_fetch_assoc($result)): ?>

						<article class="review">
							<header><h3 class="review__name"><?php echo $rev['name']; ?></h3></header>
							<span class="review__text"><?php echo $rev['text']; ?></span>
							<span class="review__sender"><?php echo $rev['sender']; ?></span>
						</article>

					<?php endwhile;
				endif;
			} endif;
			?>
		</div>
		<a class="button-more" href="reviews.php">Все отзывы</a>
	</section>
	</main>
	<?php 
		include "__footer.php";
	?>
	<script src="js/common.js"></script>
	<script src="js/index.js"></script>
</body>
</html>