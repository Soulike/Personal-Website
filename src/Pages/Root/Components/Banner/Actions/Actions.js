import {REQUEST_FAILED, REQUEST_SUCCESS} from './ActionTypes';
import RequestProcessors from '../../../../../RequestProcessor';

export function getBannerImage(refresh = false)
{
    return async dispatch =>
    {
        return RequestProcessors.sendGetBannerImageRequestAsync(dispatch, requestSuccess, requestFailed, !refresh);
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
