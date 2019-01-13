import {REQUEST_FAILED, REQUEST_SUCCESS} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === REQUEST_SUCCESS)
    {
        return {
            ...state,
            bannerImageFileUrl: `url(${action.bannerImageFileName})`
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
