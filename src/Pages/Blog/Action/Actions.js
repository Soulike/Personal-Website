import * as ActionTypes from './ActionTypes';
import {getAsync, requestPrefix} from '../../../Static/functions';
import {View as Alert} from '../../../Components/Alert';

export function getInfo()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getInfo'));
            const {isSuccess, msg, data} = res;
            if (isSuccess)
            {
                const {nickname, avatar} = data;
                dispatch(getInfoSuccess(nickname, avatar));
            }
            else
            {
                dispatch(getInfoFailed());
                Alert.show(msg, false);
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
