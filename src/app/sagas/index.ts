import postsSaga from 'app/sagas/posts';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
   yield all ([
      fork(postsSaga)
   ])
}