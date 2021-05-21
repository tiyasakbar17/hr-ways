import { combineReducers } from "redux";
import Auth from "./Auth";
import PopUp from "./PopUp";

const Reducers = combineReducers({ Auth, PopUp });

export default Reducers;
