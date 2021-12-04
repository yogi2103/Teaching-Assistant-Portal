import React from "react";
import {
  NavbarWrapper,
  FormGroup,
  Label,
  Form,
  Title,
  Container,
  AuthContainer,
  Input,
} from "./LandingElements";
import {useDispatch,useSelector} from 'react-redux';
import Navbar from "../../components/Navbar/index";
import { useNavigate } from "react-router-dom";
import { Swal } from 'sweetalert2';
function Landing() {
  const select = useSelector((state) => state.authReducer);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const [login, setLogin] = React.useState(false);
  if(select.isTeacher || select.isStudent || select.isModerator){
    navigate('home');
  }
  const toggleLogin = () => {
    setLogin(!login);
  };
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    //   console.log({[e.target.name]:e.target.value});
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
    const handleSubmitLogin = (e) => {
        e.preventDefault();
         console.log(loginData);
        dispatch({type:"LOGIN",payload:loginData});
    }
  const [signupData, setSignupData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    uid: "",
  });
  const handleSignupChange = (e) => {
     console.log(signupData,"uhikhu");
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  };
  const handleSubmitSignup = () => {
    dispatch({type:"SIGNUP",payload:signupData});
  }

  return (
    <Container>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      {login && (
        <AuthContainer>
          <Title>Login</Title>
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-center p-1"
                onChange={handleChange}
                name="email"
                value={loginData.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                className="formControl text-center p-1"
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
                value={loginData.password}
              />
            </FormGroup>
            <FormGroup>
              <button className="btn btn-secondary" onClick={handleSubmitLogin}>login</button>
              <p>have no account ?</p>
              <button onClick={toggleLogin} class="btn btn-dark">
                signup
              </button>
            </FormGroup>
          </Form>
        </AuthContainer>
      )}
      {!login && (
        <AuthContainer>
          <Title>Signup</Title>
          <Form>
            <FormGroup>
              <Label>UID</Label>
              <Input
                type="text"
                className="text-center"
                placeholder="enter your userid"
                onChange={handleSignupChange}
                name="uid"
                value={signupData.uid}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                className="text-center p-1"
                onChange={handleSignupChange}
                name="name"
                value={signupData.name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-center p-1"
                onChange={handleSignupChange}
                name="email"
                value={signupData.email}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                className="text-center p-1"
                placeholder="Enter your password"
                onChange={handleSignupChange}
                name="password"
                value={signupData.password}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className="text-center p-1"
                placeholder="Enter your password"
                onChange={handleSignupChange}
                name="confirmpassword"
                value={signupData.confirmpassword}
              />
            </FormGroup>
            <FormGroup>
              <button className="btn btn-secondary" onClick={(e)=>{
                e.preventDefault();
                dispatch({type:"REGISTER",payload:signupData});
                setLogin(true);
              }}>signup</button>
              <p>have an account ?</p>
              <button onClick={toggleLogin} className="btn btn-dark">
                login
              </button>
            </FormGroup>
          </Form>
        </AuthContainer>
      )}
    </Container>
  );
}

export default Landing;
