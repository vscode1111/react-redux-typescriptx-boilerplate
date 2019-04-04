import { getData, postData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';

export enum Type {
   FETCH_POSTS = 'FETCH_POSTS',
   NEW_POST = 'NEW_POSTS'
}

export const fetchPosts = () => async (dispatch: any) => {
   console.log('fetchPosts');
   const responsePosts = await getData();
   dispatch({
      type: Type.FETCH_POSTS,
      payload: responsePosts
   })
}

export const createPost = (post: PostModel) => async (dispatch: any) => {
   console.log('createPost');
   const responsePost = await postData(post);
   dispatch({
      type: Type.NEW_POST,
      payload: responsePost
   })
}