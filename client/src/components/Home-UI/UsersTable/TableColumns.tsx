import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	GridCellParams,
	GridColDef,
	GridTreeNode,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import axiosClient from '../../../utils/axiosClient';
import errorHandler from '../../../utils/errorHandler';
import { TUser } from '../../../common/commonTypes';
import { useContext } from 'react';
import { AppContext } from '../../../pages/Home/Home';
import CreateIcon from '@mui/icons-material/Create';

const iconStyle = {
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
	cursor: 'pointer',
};

const TableColumns = () => {
	const { setRows, page, setUserData, setShowModal } = useContext(AppContext);

	const handleTrashClick = async (
		e: GridCellParams<any, unknown, unknown, GridTreeNode>
	) => {
		try {
			await axiosClient.delete(`/deleteUser/${e.id}`, {
				data: { page },
			});

			setRows!((prevRows) => prevRows.filter((row) => row.id !== e.id));
		} catch (error) {
			errorHandler(error);
		}
	};

	const handlePencilClick = (
		e: GridCellParams<TUser, unknown, unknown, GridTreeNode>
	) => {
		const { id, avatar, email, first_name, last_name } = e.row;

		setUserData!({ id, avatar, email, first_name, last_name });
		setShowModal!({ isOpen: true, modalStatus: 'updateUser' });
	};

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'first_name',
			headerName: 'First name',
			editable: false,
			width: 150,
		},
		{
			field: 'last_name',
			headerName: 'Last name',
			editable: false,
			width: 150,
		},
		{
			field: 'avatar',
			headerName: 'Avatar',
			type: 'string',
			editable: false,

			width: 150,
		},
		{
			field: 'fullName',
			headerName: 'Full name',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			editable: false,
			width: 160,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.row.first_name || ''} ${params.row.last_name || ''}`,
		},
		{
			field: 'delete',
			headerName: 'Delete',
			sortable: false,
			width: 100,
			headerAlign: 'center',
			headerClassName: 'table-header',
			cellClassName: 'table-cell-icons',
			renderCell: (params: GridCellParams) => (
				<Box
					onClick={() => handleTrashClick(params)}
					sx={iconStyle}
				>
					<DeleteIcon />
				</Box>
			),
		},
		{
			field: 'edit',
			headerName: 'Edit',
			sortable: false,
			width: 100,
			headerAlign: 'center',
			headerClassName: 'table-header',
			cellClassName: 'table-cell',
			renderCell: (params: GridCellParams) => (
				<Box
					sx={iconStyle}
					onClick={() => handlePencilClick(params)}
				>
					<CreateIcon />
				</Box>
			),
		},
	];

	return columns;
};

export default TableColumns;
