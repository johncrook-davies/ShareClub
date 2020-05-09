import { ADD_CLUB, UPDATE_CLUB } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
        case ADD_CLUB: {
            // ...
//            const { 
//              
//            } = action.payload;
            console.log('Added club')
            console.log(action.payload)
//            return {
//                
//            }
        }
        case UPDATE_CLUB: {
            // ...
            const { 
                
            } = state;
            return {
                
            }
        }
        default:
            return state
    }
    return state
}