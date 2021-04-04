import UserStoreState from './store';
import { SET_USER } from './types';

function UserReducer(state = UserStoreState, action) {
	switch (action.type) {
		case SET_USER:
			return Object.assign({}, state, {
				user: action.payload,
			});
	}

	return state;
}

export default UserReducer;
