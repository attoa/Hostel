<!DOCTYPE html>
<html lang="ru">
<head>
	<?php 
		$title = 'Отзывы';
		include "__head.php";
	?>
	<link rel="stylesheet" href="css/style-common.css">
	<link rel="stylesheet" href="css/style-reviews.css">
</head>
<body>
	<?php
		$pagename = 'reviews';
		include "__header.php";
	?>
	<!--MAIN CONTENT-->
	<main>
		<h1 class="h1">Отзывы</h1>

		<?php
		include "__dbconnect.php";

		if (mysqli_connect_errno() || !isset($db)): ?>
			<p class="db-error-info">Ошибка установки соединения с базой данных :(</p>

		<?php else: {
			mysqli_set_charset($db, 'utf8');

			// Добавить новый отзыв если форма была отправлена
			if (isset($_POST['submit']))
			{
				$date = date('Y-m-d H:i:s', time());
				$name = strip_tags($_POST['name']);
				$text = strip_tags($_POST['text']);
				$sender = strip_tags($_POST['sender']);

				$queryAdd = "INSERT INTO `$dbname`.`reviews` (`date`,`name`,`text`,`sender`)
					VALUES ('$date', '$name', '$text', '$sender');";


				// Отобразить сообщение об успешной отправке
				if (mysqli_query($db, $queryAdd)) : ?>

					<!--SEND SUCCESS-->
					<div class="message message_success container container_narrow">
						<svg>
							<use xlink:href="img/svg/icons.svg#Success"></use>
						</svg>
						<span>Ваш отзыв отправлен. Спасибо!</span>
					</div>

				<?php endif;
			}


			// Отобразить отзывы
			$query = "SELECT * FROM `reviews` WHERE 1 ORDER BY `date` DESC";
			$result = mysqli_query($db, $query);

			if (empty($result)): ?>
				<p class="no-reviews">Отзывов пока нет. Будьте первым!</p>
			
			<?php else:
				while ($rev = mysqli_fetch_assoc($result)): ?>
					
					<!-- ARTICLES -->
					<article class="review-card container">
						<header class="review-card__header">
							<h3 class="review-card__name"><?php echo $rev['name']; ?></h3>
							<time datetime="
								<?php echo date('Y-m-d\TH:i:s', strtotime($rev['date'])); ?>
								" class="review-card__date">
								<?php echo date('Y-m-d H:i', strtotime($rev['date'])); ?>
							</time>
						</header>
						<span class="review-card__text"><?php echo $rev['text']; ?></span>
						<span class="review-card__sender"><?php echo $rev['sender']; ?></span>
					</article>
			
				<?php endwhile;
			endif; ?>

			<!--FORM-->
			<form action="reviews.php" class="form container container_narrow" method="post">
				<div class="form__field">
					<label class="form__label" for="name">Впечатление:</label>
					<input class="form__control" type="text" name="name" id="name" placeholder="Ваше впечатление" required>
				</div>
				<div class="form__field">
					<label class="form__label" for="text">Ваш отзыв:</label>
					<textarea class="form__control" name="text" rows="5" id="text" placeholder="Текст Вашего отзыва"></textarea>
				</div>
				<div class="form__field">
					<label class="form__label" for="sender">Комната:</label>
					<select class="form__control" name="sender" id="sender">
						<option value="Гость из мужского номера">Гость из мужского номера</option>
						<option value="Гость из женского номера">Гость из женского номера</option>
						<option value="Гость из смешанного номера">Гость из смешанного номера</option>
						<option value="Гость из номера для двоих">Гость из номера для двоих</option>
					</select>
				</div>
				<button class="btn-submit form__btn" type="submit" name="submit">Отправить отзыв</button>
			</form>

		<?php
		} endif;
		?>
	</main>
	<?php 
		include "__footer.php";
	?>
	<script src="js/common.js"></script>
</body>
</html>