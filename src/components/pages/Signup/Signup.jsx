import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { signUp } from './utils';
import { API_URL } from '../../../constants';
import SignInImg from '../../../img/logo.png';
import './style.css';

const SignUp = ({ user, setUser }) => {
	

	const handleFormSubmit = useCallback((evt) => {
		evt.preventDefault();
		const formData = Object.fromEntries(new FormData(evt.target));

		signUp({ formData, setUser });
	});

	useEffect(()=>{
		[].forEach.call(document.querySelectorAll('.tel'), function(input) {
			var keyCode;
			function mask(event) {
				event.keyCode && (keyCode = event.keyCode);
				var pos = this.selectionStart;
				if (pos < 3) event.preventDefault();
				var matrix = '+375 (__) ___  __ __',
					i = 0,
					def = matrix.replace(/\D/g, ''),
					val = this.value.replace(/\D/g, ''),
					new_value = matrix.replace(/[_\d]/g, function(a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
					});
				i = new_value.indexOf('_');
				if (i != -1) {
					i < 5 && (i = 3);
					new_value = new_value.slice(0, i);
				}
				var reg = matrix
					.substr(0, this.value.length)
					.replace(/_+/g, function(a) {
						return '\\d{1,' + a.length + '}';
					})
					.replace(/[+()]/g, '\\$&');
				reg = new RegExp('^' + reg + '$');
				if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) this.value = new_value;
				if (event.type == 'blur' && this.value.length < 5) this.value = '';
			}

			input.addEventListener('input', mask, false);
			input.addEventListener('focus', mask, false);
			input.addEventListener('blur', mask, false);
			input.addEventListener('keydown', mask, false);
		});
	},[])

	return user?._id ? (
		<Navigate push to={`/`} />
	) : (
		<div className="auth">
			<div className="auth__container">
				<h2 className="auth__title">Регистрация</h2>
				<div className="auth__block">
					<form className="auth__form" action={API_URL} method="POST" onSubmit={handleFormSubmit}>
						<label className="auth__label" htmlFor="username">
							Логин
						</label>
						<input
							className="auth__input"
							name="username"
							id="username"
							// placeholder="Login"
							type="text"
							required={true}
						/>
						<label className="auth__label" htmlFor="email">
							E-mail
						</label>
						<input
							className="auth__input"
							// name="email"
							id="email"
							// placeholder="Login"
							type="email"
							required={true}
						/>
						<label className="auth__label" htmlFor="ph">
							Номер телефона
						</label>
						<input
							className="auth__input tel"
							// name="email"
							id="ph"
							// placeholder="Login"
							type="tel"
							required={true}
							// onChange={(evt)=>{
							// 	let inText = evt.target.value;
							// 	evt.target.value = '+375(';
								
							// 	if(inText.length < 13){
							// 		 evt.target.setCustomValidity('номер слишком короткий'); 
							// 	}
							// }}
						/>
						<label className="auth__label" htmlFor="password">
							Пароль
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
							зарегистрироваться
						</button>

						<Link className="auth__link" to="/signin">
							хотите войти?
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
