import api from 'app/services/api';
import { PostActions } from 'app/actions/posts';
import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects'
import { PostModel } from 'app/models/PostModel';

export default function* createPostSaga() {
   console.log('createSaga');
   yield all([
      fork(watchCreatePost),
   ]);
}

export function* watchCreatePost() {
   console.log('watchCreatePost');
   yield takeEvery(PostActions.Type.CREATE_POST_START, createPostsTask);
}

export function* createPostsTask() {
   const result = yield take(PostActions.createPostsStart);
   console.log(result.payload);
   try {
      yield call(api.postData, result.payload)
      yield put(PostActions.createPostsSuccess());
   } catch (err) {
      yield put(PostActions.createPostsFailure(err.message));
   }
}

