import {TAB_CLICKED} from './ActionTypes';

export function tabClicked(tabId)
{
    return {
        type: TAB_CLICKED,
        tabId
    };
}
