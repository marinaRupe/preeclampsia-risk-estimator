import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from '../reducers/root.reducer';

const config = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

export default function configureStore(initialState) {
  const reducer = persistReducer(config, rootReducer());
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  store.asyncReducers = {};

  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/root.reducer', () => {
      const nextReducer = require('../reducers/root.reducer').default;
      store.replaceReducer(nextReducer);
    });
  }
  return { persistor, store };
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
}
