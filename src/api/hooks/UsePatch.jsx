import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data_pch: [],
  loading_pch: false,
  error_pch: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_pch: true, error_pch: null };
    case "fetch-data":
      return { ...state, loading_pch: false, data_pch: action.payload };
    case "error":
      return { ...state, loading_pch: false, error_pch: action.payload };
    default:
      return state;
  }
};

function UsePatch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const patchIt = (url, user, token) => {
    dispatch({ type: "api-request" });
    localInstance
      .patch(url, user, {
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

  return [state, patchIt];
}

export default UsePatch;
