import { Store, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { rootReducer } from 'app/reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState?: any): Store {
   let middleware = compose(
      applyMiddleware(thunk),
      applyMiddleware(logger)
      // (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
   );

   if (process.env.NODE_ENV !== 'production') {
      middleware = composeWithDevTools(middleware);
   }

   const store = createStore(rootReducer as any, initialState as any, middleware) as Store;

   return store;
}
