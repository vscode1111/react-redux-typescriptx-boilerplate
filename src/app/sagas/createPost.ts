import api from 'app/services/api';
import { PostActions } from 'app/actions/posts';
import { call, put, takeEvery, all, fork, take, takeLatest } from 'redux-saga/effects'
import { PostModel } from 'app/models/PostModel';

export default function* createPostSaga() {
   console.log('createPostSaga');
   yield all([
      fork(watchCreatePost),
   ]);
}

export function* watchCreatePost() {
   console.log('watchCreatePost');
   yield takeLatest(PostActions.Type.CREATE_POST_START, createPostsTask);
}

export function* createPostsTask(action: any) {
   console.log(action.payload);
   try {
      yield call(api.postData, action.payload)
      yield put(PostActions.createPostSuccess(true));
   } catch (err) {
      yield put(PostActions.createPostFailure(err.message));
   }
}

