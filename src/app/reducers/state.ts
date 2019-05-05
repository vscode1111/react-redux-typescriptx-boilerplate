import { PostModel } from 'app/models/PostModel';

export interface PostReducerModel {
   items: PostModel[];
   item: PostModel;
   error: any
}

export namespace RootState {
  export type PostsState = PostReducerModel;
}
