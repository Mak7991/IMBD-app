import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import firebaseInstance from './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		return new Promise((resolve, reject) => {
			if (err?.response?.status === 401 && err?.config && !err?.config?.__isRetryRequest) {
				// if you ever get an unauthorized response, logout the user
				firebaseInstance.logOut()
			}
			throw err;
		});
	}
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
