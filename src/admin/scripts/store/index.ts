import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import UiReducer from './ui/reducer';
import UserReducer from './user/reducer';
import AppReducer from './App/reducer';

const rootReducer = combineReducers({
	ui: UiReducer,
	user: UserReducer,
	app: AppReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
