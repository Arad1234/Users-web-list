import { Box, Modal } from '@mui/material';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const StyledModalBox = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 30rem;
	background-color: white;
	border: 1px solid #000;
	border-radius: 20px;
	box-shadow: 24px;
	padding: 40px;
	gap: 20px;
`;
