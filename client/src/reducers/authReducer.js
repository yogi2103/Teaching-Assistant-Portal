import { LOGIN_START,LOGIN_FAIL,LOGIN_SUCCESS,REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_START,LOGOUT } from "../actions/authActions";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  isTeacher: false,
  isModerator: false,
  isStudent: false,
};
export default function authReducer(state = initialState, action) {
  console.log(action.payload,"inside reducer")
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        user: action.user ||{},
        isTeacher: action.payload.isTeacher || false,
        isModerator: action.payload.isModerator || false,
        isStudent: action.payload.isStudent || false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
