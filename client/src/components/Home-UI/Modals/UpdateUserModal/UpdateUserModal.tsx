import { useContext } from 'react';
import ModalComponent from '../../../Common/ModalComponent/ModalComponent';
import { AppContext } from '../../../../pages/Home/Home';
import { Button, TextField } from '@mui/material';
import axiosClient from '../../../../utils/axiosClient';
import errorHandler from '../../../../utils/errorHandler';
import { StyledInputWrapper } from '../Modals.styled';

const UpdateUserModal = () => {
	const { setShowModal, showModal, userData, setUserData, page, setRows } =
		useContext(AppContext);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const userDataObj = { [name]: value };

		setUserData({ ...userData!, ...userDataObj });
	};

	const handleUpdateUser = async () => {
		const { id, ...restPayload } = userData!;
		try {
			await axiosClient.put(`/updateUser/${id}`, {
				...restPayload,
				page,
			});

			setRows((prevRows) => {
				return prevRows.map((row) => {
					if (row.id === id) {
						return { ...row, ...userData };
					}
					return row;
				});
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
			<h2>Update User</h2>
			<StyledInputWrapper>
				<label>First name</label>
				<TextField
					name='first_name'
					onChange={handleInputChange}
					defaultValue={userData?.first_name}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Last name</label>
				<TextField
					name='last_name'
					onChange={handleInputChange}
					defaultValue={userData?.last_name}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Email</label>
				<TextField
					name='email'
					onChange={handleInputChange}
					defaultValue={userData?.email}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label>Avatar</label>
				<TextField
					name='avatar'
					onChange={handleInputChange}
					defaultValue={userData?.avatar}
				/>
			</StyledInputWrapper>

			<Button
				onClick={handleUpdateUser}
				variant='contained'
			>
				Update
			</Button>
		</ModalComponent>
	);
};

export default UpdateUserModal;
