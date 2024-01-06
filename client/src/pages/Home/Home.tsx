import { createContext, useEffect, useState } from 'react';
import axiosClient from '../../utils/axiosClient';
import UsersTable from '../../components/Home-UI/UsersTable/UsersTable';
import { StyledButtonsWrapper, StyledHomeContainer } from './Home.styled';
import { Button } from '@mui/material';
import { TContext, TUser } from '../../common/commonTypes';
import AllModals from '../../components/Common/AllModals/AllModals';

export const AppContext = createContext<TContext>({});

const Home = () => {
	const [showModal, setShowModal] = useState({
		isOpen: false,
		modalStatus: '',
	});
	const [userData, setUserData] = useState<TUser | undefined>(undefined);
	const [page, setPage] = useState(1);
	const [rows, setRows] = useState<TUser[]>([]);

	const fetchUsers = async () => {
		const { data } = await axiosClient.get(`/getUsers/${page}`);

		const usersRows = data.data;

		setRows(usersRows);
	};

	useEffect(() => {
		fetchUsers();
	}, [page]);

	return (
		<AppContext.Provider
			value={{
				setShowModal,
				showModal,
				setRows,
				page,
				userData,
				setUserData,
			}}
		>
			<StyledHomeContainer>
				<h1>Users Web List</h1>
				<UsersTable rows={rows} />
				<Button
					onClick={() =>
						setShowModal({ isOpen: true, modalStatus: 'createUser' })
					}
					variant='contained'
				>
					Create New User
				</Button>

				<StyledButtonsWrapper>
					<Button
						disabled={page === 1}
						variant='contained'
						onClick={() => setPage((prev) => prev - 1)}
					>
						Previous
					</Button>
					<Button
						variant='contained'
						disabled={!rows.length}
						onClick={() => setPage((prev) => prev + 1)}
					>
						Next
					</Button>
				</StyledButtonsWrapper>
				<AllModals />
			</StyledHomeContainer>
		</AppContext.Provider>
	);
};

export default Home;
