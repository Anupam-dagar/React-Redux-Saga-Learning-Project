import { LOGIN_USER } from "./types";

export const getUserProfile = () => dispatch => {
  const token = localStorage.token;
  
  if (token) {
    fetch("http://localhost:8000/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.detail) {
          console.log(data.detail);
          localStorage.removeItem("token");
        } else {
          dispatch({
            type: LOGIN_USER,
            payload: data.user
          });
        }
      });
  }
};
