import React, { useEffect, useState } from 'react';

import Footer from '../../common/Footer';
import Slider from '../../common/Slider';

import { COLORS_FILTER, TYPE_FILTER } from './data';
import './style.css';
import { API_URL } from '../../../constants';
import { profileData } from './data';
import defaultImg from '../../../img/default.png';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

const orders = [
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
	{
		name: 'Smt by the way to know',
		status: 'is proceed',
	},
];

const ProfilePage = () => {
	const [user, setUser] = useState();
	const [cartData, setCartData] = useState();
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

	const userOrder = cartData && cartData.filter((value) => user?.order && user?.order.includes(value._id));
	console.log('userOrder: ', userOrder);

	return (
		<>
			<main className="profile">
				<div className="profile__container">
					<h1 className="profile__title">
						<FormattedMessage id="profile__title" />
					</h1>
					<div className="profile__wrapper">
						<img className="profile__avatar" src={defaultImg} alt="" />
						<div className="profile__block">
							<p className="profile__cred">
								<FormattedMessage id="profile__username" />: {user?.username}
							</p>
							{/* <p className="profile__cred">Email: gdjfdfsfs</p> */}
						</div>
					</div>
				</div>
				<div className="profile__bottom">
					<div className="bottom__head">
						<p className="bottom__title">
							<FormattedMessage id="profile__orders" />:
						</p>
						<p className="bottom__title">
							<FormattedMessage id="profile__orders__status" />:
						</p>
					</div>
					{userOrder ? (
						userOrder.map((order) => (
							<div className="bottom__order">
								<div style={{display: "flex", alignItems: "center"}}>
									<p className="bottom__order-name">{order?.typeClothes}</p>
									<img width={50} src={`${API_URL}/getImage/${order?.avatar}`} alt="pict" />
								</div>
								<p className="bottom__order-name">is proceed</p>
							</div>
						))
					) : (
						<div className="bottom__order">
							<FormattedMessage id="empty" />{' '}
						</div>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
};

export default ProfilePage;
