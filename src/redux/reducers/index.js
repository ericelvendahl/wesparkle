import { combineReducers } from "redux";
import errors from "./errorsReducer";
import loginMode from "./loginModeReducer";
import user from "./userReducer";
import link from "./linkReducer";
import details from "./linkDetailsReducer";
import graph from "./graphReducer";
import baseUrl from "./baseUrlReducer";

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  link,
  details,
  graph,
  baseUrl,
});

export default rootReducer;
