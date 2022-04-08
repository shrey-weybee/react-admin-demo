import { combineReducers } from 'redux';
import themeReducer from "./themeReducer";
import {customerApi} from "../services/customer";

const rootReducer = {
    theme: themeReducer,
    [customerApi.reducerPath]:customerApi.reducer
}

export default combineReducers({...rootReducer})
