import React, { useEffect, useState } from 'react';

import './style.css';
import axios from 'axios';
// import axios from 'axios';
import { API_URL } from '../../../constants';

const MainPage = ({ user }) => {
	const [newsData, setNewsData] = useState();
	const [currentText, setCurrentText] = useState();

	useEffect(() => {
		const getBenners = async () => {
			const responseData = await axios
				.get(`${API_URL}/banner`, { withCredentials: true })
				.then((response) => setNewsData(response.data));
		};
		getBenners();
	}, []);

	useEffect(() => {
		setCurrentText(newsData && newsData[0]?.news);
	}, [newsData]);

	return (
		<>
			<main className="home__main">
				
				<h1 className="home__title">Добро пожаловать</h1>
				<p className="home_caption">Fence Gear - все для фехтования </p>
				<div class = "wrapper">
						<input type="radio" name="point" id="slide1"/>
						<input type="radio" name="point" id="slide2"/>
						<input type="radio" name="point" id="slide3"/>
						<div class="slider">
							<div class="slides slide1"></div>
							<div class="slides slide2"></div>
							<div class="slides slide3"></div>
						</div>	
						<div class="controls">
							<label for="slide1"></label>
							<label for="slide2"></label>
							<label for="slide3"></label>
						</div>
				</div>
				<div className="home__news">
					{user && user.isAdmin ? (
						<form
							className="home__new-container"
							onSubmit={(evt) => {
								evt.preventDefault();
								axios.patch(`${API_URL}/banner`, { id: newsData[0]?._id, news: currentText });
								window.location.reload();
							}}
						>
							<p className="home_desc">Новинки</p>
							<textarea
								className="home__new-text"
								type="text"
								value={currentText}
								onChange={(evt) => {
									setCurrentText(evt.target.value);
								}}
							></textarea>

							<button className="home__new-btn" type="submit">
								сохранить
							</button>
						</form>
					) : (
						<div className="home__new-container">
							<p className="home_desc">Новинки</p><pre><p className="home_desc_text">{currentText}</p></pre>
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default MainPage;
