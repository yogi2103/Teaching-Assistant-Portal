import { fork } from "redux-saga/effects";
import authSaga from './auth';
import doubtsSaga from "./doubts";

export default function* rootSaga() {
    yield fork(authSaga);
    yield fork(doubtsSaga)
}