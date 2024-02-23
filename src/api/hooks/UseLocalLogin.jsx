import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  L_data: [],
  L_loading: false,
  L_error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, L_loading: true, L_error: null };
    case "fetch-data":
      return { ...state, L_loading: false, L_data: action.payload };
    case "error":
      return { ...state, L_loading: false, L_error: action.payload };
    default:
      return state;
  }
};

function useLocalLogin() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchIt = (url, user) => {
    dispatch({ type: "api-request" });
    localInstance
      .post(url, user)
      .then((res) => {
        console.log("dispatch", res.data);
        dispatch({ type: "fetch-data", payload: res.data.result });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e.message });
      });
  };

  return [state, fetchIt];
}

export default useLocalLogin;
