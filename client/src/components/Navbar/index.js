import React from "react";
import { NavContainer } from "./NavbarElements";
import { useSelector } from "react-redux";
import authReducer from "../../reducers/authReducer";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const select = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <NavContainer>
      <h3>doubt clearing platform</h3>
      {(select.isTeacher || select.isStudent || select.isModerator) && (
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch({ type: LOGOUT });
            navigate("/");
          }}
        >
          logout
        </button>
      )}
    </NavContainer>
  );
};

export default Navbar;
