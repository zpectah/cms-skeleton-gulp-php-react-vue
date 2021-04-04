import AppStoreState from './store';
import { SET_POSTS, SET_USERS } from './types';

function AppReducer(state = AppStoreState, action) {
	switch (action.type) {
		case SET_POSTS:
			return Object.assign({}, state, (state.Posts = action.payload));
		case SET_USERS:
			return Object.assign({}, state, (state.Users = action.payload));
	}

	return state;
}

export default AppReducer;
