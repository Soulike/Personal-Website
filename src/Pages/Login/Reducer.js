import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.LOGIN_SUCCESS)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_FAILED)
    {
        return {
            ...state,
            hasLoggedIn: false
        };
    }
    else if (type === ActionTypes.LOGOUT_SUCCESS)
    {
        return {
            ...state,
            hasLoggedIn: false
        };
    }
    else if (type === ActionTypes.LOGOUT_FAILED)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_STATE_VALID)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === ActionTypes.LOGIN_STATE_INVALID)
    {
        return {
            ...state,
            hasLoggedIn: false
        };
    }
    else
    {
        return state;
    }
}
