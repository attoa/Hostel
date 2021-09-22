	<!-- HEADER -->
	<header class="header">
		<nav class="container">
			<a href="index.php" class="logo">
				<img src="img/logo.png" alt="">
			</a>
			<div class="hamburger" title="Меню" role="button">
	    		<div class="hamburger__line"></div>
				<div class="hamburger__line"></div>
				<div class="hamburger__line"></div>
	    	</div>
			<ul class="menu">
				<li class="menu__li <?php if ($pagename == 'rules' || $pagename == 'places') echo " menu__li_active"?>">
					<a id="submenu-btn" href="#">О нас
						<svg class="icon icon_font">
							<use xlink:href="img/svg/icons.svg#ExpandMore"></use>
						</svg>
					</a>
					<ul class="menu__sub-menu">
						<li class="menu__sub-li <?php if ($pagename == 'rules') echo " menu__sub-li_active"?>">
							<a href="rules.php">Правила проживания</a>
						</li>
						<li class="menu__sub-li <?php if ($pagename == 'places') echo " menu__sub-li_active"?>">
							<a href="places.php">Интересные места рядом</a>
						</li>
					</ul>
				</li>
				<li class="menu__li <?php if ($pagename == 'rooms') echo " menu__li_active"?>">
					<a href="rooms.php">Комнаты</a>
				</li>
				<li class="menu__li <?php if ($pagename == 'reviews') echo " menu__li_active"?>">
					<a href="reviews.php">Отзывы</a>
				</li>
				<li class="menu__li <?php if ($pagename == 'services') echo " menu__li_active"?>">
					<a href="services.php">Услуги</a>
				</li>
				<li class="menu__li">
					<address><a href="tel:+79990000000">+7 (999) 000-00-00</a></address>
				</li>
			</ul>
			<form action="booking.php">
				<button class="btn-submit" type="submit">Забронировать</button>
			</form>
		</nav>
	</header>