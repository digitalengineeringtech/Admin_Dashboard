import { useReducer } from "react";
import { cloudInstance } from "../axios";

const initialState = {
  data_c_post: [],
  loading_c_post: false,
  error_c_post: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "api-request":
      return { ...state, loading_c_post: true, error_c_post: null };
    case "fetch-data":
      return { ...state, loading_c_post: false, data_c_post: action.payload };
    case "error":
      return { ...state, loading_c_post: false, error_c_post: action.payload };
    default:
      return state;
  }
};

function UseCloudPost() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const postToCloud = (url, user, token) => {
    dispatch({ type: "api-request" });
    cloudInstance
      .post(url, user, {
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

  return [state, postToCloud];
}

export default UseCloudPost;
