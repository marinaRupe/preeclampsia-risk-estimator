import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root.reducer';

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer(),
		initialState,
		compose(
			applyMiddleware(
				thunk,
			),
			window.devToolsExtension ? window.devToolsExtension() : f => f,
		),
	);

	return store;
}
