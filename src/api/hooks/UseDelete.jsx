import { useReducer } from "react";
import { localInstance } from "../axios";

const initialState = {
  data_d: [],
  loading_d: false,
  error_d: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_d: true, error_d: null };
    case "fetch-data":
      return { ...state, loading_d: false, data_d: action.payload };
    case "error":
      return { ...state, loading_d: false, error_d: action.payload };
    default:
      return state;
  }
};

function UseDelete() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteIt = (url, token) => {
    dispatch({ type: "api-request" });
    localInstance
      .delete(url, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: "error", payload: e.message });
      });
  };

  return [state, deleteIt];
}

export default UseDelete;
