import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { registerDoubt } from "../../actions/doubtsAction";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AuthContainer } from "../../pages/Landing/LandingElements";
function Student() {
  const [show, setShow] = useState(false);
  const select = useSelector((state) => state.doubtsReducer);
  const [comment, setComment] = useState(new Array(select.length).fill(""));
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });
  const saveComment = (obj) => {
    dispatch({ type: "SAVE_COMMENT", payload: obj });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Button
        variant="dark"
        onClick={handleShow}
        style={{ height: "20%", marginLeft: "40%" }}
      >
        Raise A Doubt
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>title</h4>
          <input name={"title"} value={form.title} onChange={handleChange} />
          <h4>description</h4>
          <input name={"desc"} value={form.desc} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(registerDoubt(form));
              Swal.fire(
                "Doubt created",
                "you will get a notification",
                "success"
              );
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          flexDirection: "column",
          border: "1px solid black",
          overflow: "scroll",
        }}
      >
        {select?.map((item, index) => {
          return (
            <Data>
              <div>
                <h3>{item?.question.title}</h3>
                <p>{item?.question.desc}</p>
                <small>
                  asked by {item?.raisedByName} on {item?.time}
                </small>
              </div>
              <div>
                <h4>solution: {item?.answer}</h4>
                <input
                  value={comment[index]}
                  name={"comment"}
                  onChange={(e) => {
                    let temp = [...comment];
                    temp[index] = e.target.value;
                    setComment(temp);
                  }}
                  style={{ width: "100%" ,padding:"10px"}}
                  placeholder="add a comment"
                />
                {item?.comments?.map((text, index) => {
                  return <div>{text}</div>;
                })}
                <button
                  onClick={() =>
                    saveComment({ _id: item?._id, comment: comment[index] })
                  }
                  className="btn btn-primary"
                >
                 
                  send comment
                </button>
              </div>
            </Data>
          );
        })}
        {select?.length === 0 ? <h1>No Doubts</h1> : null}
      </div>
    </div>
  );
}

export default Student;

export const Data = styled.div`
  display: flex;
  border: 2px solid black;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: "90%";
  height: "100%";
`;
