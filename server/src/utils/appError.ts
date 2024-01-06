class AppError extends Error {
	statusCode: number;
	status: string;
	isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);

		this.statusCode = statusCode;
		this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
		this.isOperational = true; // For operational errors that will be sent to the user (not developer errors).

		Error.captureStackTrace(this, this.constructor); // Stoping the stack trace at the constructor function definition to check where the error occurred.
	}
}

export default AppError;
