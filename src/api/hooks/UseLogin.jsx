import { useReducer } from "react";
import { cloudInstance } from "../axios";

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

function useLogin() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchIt = (url, user) => {
    dispatch({ type: "api-request" });
    cloudInstance
      .post(url, user)
      .then((res) => {
        dispatch({ type: "fetch-data", payload: res.data.result });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e.message });
      });
  };

  return [state, fetchIt];
}

export default useLogin;
