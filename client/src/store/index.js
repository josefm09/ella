import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { alertsReducer } from "./reducers/alertsReducer";
import { vestidosReducer } from "./reducers/vestidosReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  vestidosReducer,
  alertsReducer,
  bookingsReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
