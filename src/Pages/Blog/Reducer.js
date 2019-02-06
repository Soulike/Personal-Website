import * as ActionTypes from './Action/ActionTypes';
import NAMESPACE from '../../Namespace';

export default (state = {}, action) =>
{
    if (action.type === ActionTypes.GET_INFO_SUCCESS)
    {
        const {
            [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
            [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
        } = action;
        return {
            ...state,
            [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
            [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
        };
    }
    else if (action.type === ActionTypes.GET_INFO_FAILED)
    {
        return state;
    }
    else
    {
        return state;
    }
}
