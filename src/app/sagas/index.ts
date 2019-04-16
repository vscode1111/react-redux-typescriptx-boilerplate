import postsSaga from 'app/sagas/posts';

export default function* rootSaga() {
   yield [
      postsSaga()
   ]
}