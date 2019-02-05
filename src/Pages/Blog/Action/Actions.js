import * as ActionTypes from './ActionTypes';
import NAMESPACE from '../../../Namespace';
import RequestProcessors from '../../../RequestProcessor';

export function getInfo(isRefresh = false)
{
    return async (dispatch) =>
    {
        return RequestProcessors.sendGetInfoRequestAsync(dispatch, getInfoSuccess, getInfoFailed, !isRefresh);
    };
}

export function getInfoSuccess(nickname, avatarFileName)
{
    return {
        type: ActionTypes.GET_INFO_SUCCESS,
        [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName
    };
}

export function getInfoFailed()
{
    return {
        type: ActionTypes.GET_INFO_FAILED
    };
}
