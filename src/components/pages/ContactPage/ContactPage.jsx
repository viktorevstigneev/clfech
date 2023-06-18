import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../common/Header';
import './style.css';

import { API_URL } from '../../../constants';

const Music = ({ loadTeamData, team, match }) => (
	<div className='contact'>
		<Header />
		<div className="music_container">
			<h1 className="music__title">Contact us</h1>
			<form
				className="music__form"
				// method="POST"
				encType="multipart/form-data"
				onSubmit={async (evt) => {
					evt.preventDefault();

					const formData = new FormData(evt.target);

					const responseData = await axios({
						method: 'POST',
						url: `${API_URL}/music`,
						data: formData,
						withCredentials: true,
					});

					// if (responseData.status == 200) {
					// 	location.reload();
					// }
				}}
			>
				<label className="music__label" htmlFor="name" required="true">
					Fullname
				</label>
				<input className="music__input" id="name" type="text" placeholder="Enter fullname " name="name" required="true" />
				<label className="music__label" htmlFor="name">
					EMAIL
				</label>
				<input className="music__input" type="email" placeholder="Enter email" name="email" required="true" />
				<label className="music__label" htmlFor="name">
					Subject
				</label>
				<input className="music__input" type="text" placeholder="Enter subject" name="subject" required="true" />
				<label className="music__label" htmlFor="name">
					Message
				</label>
				<textarea className="music__message" placeholder="Enter message" name="message" required="true"></textarea>
				<button className="music__btn" type="submit">
					submit
				</button>
			</form>
		</div>

	</div>
);


export default Music;
