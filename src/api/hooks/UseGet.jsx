import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data_g: [],
  loading_g: false,
  error_g: null,
  pagi_g: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_g: true, error_g: null };
    case "fetch-data":
      return {
        ...state,
        loading_g: false,
        data_g: action.payload.result,
        pagi_g: action.payload.totalCount,
      };
    case "error":
      return { ...state, loading_g: false, error_g: action.payload };
    default:
      return state;
  }
};

function UseGet() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItGet = (url, token) => {
    dispatch({ type: "api-request " });
    localInstance
      .get(url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e });
      });
  };

  return [state, fetchItGet];
}

export default UseGet;
