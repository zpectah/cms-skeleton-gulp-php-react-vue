import { SET_POSTS, SET_USERS, SET_SETTINGS } from './types';

export function setSettings(payload) {
	return { type: SET_SETTINGS, payload };
}

export function setPosts(payload) {
	return { type: SET_POSTS, payload };
}

export function setUsers(payload) {
	return { type: SET_USERS, payload };
}
