import * as ActionTypes from './ActionTypes';
import {getAsync} from '../../../Static/Functions/Net';
import {requestPrefix} from '../../../Static/Functions/Url';
import {View as Alert} from '../../../Components/Alert';
import {STATUS_CODE} from '../../../Static/Constants';

export function getInfo(isRefresh = false)
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getInfo'), !isRefresh);
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                const {nickname, avatarFileName} = data;
                dispatch(getInfoSuccess(nickname, avatarFileName));
            }
            else
            {
                dispatch(getInfoFailed());
            }

            if (STATUS_CODE === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        }
        catch (e)
        {
            dispatch(getInfoFailed());
            Alert.show('获取头像失败', false);
        }
    };

}

export function getInfoSuccess(nickname, avatarFileName)
{
    return {
        type: ActionTypes.GET_INFO_SUCCESS,
        nickname,
        avatarFileName
    };
}

export function getInfoFailed()
{
    return {
        type: ActionTypes.GET_INFO_FAILED
    };
}
