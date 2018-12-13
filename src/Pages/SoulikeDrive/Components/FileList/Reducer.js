import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.FILE_LIST_REQUEST_SUCCESS)
    {
        const {fileList} = action;
        return {
            ...state,
            fileList,
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
            selectedFileList: [...state.selectedFileList, action.fileId]
        };
    }
    else if (type === ActionTypes.FILE_UNSELECTED)
    {
        return {
            ...state,
            selectedFileList: state.selectedFileList.filter(fileId =>
            {
                return fileId !== action.fileId;
            })
        };
    }
    else
    {
        return state;
    }
}
