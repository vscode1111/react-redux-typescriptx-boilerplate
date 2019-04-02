import { FETCH_POSTS, NEW_POSTS } from 'app/actions/types';

const initialState = {
   items: [],
   item: {}
}

export default function(state = initialState, actions: any) {
   switch(actions.type) {
      case FETCH_POSTS:
         console.log('FETCH_POSTS');
         return {
            ...state,
            items: actions.payload
         }
      default:
         return state;
   }
}