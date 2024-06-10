import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading: true, error: null };
    case "fetch-data":
      return { ...state, loading: false, data: action.payload };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function UsePost() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchIt = (url, user, token) => {
    dispatch({ type: "api-request" });
    localInstance
      .post(url, user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res);
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e });
      });
  };

  return [state, fetchIt];
}

export default UsePost;
