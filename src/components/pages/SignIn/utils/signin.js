import axios from 'axios';

import { API_URL } from '../../../../constants';

const signIn = ({ formData, setUser }) => {
	axios({
		method: 'POST',
		data: {
			username: formData.username,
			password: formData.password,
		},
		withCredentials: true,
		url: `${API_URL}/signin`,
	})
		.then((response) => {
			setUser(response.data);
		})
		.catch((error) => {
			alert('Some thing went wrong, may be you entered incorrect password or login');
			console.log('error: ', error);
		});
};

export default signIn;
