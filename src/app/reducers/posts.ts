import { handleActions } from 'redux-actions';
import { PostActions } from 'app/actions/posts';
import { RootState } from 'app/reducers/state';
import { PostModel } from 'app/models/PostModel';

const initialState: RootState.PostsState = {
   items: [],
   item: {}
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

export const postReducer = handleActions<RootState.PostsState, PostModel[] & PostModel>(
   {
      [PostActions.Type.FETCH_POSTS]: (state, action) => {
         return {
            ...state,
            items: action.payload
         }
      },
      [PostActions.Type.NEW_POST]: (state, action) => {
         return {
            ...state,
            item: action.payload
         }
      }
   },
   initialState
);