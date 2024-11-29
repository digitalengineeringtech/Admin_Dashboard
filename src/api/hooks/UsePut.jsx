import React, { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data_put: [],
  loading_put: false,
  error_put: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_put: true, error_put: null };
    case "fetch-data":
      return { ...state, loading_put: false, data_put: action.payload };
    case "error":
      return { ...state, loading_put: false, error_put: action.payload };
    default:
      return state;
  }
};

function UsePut() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const putIt = (url, user, token) => {
    dispatch({ type: "api-request" });
    localInstance
      .put(url, user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e });
      });
  };

  return [state, putIt];
}

export default UsePut;
