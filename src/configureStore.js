import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './dogs/redux';
import { watcherSaga } from './dogs/sagas';

export default function configureStore(initialState = {}) {
  // create the saga middleware
  const saga = createSagaMiddleware();

  const middlewares = [saga];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  // create a redux store with our reducer above and middleware
  let store = createStore(reducer, initialState, composeEnhancers(...enhancers));

  // run the saga
  saga.run(watcherSaga);

  return store;
}

