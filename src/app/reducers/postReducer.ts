import { FETCH_POSTS, NEW_POST } from 'app/actions/types';

const initialState = {
   items: [],
   item: {}
}

export const postReducer = (state = initialState, action: any) => {
   switch (action.type) {
      case FETCH_POSTS:
         console.log('FETCH_POSTS');
         return {
            ...state,
            items: action.payload
         }
      case NEW_POST:
         console.log('NEW_POST');
         return {
            ...state,
            item: action.payload
         }
      default:
         return state;
   }
}