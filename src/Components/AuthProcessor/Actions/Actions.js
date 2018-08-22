import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGIN_STATE_VALID, LOGIN_STATE_INVALID} from './ActionTypes';
import SHA from 'jssha';
import {browserHistory} from 'react-router';
import {getAsync, postAsync, requestPrefix} from '../../../Static/functions';
import {View as Alert} from '../../Alert';
import {removeLoginToken, setLoginToken} from '../Functions';

export function login(username, password)
{
    return async (dispatch) =>
    {
        try
        {
            const SHAObj = new SHA('SHA-256', 'TEXT');
            SHAObj.update(`${username}${password}`);
            const res = await postAsync(requestPrefix('/login'), {
                username,
                password: SHAObj.getHash('HEX')
            });
            const {isSuccess, msg} = res;
            if (isSuccess)
            {
                dispatch(loginSuccess());
                setLoginToken();
                browserHistory.push('/');
            }
            else
            {
                dispatch(loginFailed());
                removeLoginToken();
            }
            Alert.show(msg, isSuccess);
        }
        catch (e)
        {
            dispatch(loginFailed());
            removeLoginToken();
            Alert.show('登录失败', false);
            console.log(e);
        }
    };
}

export function logout()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await postAsync(requestPrefix('/logout'));
            const {isSuccess, msg} = res;
            if (isSuccess)
            {
                dispatch(logoutSuccess());
                removeLoginToken();
                browserHistory.push('/');
            }
            else
            {
                dispatch(logoutFailed());
            }
            Alert.show(msg, isSuccess);
        }
        catch (e)
        {
            dispatch(logoutFailed());
            Alert.show('退出登录失败', false);
            console.log(e);
        }
    };
}

export function checkLoginState()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/checkLoginState'));
            const {isSuccess} = res;
            if (isSuccess)
            {
                dispatch(loginStateValid());
                setLoginToken();
            }
            else
            {
                dispatch(loginStateInvalid());
                removeLoginToken();
            }
        }
        catch (e)
        {
            dispatch(loginStateInvalid());
            removeLoginToken();
        }
    };
}

export function loginSuccess()
{
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed()
{
    return {
        type: LOGIN_FAILED
    };
}

export function logoutSuccess()
{
    return {
        type: LOGOUT_SUCCESS
    };
}

export function logoutFailed()
{
    return {
        type: LOGOUT_FAILED
    };
}

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
