import { useContext } from 'react';
import { AppContext } from '../../../pages/Home/Home';
import UpdateUserModal from '../../Home-UI/Modals/UpdateUserModal/UpdateUserModal';
import CreateUserModal from '../../Home-UI/Modals/CreateUserModal/CreateUserModal';

const AllModals = () => {
	const { showModal } = useContext(AppContext);

	const { modalStatus } = showModal;

	return (
		<>
			{modalStatus === 'updateUser' && <UpdateUserModal />}
			{modalStatus === 'createUser' && <CreateUserModal />}
		</>
	);
};

export default AllModals;
