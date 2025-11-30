import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const $host: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const $authHost: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, 
})

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig  => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	if (token && config.headers) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}

$authHost.interceptors.request.use(authInterceptor);