import { useState } from 'react';
import {
	StyledForm,
	StyledWrapper,
	StyledLoginButton,
	StyledTitle,
} from './AuthForm.styled';
import axiosClient from '../../../utils/axiosClient';
import errorHandler from '../../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const AuthForm = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const credentialObj = { [name]: value };

		setCredentials({ ...credentials, ...credentialObj });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await axiosClient.post('/login', { ...credentials });
			if (data.status === 'Authorized') {
				navigate('/home');
			}
		} catch (error) {
			errorHandler(error);
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledTitle>Login</StyledTitle>
			<StyledWrapper>
				<TextField
					type='email'
					name='email'
					placeholder='email'
					onChange={handleCredentialsChange}
				/>
				<TextField
					type='password'
					name='password'
					placeholder='password'
					onChange={handleCredentialsChange}
				/>

				<StyledLoginButton
					variant='contained'
					type='submit'
				>
					Login
				</StyledLoginButton>
			</StyledWrapper>
		</StyledForm>
	);
};

export default AuthForm;
