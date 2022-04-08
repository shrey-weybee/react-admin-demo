// import { applyMiddleware, compose, createStore } from "redux";
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger'
// import rootReducer from "./reducers";
//
//
//
// export const store = createStore(rootReducer, applyMiddleware(thunk));

// import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// window.devToolsExtension = window.devToolsExtension;

const loggerMiddleware = createLogger({
    collapsed: true,
});
const initialState = {}

// export default function configureStore( initialState={}) {
    // In development, use the browser's Redux dev tools extension if installed
let enhancers = [];

console.log("Mode :" + process.env.NODE_ENV);

let isDevelopment = process.env.NODE_ENV === "development";
if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
) {
    enhancers.push(window.devToolsExtension());
}

let middleware = [thunk];

if (isDevelopment) {
    middleware = [...middleware, loggerMiddleware];
}

export default createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
);
// }
