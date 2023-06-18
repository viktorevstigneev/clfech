import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';
// import axios from 'axios';
// import { API_URL } from '../../../constants';

import { cardsData } from '../ClothesPage/data';
import { API_URL } from '../../../constants';
import axios from 'axios';
import av from '../../../img/av.png';

const OnePage = ({ user }) => {
	const { id } = useParams();

	const [activeCard, setActiveCard] = useState();
	const [text, setText] = useState();

	const [isEdit, setIsEdit] = useState(false);

	const [cardPrice, setCardPrice] = useState(activeCard && activeCard?.price);

	const [cardDesc, setCardDesc] = useState(activeCard && activeCard?.description);
	console.log('activeCard: ', activeCard);
	const [cardName, setCardName] = useState(activeCard && activeCard?.name);

	const [file, setFile] = useState('');

	useEffect(() => {
		const getBenners = async () => {
			const responseData = await axios
				.get(`${API_URL}/person/${id}`, { withCredentials: true })
				.then((response) => setActiveCard(response.data));
		};
		getBenners();
		// setActiveCard(cardsData.find((item) => item._id == id));
	}, []);

	useEffect(() => {
		setCardPrice(activeCard && activeCard?.price);
		setCardDesc(activeCard && activeCard?.description);
		setCardName(activeCard && activeCard?.name);
	}, [activeCard]);
	return (
		<div className="open">
			{!isEdit ? (
				<div className="open__block">
					{user && user.isAdmin && (
						<p
							className="open__edit__card"
							onClick={() => {
								setIsEdit(true);
							}}
						>
							редактировать &#9998;
						</p>
					)}
					<div className="open__container">
						<img
							className="open__img"
							src={`${API_URL}/getImage/${activeCard?.avatar}`}
							// src={activeCard?.image}
							alt=""
						/>

						<p className="open__description">
							<p className="open__name"> {activeCard?.name}</p>
							{activeCard?.description}
						</p>
					</div>
					<div className="open__bottom">
						<p className="open__price">Price: {activeCard?.price} BYN</p>
						{user && user ? (
							<p
								className="open__cart"
								onClick={async () => {
									await axios.patch(`${API_URL}/profile`, { productID: activeCard._id, userID: user._id });
									window.location.reload();
								}}
							>
								Добавить в корзину
							</p>
						) : (
							<p className="open__cart-no">необходимо зарегистрироваться чтобы добавить в корзину</p>
						)}
					</div>
				</div>
			) : (
				<form
					className="open__block"
					encType="multipart/form-data"
					method="POST"
					onSubmit={async (evt) => {
						evt.preventDefault();

						const formData = new FormData(evt.target);

						const responseData = await axios({
							method: 'PATCH',
							url: `${API_URL}/team/${activeCard._id}`,
							data: formData,
							withCredentials: true,
						});
						window.location.reload();
					}}
				>
					<div className="open__container">
						<div className="e__block">
							<label className="e__label" htmlFor="avatar">
								<img
									className="e__avatar"
									src={file ? URL.createObjectURL(file) : `${API_URL}/getImage/${activeCard.avatar}`}
									// src={file ? URL.createObjectURL(file) : activeCard?.image}
									alt="menu_picture"
								/>
								<div className="e__icon">&#128449;</div>
							</label>
							<input
								className="e__input"
								id="avatar"
								name="avatar"
								type="file"
								onChange={(evt) => setFile(evt.target.files[0])}
							/>
						</div>
						<div className="open__description-block">
							<input
								className="open__name-edit"
								type="text"
								name="name"
								onChange={(evt) => {
									setCardName(evt.target.value);
								}}
								value={cardName}
							/>
							<textarea
								className="open__description-edit"
								style={{ resize: 'none', width: '100%' }}
								type="text"
								name="description"
								onChange={(evt) => {
									setCardDesc(evt.target.value);
								}}
								value={cardDesc}
							></textarea>
						</div>
					</div>
					<div className="open__bottom">
						<p className="open__price">
							Price:{' '}
							<input
								type="text"
								name="price"
								onChange={(evt) => {
									setCardPrice(evt.target.value);
								}}
								value={cardPrice}
							/>
							BYN
						</p>
					</div>

					<button className="edit__save" type="submit">
						Сохранить изменения
					</button>
				</form>
			)}

			<h2 className="feedback__title">Отзывы о товаре</h2>
			<div className="feedback">
				{activeCard?.feedback?.length ? (
					activeCard.feedback.map((item) => (
						<div className="feedback__item">
							{/* <div
								className="feedback__avatar"
								style={{ background: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase() }}
							></div> */}
							<img src={av} alt="" className="feedback__avatar" />
							<p className="feedback__content">{item}</p>
						</div>
					))
				) : (
					<p className="feedback__content">отзывов нет</p>
				)}
			</div>
			{user && user ? (
				<div className="feedback__form">
					<textarea
						className="feedback__text"
						name="feedback"
						value={text}
						onChange={(evt) => setText(evt.target.value)}
					></textarea>
					<button
						className="feedback_btn"
						onClick={async (evt) => {
							axios.post(`${API_URL}/teamAddFeed/${activeCard._id}`, { feedback: text });
							window.location.reload();
						}}
					>
						отправить отзыв
					</button>
				</div>
			) : (
				<p className="open__cart-no" align="center">необходимо зарегистрироваться чтобы оставить отзыв</p>
			)}
		</div>
	);
};

export default OnePage;
