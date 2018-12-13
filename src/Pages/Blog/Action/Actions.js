import * as ActionTypes from './ActionTypes';
import {getAsync, requestPrefix} from '../../../Static/Functions';
import {View as Alert} from '../../../Components/Alert';
import {STATUS_CODE} from '../../../Static/Constants';

export function getInfo()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getInfo'), true);
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                const {nickname, avatar} = data;
                dispatch(getInfoSuccess(nickname, avatar));
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

export function getInfoSuccess(nickname, avatar)
{
    return {
        type: ActionTypes.GET_INFO_SUCCESS,
        nickname,
        avatar
    };
}

export function getInfoFailed()
{
    return {
        type: ActionTypes.GET_INFO_FAILED
    };
}
