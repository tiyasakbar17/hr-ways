import { combineReducers } from "redux";
import Auth from "./Auth";
import PopUp from "./PopUp";
import Cabang from "./Cabang";
import Karyawan from "./Karyawan";
import UserHr from "./UserHr";

const Reducers = combineReducers({ Auth, PopUp, Cabang, Karyawan, UserHr });

export default Reducers;
