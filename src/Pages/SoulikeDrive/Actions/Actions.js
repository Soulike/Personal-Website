import {TAB_CLICKED} from './ActionTypes';
import ComponentTypes from '../ComponentTypes';

export function tabClicked(componentType)
{
    return {
        type: TAB_CLICKED,
        tabId: ComponentTypes[componentType]
    };
}
