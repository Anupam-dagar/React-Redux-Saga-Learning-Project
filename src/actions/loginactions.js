import { LOGIN_USER } from "./types";

export const loginUser = user => dispatch => {
  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        localStorage.setItem("token", data.token);
        dispatch({
          type: LOGIN_USER,
          payload: data.user
        });
      }
    });
};
