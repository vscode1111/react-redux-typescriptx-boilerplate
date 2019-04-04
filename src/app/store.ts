import { Store, createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { rootReducer } from 'app/reducers';

// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootRecucer from 'app/reducers'

// const initialState = [];

// const middleware = [thunk];

// const store = createStore(() => [], {}, applyMiddleware(...middleware));

// export default store;

export function configureStore(initialState?: any): Store {
   // let middleware = applyMiddleware(logger);
   let middleware = compose(
      applyMiddleware(thunk),
      (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
   );

   //   if (process.env.NODE_ENV !== 'production') {
   //     middleware = composeWithDevTools(middleware);
   //   }

   // const middleware = [thunk];

   const store = createStore(rootReducer as any, initialState as any, middleware) as Store;

   //   if (module.hot) {
   //     module.hot.accept('app/reducers', () => {
   //       const nextReducer = require('app/reducers');
   //       store.replaceReducer(nextReducer);
   //     });
   //   }

   return store;
}
