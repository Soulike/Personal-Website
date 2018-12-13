import {LOGIN_STATE_INVALID, LOGIN_STATE_VALID} from './ActionTypes';

export function loginStateValid()
{
    return {
        type: LOGIN_STATE_VALID
    };
}

export function loginStateInvalid()
{
    return {
        type: LOGIN_STATE_INVALID
    };
}
