import { SIGN_IN, SIGN_OUT } from "./types";

// Action Creator
export const signIn = (userId)=> {
    // Return an Action
    return {
        type: SIGN_IN,
        payload: userId
    }
};

// Action Creator
export const signOut = ()=> {
    // Return an Action
    return {
        type: SIGN_OUT
    }
};