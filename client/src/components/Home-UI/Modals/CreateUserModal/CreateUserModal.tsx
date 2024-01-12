import { useContext } from 'react';
import ModalComponent from '../../../Common/ModalComponent/ModalComponent';
import { AppContext } from '../../../../pages/Home/Home';
import { Button, TextField } from '@mui/material';
import axiosClient from '../../../../utils/axiosClient';
import errorHandler from '../../../../utils/errorHandler';
import { StyledInputWrapper } from '../Modals.styled';

const CreateUserModal = () => {
	const { setShowModal, showModal, userData, setUserData, page, setRows } =
		useContext(AppContext);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const userDataObj = { [name]: value };

		setUserData({ ...userData!, ...userDataObj });
	};

	const handleCreateUser = async () => {
		try {
			const response = await axiosClient.post(`/createUser`, {
				...userData,
				page,
			});

			const newUserData = response.data.data;

			setRows((prevRows) => {
				const newRows = [...prevRows];
				newRows.push(newUserData);
				return newRows;
			});

			setUserData(undefined);
			setShowModal({ isOpen: false, modalStatus: '' });
		} catch (error) {
			errorHandler(error);
		}
	};

	return (
		<ModalComponent
			isOpen={showModal.isOpen}
			setShowModal={setShowModal}
		>
			<h2>Create New User </h2>
			<StyledInputWrapper>
				<label>First name</label>
				<TextField
					name='first_name'
					onChange={handleInputChange}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Last name</label>
				<TextField
					name='last_name'
					onChange={handleInputChange}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Email</label>
				<TextField
					name='email'
					onChange={handleInputChange}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Avatar</label>
				<TextField
					name='avatar'
					onChange={handleInputChange}
				/>
			</StyledInputWrapper>

			<Button
				onClick={handleCreateUser}
				variant='contained'
			>
				Create
			</Button>
		</ModalComponent>
	);
};

export default CreateUserModal;
