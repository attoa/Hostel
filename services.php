<!DOCTYPE html>
<html lang="ru">
<head>
	<?php 
		$title = 'Наши услуги';
		include "__head.php";
	?>
	<link rel="stylesheet" href="css/style-common.css">
	<link rel="stylesheet" href="css/style-services.css">
</head>
<body>
	<?php
		$pagename = 'services';
		include "__header.php";
	?>
	<!--MAIN CONTENT-->
	<main>
		<h1 class="h1">Наши услуги</h1>
		<div class="service-cards container">
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_parking.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Парковка</figcaption>
				</figure>
				<p class="service-card__descr">Вы можете воспользоваться парковкой, расположенной на территории Хостела.</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_wifi.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Бесплатный Wi&#8209;Fi</figcaption>
				</figure>
				<p class="service-card__descr">На территории Хостела имеется сеть Wi-Fi с высокой скоростью интернета. Пароль Вы можете узнать у администратора.</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_transfer.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Трансфер</figcaption>
				</figure>
				<p class="service-card__descr">Мы можем встретить вас в аэропорту или на ж/д вокзале, что бы вам не пришлось искать, как к нам добраться.</p>
				<p class="service-card__price">Стоимость: 200 руб.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_24h.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Работаем 24/7</figcaption>
				</figure>
				<p class="service-card__descr">Наши двери всегда открыты для гостей! Мы работаем 24 часа 7 дней в неделю! В любой момент вы можете найти администратора у стойки или позвонить по телефону.</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_breakfast.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Завтрак</figcaption>
				</figure>
				<p class="service-card__descr">Для всех наших гостей предоставляется завтрак. На кухне Вас будут ждать чай/кофе и закуски. А так же блинчики!</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_shower.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Душ</figcaption>
				</figure>
				<p class="service-card__descr">Вы можете воспользоваться душем, расположенном в нашем Хостеле.</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_laundry.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Прачечная</figcaption>
				</figure>
				<p class="service-card__descr">Для удобства наших гостей у нас представлены услуги прачечной. Тут Вы можете постирать и погладить свою одежду.</p>
				<p class="service-card__price">Стоимость: бесплатно.</p>
			</div>
			<div class="service-card">
				<figure class="service-card__upper">
					<img src="img/services/s_luggage.png" alt="" class="service-card__img">
					<figcaption class="service-card__name">Хранение багажа</figcaption>
				</figure>
				<p class="service-card__descr">Для удобства наших гостей у нас имеется комната для хранения багажа. Здесь Вы можете оставить свою сумку на хранение не снимая комнату.</p>
				<p class="service-card__price">Стоимость: 100 руб. / сутки.</p>
			</div>
		</div>
	</main>
	<?php 
		include "__footer.php";
	?>
	<script src="js/common.js"></script>
</body>
</html>