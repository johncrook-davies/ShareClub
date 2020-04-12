import { CREATE_CONNECTION, DESTROY_CONNECTION } from "../actionTypes";

const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_CONNECTION: {
            /* 
                Create a new websocket connection
                and store in state
            */
            return {
                ws: new WebSocket("ws://warm-mesa-02274.herokuapp.com/cable")
            }
        }
        case DESTROY_CONNECTION: {
            // Destroy websocket connection
            return {
                ws: state.ws.close()
            }
        }
        default:
            return state
    }
    return state
}