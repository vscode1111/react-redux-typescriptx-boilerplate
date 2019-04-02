import { Store, createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';

// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootRecucer from 'app/reducers'

// const initialState = [];

// const middleware = [thunk];

// const store = createStore(() => [], {}, applyMiddleware(...middleware));

// export default store;

export function configureStore(initialState?: RootState): Store<RootState> {
   // let middleware = applyMiddleware(logger);
   let middleware = applyMiddleware(thunk);

   //   if (process.env.NODE_ENV !== 'production') {
   //     middleware = composeWithDevTools(middleware);
   //   }

   // const middleware = [thunk];

   const store = createStore(rootReducer as any, initialState as any, middleware) as Store<RootState>;

   //   if (module.hot) {
   //     module.hot.accept('app/reducers', () => {
   //       const nextReducer = require('app/reducers');
   //       store.replaceReducer(nextReducer);
   //     });
   //   }

   return store;
}
