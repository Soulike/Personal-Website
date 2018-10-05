import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    if (action.type === ActionTypes.SWITCH_TAB)
    {
        return {
            ...state,
            currentTypeId: action.typeId
        };
    }
    else
    {
        return state;
    }
}
