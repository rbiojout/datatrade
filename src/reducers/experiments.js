const initialState = [
        {text: "Write code!"}
    ];
  
  
export default function notes(state=initialState, action) {
    let experimentList = state.slice();

    switch (action.type) {
  
        case 'ADD_EXPERIMENT':
            return [...state, {text: action.text}];
  
        case 'UPDATE_EXPERIMENT':
            let experimentToUpdate = experimentList[action.id]
            experimentToUpdate.text = action.text;
            experimentList.splice(action.id, 1, experimentToUpdate);
            return experimentList;
  
        case 'DELETE_EXPERIMENT':
            experimentList.splice(action.id, 1);
            return experimentList;
        default:
            return state;
    }
}