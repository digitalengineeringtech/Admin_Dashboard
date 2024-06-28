import { useReducer } from "react";
// import { Action, CloudPost, State } from "../../pages/types/UseLogin.types";
import { cloudInstance } from "../axios";

enum ACTIONS {
  API_REQUEST = "api-request",
  FETCH_DATA = "fetch-data",
  ERROR = "error",
}

const initialState = {
  data_c_post: [],
  loading_c_post: false,
  error_c_post: null,
};

const reducer = (state, action): any => {
  switch (action.type) {
    case ACTIONS.API_REQUEST:
      return { ...state, loading_c_post: true, error_c_post: null };
    case ACTIONS.FETCH_DATA:
      return { ...state, loading_c_post: false, data_c_post: action.payload };
    case ACTIONS.ERROR:
      return { ...state, loading_c_post: false, error_c_post: action.payload };
    default:
      return state;
  }
};

function UseCloudPost(): any {
  const [state, dispatch] = useReducer(reducer, initialState);

  const postToCloud = (url: string, user: object, token: string) => {
    dispatch({ type: ACTIONS.API_REQUEST });
    cloudInstance
      .post(url, user, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.FETCH_DATA, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR, payload: e });
      });
  };

  return [state, postToCloud];
}

export default UseCloudPost;
