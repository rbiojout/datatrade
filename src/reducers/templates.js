const initialState = [
    {templateVisibility: false}
];


export default function templates(state=initialState, action) {
    console.log(action.type)
    switch (action.type) {

        case 'SET_TEMPLATE_VISIBILITY':
            return Object.assign({}, state, {
                templateVisibility: action.visibility
              });
        case 'GET_TEMPLATE_VISIBILITY':
            return state;
        default:
            return state;
    }
}