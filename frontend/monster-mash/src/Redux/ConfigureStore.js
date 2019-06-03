import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from "history";
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from '../Reducers';

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

export const configureStore = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({ collapsed: true }),
      middleware
    )
  )
);
