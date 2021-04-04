import { SET_USER } from './types';

export function setUser(payload) {
	return { type: SET_USER, payload };
}
