import { display } from "@mui/system";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useDispatch } from 'react-redux';

export default function ProtectedRoute({ children }) {
    const dispatch=useDispatch();
    dispatch({type:'LOGIN'});
    const select=useSelector(state=>state.auth.user);

  return select.isTeacher || select.isStudent || select.isModerator ? children : <Navigate to="/" />;
}
