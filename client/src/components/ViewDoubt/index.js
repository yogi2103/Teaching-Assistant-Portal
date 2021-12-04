import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wrapper, Div } from "./ViewDoubtElement";
import { useSelector, useDispatch } from "react-redux";
import authReducer from "../../reducers/authReducer";
import { GET_SINGLE_DOUBT } from "../../actions/doubtsAction";
const ViewDoubt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answer,setAnswer] = React.useState("");
  const select = useSelector((state) => state.authReducer);
  const doubt = useSelector(
    (state) => state.doubtsReducer.filter((doubt) => doubt._id === id)[0]
  );
  const saveAnswer = () => {
    dispatch({
      type: "SAVE_ANSWER",
      payload: {
        answer,
        doubtId: id,
      },
    });
    navigate("/home");
  }
  console.log(doubt, "doubusirviusn");
  if (doubt == undefined) navigate("/home"); // if not accepted
  if (select.isModerator) {
    console.log(doubt, "jsbkjtesting");
    
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Solve doubts</h1>
        <div style={{height:"790px",border:"2px solid",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{width:"50%"}}>
            <h2>{doubt?.question.title}</h2>
            <h3>{doubt?.question.desc}</h3>
            <p>{doubt?.time}</p>
          </div>
          <div style={{display:"flex",flexDirection:'column'}}>
            <input type="text" style={{padding:"10px",width:''}} placeholder="Answer" value={answer} name="answer" onChange={(e)=>setAnswer(e.target.value)}/>
            <button className="btn btn-success" onClick={saveAnswer}>Answer</button>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/home")}
            >
              escalate
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>View /solve doubts</h1>
      <Wrapper>
        <Div>sdc</Div>
        <Div>v</Div>
      </Wrapper>
    </div>
  );
};

export default ViewDoubt;
