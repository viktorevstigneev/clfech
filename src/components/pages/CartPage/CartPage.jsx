import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { unstable_batchedUpdates } from 'react-dom';
// import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css';

import Footer from '../../common/Footer';

import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';

import Modal from '../../common/Modal';

const CartPage = () => {
	const [user, setUser] = useState();
	const [cartData, setCartData] = useState();
	const [sum, setSum] = useState();
	const [pay, setPay] = useState(false);

	const [cvc, setCvc] = useState('');
	const [expiry, setExpiry] = useState('');
	const [focus, setFocus] = useState('');
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');

	const [amount, setAmount] = useState(1);

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
				setCartData(response.data);
			});
		};
		getClothes();
	}, []);

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setPay(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setPay(false);
		}
	}, []);

	const [userCart, setUserCart] = useState(
		cartData && cartData.filter((value) => user?.userCart && user?.userCart.includes(value._id))
	);
	console.log('userCart: ', userCart);

	useEffect(() => {
		setUserCart(cartData && cartData.filter((value) => user?.userCart && user?.userCart.includes(value._id)));
	}, [cartData]);
	// const userCart = cartData && cartData.filter((value) => user?.userCart && user?.userCart.includes(value._id));

	const userOrder = cartData && cartData.filter((value) => user?.order && user?.order.includes(value._id));

	const usePrevious = (value) => {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	};

	const prevAmount = usePrevious(amount);

	return (
		<>
			<main className="cart">
				<div className="cart__container">
					<h2 className="cart__title">Корзина пользователя {user?.username}</h2>
					<div className="cart__content">
						{userCart?.length ? (
							userCart.map((item) => {
								return (
									<div className="cart__item">
										<img className="cart__image" src={`${API_URL}/getImage/${item.avatar}`} alt="cart" />
										<p className="cart__price">цена: {item.price} BYN</p>
										<i>Кол-во</i>
										<input
											type="number"
											max={10}
											min={1}
											defaultValue={1}
											style={{ width: '50px', marginBottom: '10px' }}
											onChange={(evt) => {
												setAmount(+evt.target.value);

												userCart.forEach((element) => {
													if (element._id == item._id) {
														console.log('amount: ', amount);
														console.log('+evt.target.value: ', +evt.target.value);
														if (+evt.target.value > amount) {
															element.price = +element.price * +evt.target.value;
														}
														if (+evt.target.value <= amount) {
															element.price = +element.price / +amount;
														}
													}
												});
											}}
										/>
										<button
											className="cart__delete"
											onClick={async () => {
												await axios.patch(`${API_URL}/profileDeleteFromCart`, {
													productID: item._id,
													userID: user._id,
												});
												window.location.reload();
											}}
										>
											убрать
										</button>
									</div>
								);
							})
						) : (
							<p className="empty">в корзине ничего нет</p>
						)}
					</div>
					<div className="cart__bottom">
						<p className="cart__summary">
							Общая стоимость:{' '}
							{userCart &&
								userCart.reduce((sum, elem) => {
									return sum + +elem.price;
								}, 0)}
							{' '}BYN
						</p>
						{userCart?.length ? (
							<button className="cart__button" onClick={() => setPay(true)}>
								заказать
							</button>
						) : null}
					</div>
				</div>
				<div className="cart__container">
					<h2 className="cart__title">Купленные товары</h2>
					<div className="cart__content">
						{userOrder?.length ? (
							userOrder.map((item) => (
								<div className="cart__item">
									<img className="cart__image" src={`${API_URL}/getImage/${item.avatar}`} alt="cart" />
									<p className="cart__price">цена: {item.price} BYN</p>
									{/* <button
										className="cart__delete"
										onClick={async () => {
											await axios.patch(`${API_URL}/profileDeleteFromCart`, { productID: item._id, userID: user._id });
											window.location.reload();
										}}
									>
										убрать
									</button> */}
								</div>
							))
						) : (
							<p className="empty">купленных нет</p>
						)}
					</div>
				</div>
			</main>

			{pay && (
				<Modal
					title={'Оплатить'}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<div className="pay__wrapper">
						<form
							className="par__form"
							encType="multipart/form-data"
							// method="POST"
							onSubmit={async (evt) => {
								evt.preventDefault();

								const formData = new FormData(evt.target);

								// formData.append('userID', user._id);

								const responseData = await axios({
									method: 'PATCH',
									url: `${API_URL}/profileAddOrder?userId=${user._id}`,
									data: formData,
									withCredentials: true,
								});
								window.location.reload();
							}}
						>
							<div className="card">
								<input
									className="pay__credit-num"
									type="tel"
									name="number"
									placeholder="Card Number"
									maxLength={16}
									onChange={(e) => {
										const { name, value } = e.target;
										setNumber(value);
									}}
									onFocus={(e) => setFocus(e.target.name)}
								/>

								<input
									className="pay__credit-name"
									type="tel"
									name="name"
									placeholder="Card name"
									onChange={(e) => {
										const { name, value } = e.target;
										setName(value);
									}}
									onFocus={(e) => setFocus(e.target.name)}
								/>

								<div className="pay__wrapper-b">
									<input
										className="pay__credit-b"
										type="tel"
										name="expiry"
										placeholder="expiry"
										maxLength={4}
										onChange={(e) => {
											const { value } = e.target;
											setExpiry(value);
										}}
										onFocus={(e) => setFocus(e.target.name)}
									/>

									<input
										className="pay__credit-b"
										type="tel"
										name="cvc"
										placeholder="cvc"
										maxLength={3}
										onChange={(e) => {
											const { value } = e.target;
											setCvc(value);
										}}
										onFocus={(e) => setFocus(e.target.name)}
									/>
								</div>
							</div>

							<button className="pay__button">оплатить</button>
						</form>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CartPage;
