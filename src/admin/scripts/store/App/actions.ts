import Api from '../../utils/api';
import { SET_POSTS, SET_USERS, SET_SETTINGS } from './types';

// Settings
export function loadSettings() {
	return async (dispatch) => {
		try {
			let data = await Api.get('/api/get_settings');
			dispatch(setSettings(data.data));
		} catch (error) {
			console.warn(error);
		}
	};
}

export function setSettings(payload) {
	return { type: SET_SETTINGS, payload };
}

// Posts
export function loadPosts() {
	return async (dispatch) => {
		try {
			let data = await Api.get('/api/get_posts');
			dispatch(setPosts(data.data));
		} catch (error) {
			console.warn(error);
		}
	};
}

export function setPosts(payload) {
	return { type: SET_POSTS, payload };
}

// Users
export function loadUsers() {
	return async (dispatch) => {
		try {
			let data = await Api.get('/api/get_users');
			dispatch(setUsers(data.data));
		} catch (error) {
			console.warn(error);
		}
	};
}

export function setUsers(payload) {
	return { type: SET_USERS, payload };
}
