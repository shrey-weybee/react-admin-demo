import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { customerApi } from './services/customer';
import getRootMiddlewares from './middlewares';

// window.devToolsExtension = window.devToolsExtension;

const loggerMiddleware = createLogger({
  collapsed: true,
});
const initialState = {};

let enhancers = [];

console.log('Mode :' + process.env.NODE_ENV);

let isDevelopment = process.env.NODE_ENV === 'development';
// if (
//     isDevelopment &&
//     typeof window !== "undefined" &&
//     window.devToolsExtension
// ) {
//     enhancers.push(window.devToolsExtension());
// }

let middleware = [thunk];

if (isDevelopment) {
  middleware = [...middleware, loggerMiddleware];
}

// default REDUX
// export default createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware), ...enhancers)
// );

export default configureStore({
  reducer: rootReducer,
  middleware: (gdm) => getRootMiddlewares(gdm, middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  enhancers: enhancers,
});
