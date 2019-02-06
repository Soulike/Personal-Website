import NAMESPACE from '../../Namespace';
import Functions from '../../Functions';
import {STATUS_CODE} from '../../Static/Constants';
import {View as Alert} from '../../Components/Alert';
import {removeLoginToken, setOffline, setOnline} from '../../Pages/Login/Functions';
import {browserHistory} from 'react-router';
import {CHECK_LOGIN_STATE, GET_ABOUT_ME, GET_BANNER_IMAGE, GET_INFO, LOGIN, LOGOUT} from './Routes';

const {getHash, getAsync, postAsync, staticPrefix} = Functions;


export default {
    sendPostLoginRequest,
    sendPostLogoutRequest,
    sendGetBannerImageRequestAsync,
    sendGetInfoRequestAsync,
    sendGetCheckLoginStateRequestAsync,
    sendGetAboutMeRequest,
};

function sendPostLoginRequest()
{
    const {
        [NAMESPACE.SHARE.LOGIN.USERNAME]: username,
        [NAMESPACE.SHARE.LOGIN.PASSWORD]: password,
    } = this.state;
    postAsync(LOGIN, {
        [NAMESPACE.SHARE.LOGIN.USERNAME]: username,
        [NAMESPACE.SHARE.LOGIN.PASSWORD]: getHash(`${username}${password}`, 'sha256'),
    })
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('登录成功', true);
                setOnline();
                browserHistory.push('/');
            }
            else
            {
                setOffline();
                removeLoginToken();
            }

            if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                Alert.show('用户不存在', false);
            }
            else if (statusCode === STATUS_CODE.REJECTION)
            {
                Alert.show('密码错误', false);
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            setOffline();
            Alert.show('登录失败', false);
            console.log(e);
        });
}

function sendPostLogoutRequest()
{
    postAsync(LOGOUT)
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('退出登录成功', true);
                setOffline();
                browserHistory.push('/');
            }
            else
            {
                setOnline();
            }

            if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误');
            }
        })
        .catch(e =>
        {
            setOnline();
            Alert.show('退出登录失败', false);
            console.log(e);
        });
}

async function sendGetBannerImageRequestAsync(dispatch, succeedAction, failAction, allowCache = false)
{
    try
    {
        const res = await getAsync(GET_BANNER_IMAGE, allowCache);
        const {statusCode, data} = res;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            const {[NAMESPACE.SHARE.BANNER.IMAGE_FILE_NAME]: bannerImageFileName} = data;
            dispatch(succeedAction(staticPrefix(bannerImageFileName)));
        }
        else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            Alert.show('服务器错误', false);
            dispatch(failAction());
        }
    }
    catch (e)
    {
        dispatch(failAction());
        Alert.show('获取头图失败', false);
        console.log(e);
    }
}

async function sendGetInfoRequestAsync(dispatch, succeedAction, failAction, allowCache = false)
{
    try
    {
        const res = await getAsync(GET_INFO, allowCache);
        const {statusCode, data} = res;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            const {
                [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
                [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
                [NAMESPACE.SHARE.INFO.MOTTO]: motto,
            } = data;
            dispatch(succeedAction(nickname, avatarFileName, motto));
        }
        else
        {
            dispatch(failAction());
        }

        if (STATUS_CODE === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            Alert.show('服务器错误', false);
        }
    }
    catch (e)
    {
        dispatch(failAction());
        Alert.show('获取信息失败', false);
    }
}

async function sendGetCheckLoginStateRequestAsync()
{
    try
    {
        const res = await getAsync(CHECK_LOGIN_STATE, false);
        const {statusCode} = res;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            setOnline();
        }
        else
        {
            setOffline();
        }

        if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            Alert.show('服务器错误');
        }
    }
    catch (e)
    {
        setOffline();
        console.log(e);
    }
}

function sendGetAboutMeRequest()
{
    getAsync(GET_ABOUT_ME, true)
        .then(res =>
        {
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else
            {
                this.setState({[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: '获取关于我失败'});
            }
        });
}
