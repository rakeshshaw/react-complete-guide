import { combineReducers } from "redux";


const incrementDecrementReducer = (count=0, action) => {
    if(action.type === "INCREMENT") {
        return count + 1; 
    } else if(action.type === "DECREMENT") {
        return count - 1; 
    } else {
        return count;
    }
}

export default combineReducers({count: incrementDecrementReducer})