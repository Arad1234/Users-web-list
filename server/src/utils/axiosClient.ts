import axios from 'axios';

const axiosClient = axios.create({ baseURL: 'https://reqres.in/api' });

export default axiosClient;
