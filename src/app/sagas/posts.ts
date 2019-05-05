import api from 'app/services/api';
import { PostActions } from 'app/actions/posts';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { PostModel } from 'app/models/PostModel';

export function* fetchPostsTask() {
   try {
      const payload = yield call(api.getData);
      yield put(PostActions.fetchPostsSuccess(payload));
   } catch (err) {
      // yield put(fetchActivity.failure(err.message));
      yield put(PostActions.fetchPostsFailure(err.message));
   }
}

export function* watchFetchPosts() {
   console.log('watchFetchPosts');
   yield takeEvery(PostActions.Type.FETCH_POSTS_START, fetchPostsTask);
}

export default function* postsSaga() {
   console.log('postsSaga');
   yield all([
      fork(watchFetchPosts),
   ]);
}
