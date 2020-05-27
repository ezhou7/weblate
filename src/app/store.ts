import { createStore, applyMiddleware, Middleware } from "redux";
import thunkMiddleware from "redux-thunk";
import loggingMiddleware from "redux-logger";

import rootReducer from "./reducers";

let middlewares: Middleware[] = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares = [thunkMiddleware, loggingMiddleware];
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
