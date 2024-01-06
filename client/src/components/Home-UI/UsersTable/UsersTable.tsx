import { DataGrid } from '@mui/x-data-grid';
import { TUser } from '../../../common/commonTypes';
import TableColumns from './TableColumns';

interface Props {
	rows: TUser[];
}

const dataGridWrapper = { height: 400, width: 1000 };

const UsersTable = ({ rows }: Props) => {
	return (
		<div style={dataGridWrapper}>
			<DataGrid
				rows={rows}
				columns={TableColumns()}
				hideFooter
			/>
		</div>
	);
};

export default UsersTable;
