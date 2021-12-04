import { put, takeEvery, call, all, takeLatest } from "redux-saga/effects";
import { getUser, loginUser, registerUser, logoutUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../actions/authActions";

function* login(action) {
  console.log("inside saga login");
  console.log(action);
  const response = yield loginUser(action.payload);
  console.log(response.data.user, "vjbdk");
  yield put({ type: LOGIN_SUCCESS, payload: response.data.user });
}
function* getstate() {
  try {
    console.log("inside getstate");
    const response = yield getUser();
    console.log(response, "response");
    yield put({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (e) {
    console.log(e);
  }
}

function* register(action) {
  try {
    const response = yield registerUser(action.payload);
    console.log(response.data.msg, "response", response.status);
  } catch (e) {
    console.log(e);
  }
}

function* logout() {
  try {
    console.log("inside logout");
    yield logoutUser();
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        user: {},
        isLoading: false,
        error: null,
        isTeacher: false,
        isModerator: false,
        isStudent: false,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest("LOGIN", login),
    takeLatest("GET_USER", getstate),
    takeEvery("REGISTER", register),
    takeEvery("LOGOUT", logout),
    // takeEvery("GET_USER_REQUEST", getUserSaga),
  ]);
}
