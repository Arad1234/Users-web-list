import React from 'react';
import { StyledModal, StyledModalBox } from './ModalComponent.styled';

interface Props {
	isOpen: boolean;
	children: React.ReactNode;
	setShowModal: React.Dispatch<
		React.SetStateAction<{ isOpen: boolean; modalStatus: string }>
	>;
}

const ModalComponent = ({ isOpen, setShowModal, children }: Props) => {
	const handleCloseModal = () => {
		setShowModal({ isOpen: false, modalStatus: '' });
	};

	return (
		<StyledModal
			open={isOpen}
			onClose={handleCloseModal}
		>
			<StyledModalBox>{children}</StyledModalBox>
		</StyledModal>
	);
};

export default ModalComponent;
