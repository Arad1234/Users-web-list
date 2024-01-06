import { Button } from '@mui/material';
import styled from 'styled-components';

export const StyledForm = styled.form`
	background-color: lightgray;
	padding: 100px;
	border-radius: 20px;
	position: relative;
`;

export const StyledTitle = styled.label`
	position: absolute;
	right: 100px;
	left: 100px;
	display: flex;
	justify-content: center;
	top: 30px;
	font-size: 30px;
	font-weight: 600;
`;

export const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const StyledLoginButton = styled(Button)`
	padding: 20px;
	display: flex;
	justify-content: center;
	width: 100%;
`;
