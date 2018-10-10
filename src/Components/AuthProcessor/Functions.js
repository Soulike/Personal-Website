import Store from '../../Store';
import {checkLoginState} from './Actions/Actions';
import {getHash} from '../../Static/Functions';

export function requireLogin(nextState, replace)
{
    // 如果token是无效的，则检查Store里面的hasLoggedIn字段是否为真
    if (!isLoginTokenValid())
    {
        const {hasLoggedIn} = Store.getState()['AuthProcessor'];
        if (!hasLoggedIn)
        {
            replace('/login');
        }
    }
    Store.dispatch(checkLoginState());
}

export function setLoginToken()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'sha512');
    sessionStorage.setItem('loginToken', hash);
}

export function isLoginTokenValid()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'sha512');
    const token = sessionStorage.getItem('loginToken');
    return Object.is(hash, token);
}

export function removeLoginToken()
{
    sessionStorage.removeItem('loginToken');
}
