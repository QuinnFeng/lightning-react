import appConstants from "../constants/constant";

const names = ['aa', 'bb', 'cc', 'dd', 'this is from reducer'];
export const namesReducer = (state: string[] = names, action: NameReducerAction) => {

    if (action.type === appConstants.ADD_NAME) {
        // immutable way, copying existing state
        return [...state, action.payload];
    }


    // very first run, if state is undefined, we return something:
    return names;
};

interface NameReducerAction {
    type: string;
    payload: string;
}