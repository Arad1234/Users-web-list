import axios from 'axios';
import { VITE_SERVER_URL } from '../common/commonConstants.ts';

const axiosClient = axios.create({
	baseURL: VITE_SERVER_URL,
	withCredentials: true,
});

export default axiosClient;
