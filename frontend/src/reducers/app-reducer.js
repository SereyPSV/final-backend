import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		button: { confirm: 'Да', cancel: 'Нет' },
		width: '500px',
		isEdit: false,
		product: {
			id: '',
			productName: '',
			group: '',
			description: '',
			price: 0,
			amount: 0,
			imageUrl: '',
		},
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;
		default:
			return state;
	}
};
