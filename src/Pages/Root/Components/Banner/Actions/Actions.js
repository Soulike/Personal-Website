import {requestPrefix, getAsync, staticPrefix} from '../../../../../Static/functions';
import {REQUEST_SUCCESS, REQUEST_FAILED} from './ActionTypes';
import {View as Alert} from '../../../../../Components/Alert';

export function getBannerImage()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getBannerImage'), true);
            const {isSuccess, msg, data} = res;
            if (isSuccess)
            {
                const {url} = data;
                dispatch(requestSuccess(staticPrefix(url)));
            }
            else
            {
                dispatch(requestFailed());
                Alert.show(msg, false);
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
