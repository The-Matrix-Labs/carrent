import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import createHelpers from './createHelpers';
import createLogger from './logger';

export default function configureStore(initialState, config) {
  const helpers = createHelpers(config);
  const { apolloClient } = config;

  const middleware = [
    thunk.withExtraArgument(helpers),
    apolloClient.middleware()
  ];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = composeWithDevTools(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const rootReducer = createRootReducer({
    apolloClient,
  });

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // Don't forget to remove `()` if you change reducers back to normal rootReducer.
      store.replaceReducer(require('../reducers').default({ apolloClient })),
    );
  }

  return store;
}
