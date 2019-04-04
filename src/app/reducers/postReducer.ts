import { PostActions } from 'app/actions/postActions';

const initialState = {
   items: [],
   item: {}
}

export const postReducer = (state = initialState, action: any) => {
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
}