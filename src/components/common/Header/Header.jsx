import React, { useEffect, useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from '../../../img/logo.png';
import cart from '../../../img/cart.png';
import './style.css';

import { API_URL } from '../../../constants';

const Header = ({user}) => {
	const navigate = useNavigate();
	
	
	return (
		<header className="header">
			<div className="header__container">
				<img className="header__logo" src={logo} alt="logo" />

				<div className="header__nav-left">
					<Link className="header__link" to="/">
						Главная
					</Link>
					<Link className="header__link" to="/catalog">
						Каталог
					</Link>
					<Link className="header__link" to="/aboutFencing">
						О Фехтовании
					</Link>
					<Link className="header__link" to="/sale">
						Акции
					</Link>
					<Link className="header__link" to="/size">
						Размерные сетки
					</Link>

					{user && user.isAdmin ? (
						<Link className="header__link" to="/admin">
							Администрирование
						</Link>
					) : null}

					{user && user ? (
						<Link
							className="header__link"
							to="/"
							onClick={async (evt) => {
								const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
								if (response.status == 200) {
									window.location.reload();
								}
							}}
						>
							Выйти
						</Link>
					) : (
						<Link className="header__link" to="/signin">
							Войти
						</Link>
					)}

					{user ? (
						<Link className="header__link cart__link" to="/cart">
							<img className="header__cart" src={cart} alt="cart" />
							<i className="cart__amount">{user?.userCart?.length}</i>
						</Link>
					) : null}
				</div>
			</div>
		</header>
	);
};

export default Header;
