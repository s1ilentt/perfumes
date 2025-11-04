import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create pablic host
export const $host: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,// Add to the beginning of the line of the request of url server Host
})

// Create private host
export const $authHost: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // Add to the beginning of the line of the request of url server host
})

// Returns a new config before request to API
const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig  => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	if (token && config.headers) {
	  config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}

// Use interceptor for authHost before request
$authHost.interceptors.request.use(authInterceptor);