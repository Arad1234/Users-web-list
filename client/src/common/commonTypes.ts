export type TUser = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
};

export type TContext = {
	showModal?: { isOpen: boolean; modalStatus: string };
	setShowModal?: React.Dispatch<
		React.SetStateAction<{ isOpen: boolean; modalStatus: string }>
	>;
	setRows?: React.Dispatch<React.SetStateAction<TUser[]>>;
	page?: number;
	userData?: TUser;
	setUserData?: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};
