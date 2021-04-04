import { SET_POSTS, SET_USERS } from './types';

export function setPosts(payload) {
	return { type: SET_POSTS, payload };
}

export function setUsers(payload) {
	return { type: SET_USERS, payload };
}
