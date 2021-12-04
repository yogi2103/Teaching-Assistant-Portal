import authReducer from './authReducer'
import { doubtsReducer } from './doubtsReducer';
import { combineReducers } from 'redux'

const combinedReducers = combineReducers({
    authReducer,
    doubtsReducer
})
export default combinedReducers;