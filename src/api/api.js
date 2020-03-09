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
        throw data.error;
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
        throw data.error;
      } else {
        return data;
      }
    });
};

export const getUserProfileApi = token => {
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
        throw data.detail;
      } else {
        return data;
      }
    });
};

export const getAllRestaurants = (page, token) => {
  return fetch(`http://localhost:8000/api/v1/restaurants/?page=${page.page}`, {
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
        throw data.detail;
      } else {
        let nextPage = data.next === null ? null : page.page + 1;
        let prevPage = data.previous === null ? null : page.page - 1;
        return {
          ...data,
          prevPage: prevPage,
          currentPage: page.page,
          nextPage: nextPage,
          numPages: Math.ceil(data.count / 10)
        };
      }
    });
};

export const filterRestaurants = (page, day, time, token) => {
  return fetch(
    `http://localhost:8000/api/v1/restaurants/${day}/${time}?page=${page.page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      }
    }
  )
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      } else {
        let nextPage = data.next === null ? null : page.page + 1;
        let prevPage = data.previous === null ? null : page.page - 1;
        return {
          ...data,
          prevPage: prevPage,
          currentPage: page.page,
          nextPage: nextPage,
          numPages: Math.ceil(data.count / 10)
        };
      }
    });
};

export const filterNameRestaurants = (page, name, token) => {
  return fetch(
    `http://localhost:8000/api/v1/names/${name}?page=${page.page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      }
    }
  )
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      } else {
        let nextPage = data.next === null ? null : page.page + 1;
        let prevPage = data.previous === null ? null : page.page - 1;
        return {
          ...data,
          prevPage: prevPage,
          currentPage: page.page,
          nextPage: nextPage,
          numPages: Math.ceil(data.count / 10)
        };
      }
    });
};
