import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data_g_4: [],
  loading_g_4: false,
  error_g_4: null,
  pagi_g_4: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_g_4: true, error_g_4: null };
    case "fetch-data":
      return {
        ...state,
        loading_g_4: false,
        data_g_4: action.payload.result,
        pagi_g_4: action.payload.totalCount,
      };
    case "error":
      return { ...state, loading_g_4: false, error_g_4: action.payload };
    default:
      return state;
  }
};

function UseGet4() {
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

export default UseGet4;
