const initialState = {
    all: [
        {
            id: 1273192,
            user: 'Tess Yellanda',
            club: 'Original Pirate Investors'
        },
        {
            id: 4293742,
            user: 'Rob Brown',
            club: "Investors not haters"
        }
    ],
    find: {
        1273192: {
            user: 'Tess Yellanda',
            club: 'Original Pirate Investors'
        },
        4293742: {
            user: 'Rob Brown',
            club: "Investors not haters"
        }
    }
};

export default function(state = initialState, action) {
    return state
}