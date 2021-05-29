import {combineReducers} from 'redux'
const CHANGE_NAME = 'CHANGE_NAME';

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        name,
    }
}

const defaultState = {
    name:"MARIAN",
};

function userActions(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: "Vladi"
            }
        default:
            return state;
    }
}

const User = combineReducers({
    userActions
});

export default User;