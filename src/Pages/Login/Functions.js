import Store from '../../Store';
import {browserHistory} from 'react-router';
import {loginStateInvalid, loginStateValid} from './Actions/Actions';
import Functions from '../../Functions';
import RequestProcessors from '../../RequestProcessor';

const {getHash} = Functions;

export function requireLogin(nextState, replace)
{
    const {hasLoggedIn} = Store.getState()['Login'];
    if (!isLoginTokenValid()) // Token 无效，直接要求登录
    {
        replace('/login');
    }
    else if (isLoginTokenValid() && !hasLoggedIn) // Token 有效，但 Store 中状态无效，那么可能是刷新导致
    {
        checkLoginState();
    }
}

export function checkLoginState()
{
    return async () =>
    {
        return RequestProcessors.sendGetCheckLoginStateRequestAsync();
    };
}

export function setLoginToken()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'md5');
    sessionStorage.setItem('loginToken', hash);
}

export function isLoginTokenValid()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'md5');
    const token = sessionStorage.getItem('loginToken');
    return hash === token;
}

export function removeLoginToken()
{
    sessionStorage.removeItem('loginToken');
}

export function setOnline()
{
    Store.dispatch(loginStateValid());
    setLoginToken();
}

export function setOffline()
{
    Store.dispatch(loginStateInvalid());
    removeLoginToken();
}

// 当 Session 失效时调用，将 Store 中值设置为 false 并把页面跳转到登录
export function redirectToLogin()
{
    setOffline();
    browserHistory.push('/login');
}
