export const loginUserApi = user => {
  return fetch("http://localhost:8000/api/auth/login", {
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
        return data;
      }
    });
};

export const signupUserApi = user => {
  return fetch("http://localhost:8000/api/auth/register", {
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
        return data;
      }
    });
};

export const getUserProfileApi = token => {
  console.log('han hua');
  return fetch("http://localhost:8000/api/auth/user", {
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
      } else {
        return data;
      }
    });
};
