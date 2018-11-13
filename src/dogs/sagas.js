import { takeLatest, call, put } from 'redux-saga/effects';
import dogsClient from 'libs/dogsClient';
import { consts } from './redux';

const { FETCH_DOG_REQUEST, FETCH_DOG_FAILURE, FETCH_DOG_SUCCESS } = consts;

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(FETCH_DOG_REQUEST, workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return dogsClient.get('breeds/image/random');
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  const { data, error } = yield call(fetchDog);
  const dog = data.message;

  if (data) {
    // dispatch a success action to the store with the new dog
    yield put({ type: FETCH_DOG_SUCCESS, dog });
    return;
  }
  // dispatch a failure action to the store with the error
  yield put({ type: FETCH_DOG_FAILURE, error });
}
