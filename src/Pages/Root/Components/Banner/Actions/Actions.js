import {requestPrefix, staticPrefix} from '../../../../../Static/Functions/Url';
import {getAsync} from '../../../../../Static/Functions/Net';
import {REQUEST_FAILED, REQUEST_SUCCESS} from './ActionTypes';
import {View as Alert} from '../../../../../Components/Alert';
import {STATUS_CODE} from '../../../../../Static/Constants';
import NAMESPACE from '../../../../../Namespace';

export function getBannerImage(refresh = false)
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/getBannerImage'), !refresh);
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                const {[NAMESPACE.SHARE.BANNER.IMAGE_FILE_NAME]: bannerImageFileName} = data;
                dispatch(requestSuccess(staticPrefix(bannerImageFileName)));
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

export function requestSuccess(bannerImageFileUrl)
{
    return {
        type: REQUEST_SUCCESS,
        bannerImageFileUrl
    };
}

export function requestFailed()
{
    return {
        type: REQUEST_FAILED
    };
}
