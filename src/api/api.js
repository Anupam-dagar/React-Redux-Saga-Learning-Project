export const loginUserApi = user => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user)
    }
  )
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
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(user)
    }
  )
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
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/user`,
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
      if (data.detail) {
        throw data.detail;
      } else {
        return data;
      }
    });
};

export const getAllRestaurants = (page, token) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/restaurants/?page=${page.page}`,
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

export const filterRestaurants = (page, day, time, value, token) => {
  const url =
    value !== ""
      ? `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/restaurants/${day}/${time}/${value}?page=${page.page}`
      : `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/restaurants/${day}/${time}?page=${page.page}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${token}`
    }
  })
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
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/names/${name}?page=${page.page}`,
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

export const createCollectionApi = (userId, collectionName, token) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        user: userId,
        name: collectionName,
        collaborators: [userId]
      })
    }
  )
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      } else {
        return data;
      }
    });
};

export const getCollectionsApi = (userId, token) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/${userId}`,
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
        return data;
      }
    });
};

export const addRestaurantCollectionsApi = (
  collectionId,
  restaurantId,
  token
) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        restaurant_collection: collectionId,
        restaurant: restaurantId
      })
    }
  )
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      } else {
        return data;
      }
    });
};

export const getRestaurantCollectionsApi = (userId, restaurantId, token) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/${userId}/restaurants/${restaurantId}`,
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
        return data;
      }
    });
};

export const getRestaurantsInCollectionApi = (
  userId,
  collectionName,
  token
) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/${userId}/${collectionName}`,
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
        return data;
      }
    });
};

export const deleteRestaurantsInCollectionApi = (
  userId,
  collectionName,
  restaurantId,
  token
) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/delete/${userId}/${collectionName}/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      }
    }
  ).then(resp => {
    const response = {};
    if (resp.status === 204) {
      return { ...response, success: collectionName };
    } else {
      throw resp.json();
    }
  });
};

export const updateRestaurantCollectionApi = (data, collectionId, token) => {
  return fetch(
    `${process.env.REACT_APP_REST_PROTOCOL}${process.env.REACT_APP_BACKEND_ENDPOINT}/api/v1/collections/update/${collectionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    }
  )
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        throw data.error;
      } else {
        return data;
      }
    });
};
