import { savecomment,getdoubts, registerdoubt,saveanswer,getdoubtsta } from "../api";
import { all, takeEvery, put } from "redux-saga/effects";

import {
  GET_DOUBTS,
  REGISTER_DOUBT,
  SET_DOUBTS,
} from "../actions/doubtsAction";

function* registerDoubt(action) {
  try {
    console.log("inside register doubt");
    const response = yield registerdoubt(action.payload);
    yield put({ type: "ADD_DOUBT", payload: response.data.doubt });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function* getDoubts() {
  try {
    console.log("inside get doubts");
    const response = yield getdoubts();
    yield put({ type: SET_DOUBTS, payload: response.data.doubts });
  } catch (e) {
    console.log(e);
  }
}
function* getDoubtsForTa(){
  try{
    console.log("inside get douts for ta");
    const response = yield getdoubtsta();
    yield put({type:SET_DOUBTS,payload:response.data.doubts});
  }
  catch(e){
    console.log(e);
  }
}


function* updateAcceptDoubt(action) {
  try {
    console.log("inside update accept doubt");
    const response = yield updateAcceptDoubt(action.payload);
  } catch (e) {
    console.log(e);
  }
}

function* saveAnswer(action){
  try{
    console.log("inside save answer");
    const response = yield saveanswer(action.payload); 
    yield put({type:"GET_DOUBTS_TA"});
  }catch(e){
    console.log(e);
  }
}

function * saveComment(action){
  try{
    console.log("inside save comment");
    const response = yield savecomment(action.payload);
    yield put({type:GET_DOUBTS});
  }catch(e){
    console.log(e);
  }
}

export default function* doubtsSaga() {
  yield all([
    takeEvery(REGISTER_DOUBT, registerDoubt),
    takeEvery(GET_DOUBTS, getDoubts),
    takeEvery("GET_DOUBTS_TA",getDoubtsForTa),
    takeEvery("UPDATE_ACCEPT_DOUBT", updateAcceptDoubt),
    takeEvery("SAVE_ANSWER",saveAnswer),
    takeEvery("SAVE_COMMENT",saveComment),
  ]);
}
