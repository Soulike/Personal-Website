import {REQUEST_SUCCESS, REQUEST_FAILED} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === REQUEST_SUCCESS)
    {
        return {
            ...state,
            bannerBackground: `url(${action.url})`
        };
    }
    else if (type === REQUEST_FAILED)
    {
        return state;
    }
    else
    {
        return state;
    }
}
