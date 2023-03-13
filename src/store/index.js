import {createStore, combineReducers} from 'redux';
import userSessionReducer from './reducer/loginReducer';

const combinedReducers = combineReducers({
  userSessionReducer,
});

const store = createStore(combinedReducers);

export default store;
