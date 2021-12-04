import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doubtsReducer } from "../../reducers/doubtsReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Moderator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const select = useSelector((state) => state.doubtsReducer);
  const acceptDoubt = (id) => {
    console.log("accept doubt");
    dispatch({ type: "UPDATE_ACCEPT_DOUBT", payload: id });
    navigate(`/home/${id}`);
  };
  return (
    <div className="text-center">
      <h1>Solve doubts</h1>
      <div style={{display:"flex",flexDirection:'column',alignItems:"center",height:"1000px",overflow:"scroll"}}>
      {select?.length ===0?<h2>No doubts to solve</h2>:null}
      {select.map((doubt, index) => {
        return (
          <div style={{border:"2px solid",width:"50%"}}>
            <h3>{doubt.question.title}</h3>
            <p>{doubt.question.desc}</p>
            <button
              className="btn btn-primary"
              onClick={() => acceptDoubt(doubt._id)}
            >
              Accept and Solve
            </button>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Moderator;
