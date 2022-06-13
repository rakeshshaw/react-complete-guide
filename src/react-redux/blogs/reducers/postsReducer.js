export default (state = [], action) => {
    // if(action.type === "FETCH_POST") {
    //     return action.payload;
    // }

    // return state;

    switch(action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        case 'ADD_POST':
            return [...state, action.payload];
        default:
            return state;
    }
}