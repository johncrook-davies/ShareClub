import { ADD_CLUB, UPDATE_CLUB } from "../actionTypes";

const initialState = [
    {
        name: 'The jolly savers',
        value: 3456.64
    },
    {
        name: 'Cash club',
        value: 10325
    },
    {
        name: 'Big money mondays',
        value: 103259823.23
    }
];

export default function(state = initialState, action) {
//    switch (action.type) {
//        case ADD_CLUB: {
//            const { 
//                id,
//                name, 
//                value 
//            } = action.payload;
//            return {
//                ...state,
//                allIds: [...state.allIds, id],
//                byIds: {
//                    ...state.byIds,
//                    [id]: {
//                        content,
//                        completed: false
//                    }
//                }
//            };
//        }
//        case UPDATE_CLUB: {
//            const { id } = action.payload;
//            return {
//                ...state,
//                byIds: {
//                    ...state.byIds,
//                    [id]: {
//                        ...state.byIds[id],
//                        completed: !state.byIds[id].completed
//                    }
//                }
//            };
//        }
//        default:
//            return state;
//    }
    return state
}