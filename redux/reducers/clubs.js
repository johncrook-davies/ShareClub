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
    return state
}