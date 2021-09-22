<!DOCTYPE html>
<html lang="ru">
<head>
	<?php 
		$title = 'Забронировать место';
		include "__head.php";
	?>
	<link rel="stylesheet" href="css/style-common.css">
</head>
<body>
	<?php
		$pagename = '';
		include "__header.php";
	?>
	<main>
		<h1 class="h1">Забронировать место «У&nbsp;бабули»</h1>
		<div class="messages"></div>

		<?php
		include "__dbconnect.php";

		if (mysqli_connect_errno() || !isset($db)): ?>
			<p class="db-error-info">Ошибка установки соединения с базой данных :(</p>

		<?php else : ?>
			<!--FORM-->
			<form action="booking.php" class="form container container_narrow" method="post">
				<div class="form__field">
					<label class="form__label" for="room">Комната:</label>
					<select class="form__control" name="room" id="room">
						<option value="1" <?php if($_POST['room-num'] == 1) echo "selected"?>>Мужская комната на 12 мест</option>
						<option value="2" <?php if($_POST['room-num'] == 2) echo "selected"?>>Женская комната на 12 мест</option>
						<option value="3" <?php if($_POST['room-num'] == 3) echo "selected"?>>Смешанная комната на 12 мест</option>
						<option value="4" <?php if($_POST['room-num'] == 4) echo "selected"?>>Комната для двоих</option>
					</select>
				</div>
				<div class="form__field" id="field-arrival">
					<label class="form__label" for="arrival-date">Дата заселения:</label>
					<input class="form__control" type="date" name="arrival-date" id="arrival-date" 
						min="<?php echo date("Y-m-d", time()); ?>"
						value="<?php echo date("Y-m-d", time()); ?>" required>
				</div>
				<div class="form__field" id="field-departure">
					<label class="form__label" for="departure-date">Дата выселения:</label>
					<input class="form__control" type="date" name="departure-date" id="departure-date" 
						min="<?php echo date("Y-m-d", strtotime(" + 1 days")); ?>"
						value="<?php echo date("Y-m-d", strtotime(" + 7 days")); ?>" required>
					<p class="form__error">Проверьте правильность ввода диапазона дат</p>
				</div>
				<div class="form__field" id="field-quantity">
					<label class="form__label" for="quantity">Количество человек:</label>
					<input class="form__control" type="number" name="quantity" id="quantity" min="1" max="12" value="1" required>
					<p class="form__error" data-error-qty="Неверно указано количество человек"
					data-error-vacant="В указаный период стольких свободных мест нет"></p>
				</div>
				<div class="form__field" id="field-name">
					<label class="form__label" for="name">Ф.И.О.:</label>
					<input class="form__control" type="text" name="name" id="name" placeholder="Ваши Ф.И.О." required>
					<p class="form__error">Проверьте правильность ввода Ф.И.О.</p>
				</div>
				<div class="form__field" id="field-phone">
					<label class="form__label" for="phone">Номер телефона:</label>
					<input class="form__control" type="text" name="phone" id="phone" maxlength="20" placeholder="Ваш номер телефона" required>
					<p class="form__error">Проверьте правильность ввода номера телефона</p>
				</div>
				<p class="form__price">Стоимость: 
					<output id="discount-price">--- р.</output>
					<output id="total-price">--- р.</output>
				</p>
				<button class="btn-submit form__btn" type="submit" name="submit">Забронировать</button>
			</form>
		<?php endif; ?>
	</main>
	<?php 
		include "__footer.php";
	?>
	<script src="js/common.js"></script>
	<script src="js/booking.js"></script>
</body>
</html>