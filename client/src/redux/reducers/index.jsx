import { combineReducers } from "redux";
import Auth from "./Auth";
import PopUp from "./PopUp";
import Posts from "./Posts";

const Reducers = combineReducers({ Auth, PopUp, Posts });

export default Reducers;
