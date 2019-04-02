import { FETCH_POSTS, NEW_POSTS } from 'app/actions/types';
import { getData } from 'app/api/main';

export const fetchPosts = () => async (dispatch: any) => {
   console.log('fetchPosts');
   const data = await getData();
   dispatch({
      type: FETCH_POSTS,
      payload: data
   })
}