import { createStore } from "redux";
import { rootReducer } from "../reducers";

const store = createStore(
  rootReducer
  // 4. tao danh sach reducer
  // =>tao count reducer.js
);

export default store;
