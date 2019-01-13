import * as ActionTypes from './Action/ActionTypes';

export default (state = {}, action) =>
{
    if (action.type === ActionTypes.GET_INFO_SUCCESS)
    {
        const {nickname, avatarFileName} = action;
        return {
            ...state,
            nickname,
            avatarFileName
        };
    }
    else if (action.type === ActionTypes.GET_INFO_FAILED)
    {
        return state;
    }
    else
    {
        return state;
    }
}
