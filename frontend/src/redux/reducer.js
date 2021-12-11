import { combineReducers } from "redux";
import UserdetailsReducer from "./userdetails";

export default combineReducers({
    user : UserdetailsReducer
})