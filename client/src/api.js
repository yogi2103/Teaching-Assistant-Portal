const axios = require("axios");

export const loginUser = (user) => {
  console.log(user, "inside apissssssssssssss");
  return axios.post("http://localhost:8000/api/login", user, {
    withCredentials: true,
  });
};
export const getUser = () => {
  console.log("inside getuser");
  return axios.get("http://localhost:8000/api/getuser", {
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return axios.post("http://localhost:8000/api/logout", {
    withCredentials: true,
  });
};

export const registerUser = (user) => {
  console.log("inside register user")
  return axios.post("http://localhost:8000/api/register", user);
};
export const registerdoubt = (doubt) => {
  return axios.post("http://localhost:8000/api/register-doubt", doubt, {
    withCredentials: true,
  });
};

export const getdoubtsta = () => {
  return axios.get("http://localhost:8000/api/get-doubts-ta", {
    withCredentials: true,
  });
};
export const getdoubts=()=>{
  return axios.get('http://localhost:8080/api/get-doubts',{
    withCredentials:true
  })
}

export const updateAcceptDoubt = (id) => {
  return axios.post("http://localhost:8080/api/update-accept-doubt", id, {
    withCredentials: true,
  });
}
export const saveanswer= (obj) => {
  console.log("inside save answer",obj)
  return axios.post("http://localhost:8000/api/save-answer", obj, {
    withCredentials: true,
  });
}
export const savecomment= (obj) => {
  console.log("inside save comment",obj)
  return axios.post("http://localhost:8000/api/save-comment", obj, {
    withCredentials: true,
  });
}
export const getDashboardData=()=>{
  return axios.get('http://localhost:8000/api/get-dashboard-data',{
    withCredentials:true
  })
}