import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/index";
import Teacher from "../../components/Teacher";
import Student from "../../components/Student";
import NotFound from '../../components/NotFound';
const Home = ({isAuthenticated}) => {
  if(!isAuthenticated){
    return <NotFound />
  }
  return (
    <>
      <div style={{ height: "80px" }}>
        <Navbar isAuthenticated={isAuthenticated} />
      </div>
      <div className="container border " style={{ height: "90vh" }}>
          <Outlet />
      </div>
    </>
  );
};

export default Home;
