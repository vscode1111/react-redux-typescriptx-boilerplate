import api from 'app/services/api';
import { PostActions } from 'app/actions/posts';
import { call, put, takeEvery } from 'redux-saga/effects'

export function* fetchPostsTask() {
   try {
      const payload = yield call(api.getData);
      // yield put(fetchActivity.success(payload));
   } catch (err) {
      // yield put(fetchActivity.failure(err.message));
   }
}

export function* watchFetchPosts() {
   yield takeEvery(PostActions.Type.FETCH_POSTS, fetchPostsTask);
}

export default function* postsSaga() {
   yield [
      watchFetchPosts(),
   ];
}
