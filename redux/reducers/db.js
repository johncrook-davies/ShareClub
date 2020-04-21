import { 
    CREATE_DB_CONNECTION, 
    DESTROY_DB_CONNECTION 
} from "../actionTypes";

const initialState = { db: null };

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_DB_CONNECTION: {
            // Add database connection to store
            const { db } = action.payload;
            return {
                ...state,
                db: db
            }
        }
        case DESTROY_DB_CONNECTION: {
            // Close database connection in store
            const { db } = state;
            return {
                ...state,
                db: db.close()
            }
        }
        default:
            return state
    }
    return state
}