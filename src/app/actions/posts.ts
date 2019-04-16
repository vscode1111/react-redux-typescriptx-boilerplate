import { createAction } from 'redux-actions';
import api from 'app/services/api';
import { PostModel } from 'app/models/PostModel';

export namespace PostActions {
   export enum Type {
      FETCH_POSTS = 'FETCH_POSTS',
      NEW_POST = 'NEW_POSTS'
   }

   // const actionFetch = (data: PostModel[]) => ({ type: Type.FETCH_POSTS, payload: data });
   const actionFetch = createAction<PostModel[]>(Type.FETCH_POSTS);
   // const actionCreate = (data: PostModel) => ({ type: Type.NEW_POST, payload: data });
   const actionCreate = createAction<PostModel>(Type.NEW_POST);

   export const fetchPosts = () => async (dispatch: any) => {
      console.log('fetchPosts');
      const responsePosts = await api.getData();
      // dispatch({
      //    type: Type.FETCH_POSTS,
      //    payload: responsePosts
      // })
      dispatch(actionFetch(responsePosts));
   }

   export const createPost = (post: PostModel) => async (dispatch: any) => {
      console.log('createPost');
      const responsePost = await api.postData(post);
      // dispatch({
      //    type: Type.NEW_POST,
      //    payload: responsePost
      // })
      dispatch(actionCreate(responsePost));
   }
}

// export type PostActions = Omit<typeof PostActions, 'Type'>;