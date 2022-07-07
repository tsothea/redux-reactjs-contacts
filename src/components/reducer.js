import {CONTACT_ADD, CONTACT_UPDATE, CONTACT_REMOVE} from './actionTypes';

let lastId = 0;
function reducer (state = [], action) {
    switch (action.type) {
        case CONTACT_ADD:
            action.payload['id'] = ++lastId;
            action.payload['date'] = new Date().toLocaleString();
            return [
                ...state,
                action.payload
            ];
        case CONTACT_UPDATE:
            return [
                ...state
            ];
        case CONTACT_REMOVE:
            return [...state.filter(contact => contact.id !== action.payload.id)];
        default:
            return state;
    }
}

export default reducer;