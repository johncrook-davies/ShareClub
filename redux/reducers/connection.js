import { CREATE_CONNECTION, DESTROY_CONNECTION } from "../actionTypes";

const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_CONNECTION: {
            console.log("Created new ws");
            return null
        }
        case DESTROY_CONNECTION: {
            console.log("Destroyed ws");
            return null
        }
        default:
            return state;
    }
    return state
}