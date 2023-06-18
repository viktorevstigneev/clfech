import React, { useCallback, useEffect, useState } from 'react';
import DoubleSlider from 'double-slider';

// import Footer from '../../common/Footer';

import { clothesType, sexType, cardsData } from './data';
import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../../common/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClothesPage = () => {
	const [user, setUser] = useState();

	const [sliderMin, setMin] = useState(0);
	const [sliderMax, setMax] = useState(500);
	const [searchValue, setSearchValue] = useState('');

	const [cardData, setCardData] = useState();
	console.log('cardData: ', cardData);

	const [filteredCards, setFilteredCards] = useState();

	const [filter, setFilter] = useState({
		maxPrice: 500,
		minPrice: 0,
		// sex: ['Female', 'Male'],
		// type: ['Защита','Костюм','Маска' ,'Шпаги' ,'Обувь' ]
		type: [],
	});
	// console.log('filter: ', filter);
	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	useEffect(() => {
		const getClothes = async () => {
			const responseData = await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
				setCardData(response.data);
				setFilteredCards(response.data);
			});
		};
		getClothes();
		// setCardData(cardsData);
		// setFilteredCards(cardsData);
	}, []);

	useEffect(() => {
		const mySlider = new DoubleSlider(document.getElementById('my-slider'));

		mySlider.addEventListener('slider:change', () => {
			const { min, max } = mySlider.value;
			setMin(min || 0);
			setMax(max || 500);
		});
	}, []);

	// useEffect(() => {
	// 	let newArr = cardData && cardData.filter((item) => item.price > sliderMin && item.price < sliderMax);

	// 	setFilteredCards(newArr);
	// }, [sliderMin, sliderMax]);

	const handleSearhChange = (evt) => {
		setSearchValue(evt.target.value);
	};

	return (
		<>
			<main className="clothes">
				<div className="clothes__container">
					<form className="Clothes__top" action="">
						<div className="filter__top">
							<div className="filter__block">
								<h2 className="filter__title">Цена</h2>
								<div id="my-slider" data-min="0" data-max="500" data-range="500"></div>
								<div className="filter__price">
									<div className="filter__cost">{sliderMin} BYN</div>
									<div className="filter__cost">{sliderMax} BYN</div>
								</div>
							</div>
							<div className="filter__block">
								<h2 className="filter__title">Тип</h2>
								<div className="filter__wrapper">
									<select
										name=""
										id=""
										onChange={(evt) => {
											let newArr = cardData && cardData.filter((item) => item.typeClothes === evt.target.value);

											setFilteredCards(newArr);

											if (evt.target.value == 'Все товары') {
												setFilteredCards(cardData);
											}
										}}
									>
										{clothesType.map(({ id, translate }) => (
											<option value={translate} className="filter__option">
												{translate}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						{/* <button className="filter__apply">Применить фильтры</button> */}
					</form>

					<input className="filter__search" type="text" placeholder="Поиск товара" onChange={handleSearhChange} />

					<div className="clothes__content">
						{filteredCards ? (
							filteredCards
								.filter((item) => searchValue == '' || item?.name.includes(searchValue))
								.filter((item) => item.price > sliderMin && item.price < sliderMax)
								.map((item) => (
									<Link to={`/thing/${item._id}`} className="clothes__card">
										{user && user.isAdmin && (
											<span
												className="clothes_card--delete"
												onClick={async (event) => {
													event.preventDefault();
													event.stopPropagation();
													await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
													window.location.reload();
												}}
											>
												&times;
											</span>
										)}
										<img
											className="clothes__img"
											src={`${API_URL}/getImage/${item.avatar}`}
											// src={item.image}
											alt=""
										/>
										<p className="clothes__name">{item.name}</p>
										<div className="clothes__bottom">
											<p className="clothes__price">Цена: {item.price} BYN</p>
										</div>
									</Link>
								))
						) : (
							<p className="clothes__price">Ничего не найдено</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default ClothesPage;
