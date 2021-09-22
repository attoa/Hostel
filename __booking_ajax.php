<?php
//Множитель для скидки в 20%
const FACTOR = 0.8;

//Подключение к базе данных
include "__dbconnect.php";
if (mysqli_connect_errno() || !isset($db))
	$db = false;
else
	mysqli_set_charset($db, 'utf8');

//Оформление заказа
if (isset($_POST['submit']) && $_POST['submit']) {
	//Полученные данные с формы
	$data = array(
		'room' => intval($_POST['room']),
		'arrivalDate' => $_POST['arrivalDate'],
		'departureDate' => $_POST['departureDate'],
		'quantity' => intval($_POST['quantity']),
		'name' => $_POST['name'],
		'phone' => $_POST['phone']
	);

	$errors = false;

	//Проверка данных на корректность, если есть соединение с базой данных
	if ($db) {
		if (!checkDates($data['arrivalDate'], $data['departureDate']))
			$errors['date'] = true;

		if (!checkQuantity($db, $data['quantity'], $data['room']))
			$errors['qty'] = true;
		else {
			//Проверка наличия свободных мест в указанный период
			$vacantPlaces = getVacantPlaces($db, $data['room'], $data['arrivalDate'], $data['departureDate']);
			if ($vacantPlaces !== false && $vacantPlaces < $data['quantity'])
				$errors['vacant'] = true;
		}

		if (!checkName($data['name']))
			$errors['name'] = true;

		if (!checkPhone($data['phone']))
			$errors['phone'] = true;
	}
	else
		$errors['db'] = true;

	//Если нет ошибок
	if (!$errors)
		if (!addBooking($db, $data))
			$errors['server'] = true;

	//Ответ
	$response = array(
		'errors' => $errors,
		'data' => $data
	);
	echo json_encode($response);
}

//Обновление стоимости и кол-ва свободных мест
else if (isset($_POST['update']) && $_POST['update']) {
	//Полученные данные с формы
	$room = intval($_POST['room']);
	$arrivalDate = $_POST['arrivalDate'];
	$departureDate = $_POST['departureDate'];
	$quantity = intval($_POST['quantity']);

	$totalPrice = false;	//Стоимость
	$discountPrice = false;	//Стоимость со скидкой
	$vacantPlaces = false;	//Кол-во свободных мест
	$capacity = false;		//Вместимость комнаты

	//Если есть соединение с базой данных
	if ($db) {
		$totalPrice = countPrice($db, $room, $arrivalDate, $departureDate, $quantity);
		$discountPrice = intval($totalPrice * FACTOR);
		$vacantPlaces = getVacantPlaces($db, $room, $arrivalDate, $departureDate);
		$capacity = getCapacity($db, $room);
	}

	//Ответ
	$response = array(
		'totalPrice' => $totalPrice,
		'discountPrice' => $discountPrice,
		'vacantPlaces' => $vacantPlaces,
		'capacity' => $capacity
	);
	echo json_encode($response);
}

//Проверка дат
function checkDates($arrivalDate, $departureDate) {
	//Дата отъезда меньше или равна дате приезда
	if (strtotime($departureDate) - strtotime($arrivalDate) <= 0)
		return false;
	//Дата приезда меньше текущей даты
	if (strtotime($arrivalDate) - strtotime(date('Y-m-d', time())) < 0)
		return false;

	return true;
}

//Проверка количества
function checkQuantity($db, $quantity, $room) {
	//Указанное кол-во <= 0 или в поле был введен текст
	if ($quantity <= 0)
		return false;

	//Кол-во больше, чем вместимость комнаты
	if ($quantity > getCapacity($db, $room))
		return false;

	return true;
}

//Получение вместимости
function getCapacity($db, $room) {
	//Строка запроса для получения вместимости данной комнаты
	$query = "SELECT `capacity` FROM `rooms` WHERE num = $room";
	$result = mysqli_fetch_assoc(mysqli_query($db, $query));

	return intval($result['capacity']);
}

//Проверка имени
function checkName($name) {
	if (preg_match('/^[a-zа-яё\.-]{2,50}( {0,2}[a-zа-яё\.-]{1,50}){1,3} ?$/iu', $name))
		return true;
	return false;
}

//Проверка номера телефона
function checkPhone($phone) {
	if (preg_match('/^\+?\d{1,3}[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/', $phone))
		return true;
	return false;
}

//Рассчет стоимости
function countPrice($db, $room, $arrivalDate, $departureDate, $quantity) {
	//Проверка данных
	if (!checkDates($arrivalDate, $departureDate) || !checkQuantity($db, $quantity, $room))
		return false;

	//Строка запроса для получения стоимости данной комнаты
	$query = "SELECT `price` FROM `rooms` WHERE num = $room";
	$result = mysqli_fetch_assoc(mysqli_query($db, $query));

	if (!$result)
		return false;

	//Период в днях
	$period = (strtotime($departureDate) - strtotime($arrivalDate)) / (3600 * 24);

	return intval($period * $result['price'] * $quantity);
}

//Добавление заказа в базу данных
function addBooking($db, &$data) {
	//Получение стоимости заказа
	$totalPrice = countPrice($db, $data['room'], $data['arrivalDate'], $data['departureDate'], $data['quantity']);
	if ($totalPrice === false)
		return false;
	$data['totalPrice'] = intval($totalPrice * FACTOR);

	//Строка запроса
	$query = "INSERT INTO `bookings` (`room`, `arrival-date`, `departure-date`, `quantity`, `name`, `phone`, `total_price`)
		VALUES (
		'".$data['room']."',
		'".$data['arrivalDate']."',
		'".$data['departureDate']."',
		'".$data['quantity']."',
		'".$data['name']."',
		'".$data['phone']."',
		'".$data['totalPrice']."'
		);";

	//Получение номера добавленной строки если запрос удался
	if (mysqli_query($db, $query)) {
		$data['bookingId'] = mysqli_insert_id($db);
		return true;
	}

	return false;
}

//Получение кол-ва свободных мест
function getVacantPlaces($db, $room, $arrivalDate, $departureDate) {
	//Проверка данных
	if (!checkDates($arrivalDate, $departureDate))
		return false;

	//Строка запроса для получения вместимости комнаты и кол-ва забронированных в ней мест в указанный период
	$query = "SELECT `capacity`, SUM(`quantity`) AS `booked` 
		FROM `rooms`,`bookings` 
		WHERE `num` = $room AND 
		`room` = $room AND 
		`arrival-date` <= '$departureDate' AND 
		`departure-date` >= '$arrivalDate'";

	$result = mysqli_fetch_assoc(mysqli_query($db, $query));

	if ($result)
		return $result['capacity'] - $result['booked'];

	return false;
}

?>