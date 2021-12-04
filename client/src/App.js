import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./pages/Landing";
import { useNavigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import Moderator from "./components/Moderator";
import { useEffect } from "react";
import { getdoubts } from "./api";
import { getDoubts } from "./actions/doubtsAction";
import ViewDoubt from './components/ViewDoubt/index';
function App() {
  const select = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const isAuthenticated =
    select.isTeacher || select.isStudent || select.isModerator;
  useEffect(() => {
    if(select.isModerator){
    dispatch({type:"GET_DOUBTS_TA"})
    }
    else if(select.isStudent){
      dispatch({type:"GET_DOUBTS"})
    }
  },[isAuthenticated])
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Landing  /> }
          />
          <Route
            path="/home"
            element={<Home isAuthenticated={isAuthenticated}/>}
          >
            <Route index  element={select.isStudent?<Student/>:select.isTeacher?<Teacher/>:<Moderator/>}/>
            <Route path=":id" element={<ViewDoubt />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
