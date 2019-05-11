import { createAction } from 'redux-actions';
// import api from 'app/services/api';
import { PostModel } from 'app/models/PostModel';
import { createActions } from 'app/utils/actions';

export namespace PostActions {
   export enum Type {
      FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST',
      FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
      FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE',

      CREATE_POST_REQUEST = 'CREATE_POST_REQUEST',
      CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS',
      CREATE_POST_FAILURE = 'CREATE_POST_FAILURE',
   }

   export const fetchActivity = {
      request: createAction(Type.FETCH_POSTS_REQUEST),
      success: createAction<PostModel[]>(Type.FETCH_POSTS_SUCCESS),
      failure: createAction<any>(Type.FETCH_POSTS_FAILURE)
   };

   export const createActivity = {
      request: createAction(Type.FETCH_POSTS_REQUEST),
      success: createAction(Type.CREATE_POST_SUCCESS),
      failure: createAction<any>(Type.CREATE_POST_FAILURE)
   }
}
