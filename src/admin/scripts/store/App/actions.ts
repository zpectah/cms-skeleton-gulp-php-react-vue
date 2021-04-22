import api from '../../utils/api';
import { SET_POSTS, SET_USERS, SET_SETTINGS, SET_TAGS } from './types';
import { setDataLoading, setDataError } from '../ui/actions';

// Settings
export function loadSettings() {
	return async (dispatch) => {
		dispatch(setDataLoading(true));
		try {
			let data = await api.get('/api/get_settings');
			dispatch(setSettings(data.data));
			dispatch(setDataLoading(false));
		} catch (error) {
			console.warn(error);
			dispatch(setDataError(true));
			dispatch(setDataLoading(false));
		}
	};
}

export function setSettings(payload) {
	return { type: SET_SETTINGS, payload };
}

// Posts
export function loadPosts() {
	return async (dispatch) => {
		dispatch(setDataLoading(true));
		try {
			let data = await api.get('/api/get_posts');
			dispatch(setPosts(data.data));
			dispatch(setDataLoading(false));
		} catch (error) {
			console.warn(error);
			dispatch(setDataError(true));
			dispatch(setDataLoading(false));
		}
	};
}

export function setPosts(payload) {
	return { type: SET_POSTS, payload };
}

// Users
export function loadUsers() {
	return async (dispatch) => {
		dispatch(setDataLoading(true));
		try {
			let data = await api.get('/api/get_users');
			dispatch(setUsers(data.data));
			dispatch(setDataLoading(false));
		} catch (error) {
			console.warn(error);
			dispatch(setDataError(true));
			dispatch(setDataLoading(false));
		}
	};
}

export function setUsers(payload) {
	return { type: SET_USERS, payload };
}

// Tags
export function loadTags() {
	return async (dispatch) => {
		dispatch(setDataLoading(true));
		try {
			let data = await api.get('/api/get_tags');
			dispatch(setTags(data.data));
			dispatch(setDataLoading(false));
		} catch (error) {
			console.warn(error);
			dispatch(setDataError(true));
			dispatch(setDataLoading(false));
		}
	};
}

export function setTags(payload) {
	return { type: SET_TAGS, payload };
}
