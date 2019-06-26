import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import homeReducer from '../home/store/reducer'


export default combineReducers({
    home: homeReducer
})