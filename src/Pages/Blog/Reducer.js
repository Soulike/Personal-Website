import * as ActionTypes from './Action/ActionTypes';

export default (state = {}, action) =>
{
    if (action.type === ActionTypes.GET_INFO_SUCCESS)
    {
        const {nickname, avatar} = action;
        return {
            ...state,
            nickname,
            avatar
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
