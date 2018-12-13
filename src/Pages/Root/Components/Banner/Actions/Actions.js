import {getAsync, requestPrefix, staticPrefix} from '../../../../../Static/Functions';
import {REQUEST_FAILED, REQUEST_SUCCESS} from './ActionTypes';
import {View as Alert} from '../../../../../Components/Alert';
import {STATUS_CODE} from '../../../../../Static/Constants';

export function getBannerImage()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getBannerImage'), true);
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                const {url} = data;
                dispatch(requestSuccess(staticPrefix(url)));
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
                dispatch(requestFailed());
            }
        }
        catch (e)
        {
            dispatch(requestFailed());
            Alert.show('获取头图失败', false);
            console.log(e);
        }
    };
}

export function requestSuccess(url)
{
    return {
        type: REQUEST_SUCCESS,
        url
    };
}

export function requestFailed()
{
    return {
        type: REQUEST_FAILED
    };
}
