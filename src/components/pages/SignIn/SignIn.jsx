import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { signIn } from './utils';
import { API_URL } from '../../../constants';
import './style.css';

const SignIn = ({user, setUser}) => {
	// const [user, setUser] = useState({});
	// console.log('user: ', user);

	const handleFormSubmit = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signIn({ formData, setUser });
	});

	return user?._id ? (
		<Navigate push to={`/`} />
	) : (
		<div className="auth">
			<div className="auth__container">
				<h2 className="auth__title">Авторизация</h2>
				<div className="auth__block">
					<form className="auth__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
						<label className="auth__label" htmlFor="username">
							Login
						</label>
						<input
							className="auth__input"
							name="username"
							id="username"
							// placeholder="Login"
							type="text"
							autoComplete='false'
							required={true}
						/>
						<label className="auth__label" htmlFor="password">
							Password
						</label>
						<input
							className="auth__input"
							name="password"
							id="password"
							// placeholder="Password"
							type="password"
							required={true}
						/>
						<button className="auth__button" type="submit">
							Войти
						</button>

						<Link className="auth__link" to="/signup">
							зарегистрироваться?
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
