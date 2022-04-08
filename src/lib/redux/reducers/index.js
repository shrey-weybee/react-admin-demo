import { combineReducers } from 'redux';
import themeReducer from "./themeReducer";

const rootReducer = {
    theme: themeReducer
}

export default combineReducers({...rootReducer})
