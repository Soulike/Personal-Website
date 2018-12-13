import * as ActionTypes from './ActionTypes';

export function switchTab(typeId)
{
    return {
        type: ActionTypes.SWITCH_TAB,
        typeId
    };
}
