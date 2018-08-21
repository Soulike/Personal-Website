import {TAB_CLICKED} from './Actions/ActionTypes';

export default (state = {currentActiveTabId: 0}, action) =>
{
    if (action.type === TAB_CLICKED)
    {
        return {
            ...state,
            currentActiveTabId: action.tabId
        };
    }
    else
    {
        return state;
    }
}
