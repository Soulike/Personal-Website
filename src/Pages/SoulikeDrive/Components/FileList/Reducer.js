import * as ActionTypes from './Actions/ActionTypes';
import NAMESPACE from '../../../../Namespace';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.FILE_LIST_REQUEST_SUCCESS)
    {
        const {[NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList} = action;
        return {
            ...state,
            [NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList,
            selectedFileList: []
        };
    }
    else if (type === ActionTypes.FILE_LIST_REQUEST_FAILED)
    {
        return state;
    }
    else if (type === ActionTypes.FILE_SELECTED)
    {
        return {
            ...state,
            selectedFileList: [...state.selectedFileList, action[NAMESPACE.SOULIKE_DRIVE.FILE.ID]]
        };
    }
    else if (type === ActionTypes.FILE_UNSELECTED)
    {
        return {
            ...state,
            selectedFileList: state.selectedFileList.filter(fileId =>
            {
                return fileId !== action[NAMESPACE.SOULIKE_DRIVE.FILE.ID];
            })
        };
    }
    else
    {
        return state;
    }
}
