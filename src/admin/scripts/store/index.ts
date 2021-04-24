import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import UiReducer from './ui/reducer';

const rootReducer = combineReducers({
	ui: UiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
