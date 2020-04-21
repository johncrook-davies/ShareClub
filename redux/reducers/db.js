import { 
    CREATE_DB_CONNECTION, 
    DESTROY_DB_CONNECTION 
} from "../actionTypes";

const initialState = {
    readyState: 'initialising',
    call: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_DB_CONNECTION: {
            // Add database connection to store
            const { db } = action.payload;
            return {
                readyState: 'ready',
                call: db
            }
        }
        case DESTROY_DB_CONNECTION: {
            // Close database connection in store
            const { 
                readyState,
                call
            } = state;
            (readyState === 'ready') && call.close();
            return {
                readyState: 'closed',
                call: null
            }
        }
        default:
            return state
    }
    return state
}