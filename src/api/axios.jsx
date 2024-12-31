import axios from "axios";
// http://192.168.0.109:9000/api
export const localInstance = axios.create({
  // baseURL: "http://192.168.1.146:9000/api",
// <<<<<<< HEAD
  baseURL: "http://192.168.0.100:9000/api",
  // baseURL: "http://192.168.1.145:9000/api",
  // baseURL: "http://127.0.0.1:9000/api",
// =======
//   baseURL: "http://192.168.0.100:9000/api",
//   // baseURL: "http://192.168.1.187:9000/api",
//   // baseURL: "http://127.0.0.1:9000/api",
// >>>>>>> c1a06c63bd9ba0117672c44506c43ac999586443
});

export const cloudInstance = axios.create({
  // baseURL: "http://192.168.1.146:9000/api",
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "https://detfsmm.com/api",
});
