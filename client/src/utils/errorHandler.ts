import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const errorHandler = async (error: Error | AxiosError | unknown) => {
	let errorMsg;
	if (error instanceof AxiosError) {
		errorMsg =
			error.response?.data.message || error.response?.data || error.message;
	} else if (error instanceof Error) {
		errorMsg = error.message;
	}
	if (
		errorMsg === 'Network Error' ||
		errorMsg === 'Request failed with status code 404'
	) {
		errorMsg = 'Error connecting to server';
	}
	console.log('errorMsg', errorMsg);

	toast.error(errorMsg);
};

export default errorHandler;
