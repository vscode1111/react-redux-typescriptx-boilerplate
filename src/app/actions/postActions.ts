import { FETCH_POSTS, NEW_POST } from 'app/actions/types';
import { getData, postData } from 'app/api/main';
import { PostModel } from 'app/models/PostModel';

export const fetchPosts = () => async (dispatch: any) => {
   console.log('fetchPosts');
   const responsePosts = await getData();
   dispatch({
      type: FETCH_POSTS,
      payload: responsePosts
   })
}

export const createPost = (post: PostModel) => async (dispatch: any) => {
   console.log('createPost');
   const responsePost = await postData(post);
   dispatch({
      type: NEW_POST,
      payload: responsePost
   })
}