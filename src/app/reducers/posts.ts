import { handleActions } from 'redux-actions';
import { PostActions } from 'app/actions/posts';
import { RootState } from 'app/reducers/state';
import { PostModel } from 'app/models/PostModel';

const initialState: RootState.PostsState = {
   items: [],
   item: {},
   error: ''
}

/* export const postReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case PostActions.Type.FETCH_POSTS:
         return {
            ...state,
            items: action.payload
         }
      case PostActions.Type.NEW_POST:
         return {
            ...state,
            item: action.payload
         }
      default:
         return state;
   }
} */

export const postReducer = handleActions<RootState.PostsState, PostModel[] & PostModel & any>(
   {
      [PostActions.Type.FETCH_POSTS_SUCCESS]: (state, action) => {
         return {
            ...state,
            items: action.payload
         }
      },
      [PostActions.Type.FETCH_POSTS_FAILURE]: (state, action) => {
         return {
            ...state,
            error: action.payload
         }
      },
      [PostActions.Type.CREATE_POST_START]: (state, action) => {
         return {
            ...state,
            item: action.payload
         }
      }
   },
   initialState
);