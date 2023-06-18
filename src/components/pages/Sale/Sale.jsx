import React, { useEffect, useState } from 'react';

import './style.css';
const Sale = () => {

	return (
		<>
			<main className="sale_home__main">
				<h2 className="sale_home__title">ИМЕНИННИКАМ<br/> СКИДКИ</h2>
				<p className="sale_home_caption"> Если у Вас или Вашего ребенка день рождения, и вы хотите сделать подарок,
					<br />
					Предъявите паспорт именинника и получите скидку на товар.
					<br />
					Акция действует за 5 дней до дня рождения.
					<br />
					Именинники могут купить товар СО СКИДКОЙ!</p>
				
				<h2 className="sale_home__title">БЕСПЛАТНАЯ<br/> ДОСТАВКА</h2>
				<p className="sale_home_caption"> При получении Вашей оплаты, наш сотрудник отправит товар и вышлет Вам подтверждение факта отправки с номером доставки. Доставка товаров по Беларуси осуществляется через службу Европочта ( https://evropochta.by/)  при сумме заказа более 120 руб.
Товары доставляются до пунктов выдачи Европочта в вашем городе.</p>

					<h2 className="sale_home__title">ТРЕНЕРАМ ОПТОВЫЕ<br/>ЦЕНЫ</h2>
				<p className="sale_home_caption">Для тренеров действуют специальные оптовые цены!
					<br />
					Пришлите запрос на почту fencegear@gmail.com и мы отправим Вам оптовый прайс:
					</p>
			</main>
		</>
	);
};

export default Sale;
