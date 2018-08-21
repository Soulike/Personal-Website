import Store from '../../Store';
import {checkLoginState} from './Actions/Actions';
import SHA from 'jssha';

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
    const shaObj = new SHA('SHA-512', 'TEXT');
    shaObj.update(str);
    sessionStorage.setItem('loginToken', shaObj.getHash('HEX'));
}

export function isLoginTokenValid()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const shaObj = new SHA('SHA-512', 'TEXT');
    shaObj.update(str);
    const token = sessionStorage.getItem('loginToken');
    return Object.is(shaObj.getHash('HEX'), token);
}

export function removeLoginToken()
{
    sessionStorage.removeItem('loginToken');
}
