import axios from 'axios';
import { getLoginDataFromLocalStorage } from './auth.utils';
import { getLanguage } from './translation.utils';

const getToken = () => {
	return getLoginDataFromLocalStorage().token;
};

export const GET = (url, options = {}) => {
	return axios.get(
		url,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Accept-Language': getLanguage(),
			},
			...options,
		},
	);
};

export const POST = (url, body = {}, options = {}) => {
	return axios.post(
		url,
		body,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Accept-Language': getLanguage(),
			},
			...options,
		},
	);
};

export const PUT = (url, body = {}, options = {}) => {
	return axios.put(
		url,
		body,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Accept-Language': getLanguage(),
			},
			body: JSON.stringify(body),
			...options,
		},
	);
};

export const DELETE = (url, options = {}) => {
	return axios.delete(
		url,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`,
				'Accept-Language': getLanguage(),
			},
			...options,
		},
	);
};
