import * as ActionTypes from './ActionTypes';
import NAMESPACE from '../../../../../Namespace';
import RequestProcessors from '../../../../../RequestProcessors';

export function getFileList()
{
    return async dispatch =>
    {
        return RequestProcessors.sendGetFileListRequestAsync(dispatch, fileListRequestSuccess, fileListRequestFailed);
    };
}

export function deleteFiles(fileList)
{
    return async dispatch =>
    {
        return RequestProcessors.sendPostDeleteFileRequestAsync(dispatch, fileDeleteSuccess, fileDeleteFailed, fileList);
    };
}

export function downloadFiles(fileList)
{
    return async dispatch =>
    {
        return RequestProcessors.sendGetDownloadURLRequestAsync(dispatch, fileDownloadSuccess, fileDownloadFailed, fileList);
    };
}

export function fileListRequestSuccess(fileList)
{
    return {
        type: ActionTypes.FILE_LIST_REQUEST_SUCCESS,
        [NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList
    };
}

export function fileListRequestFailed()
{
    return {
        type: ActionTypes.FILE_LIST_REQUEST_FAILED
    };
}

export function fileDeleteSuccess()
{
    return {
        type: ActionTypes.FILE_DELETE_SUCCESS
    };
}

export function fileDeleteFailed()
{
    return {
        type: ActionTypes.FILE_DELETE_FAILED
    };
}

export function fileDownloadSuccess()
{
    return {
        type: ActionTypes.FILE_DOWNLOAD_SUCCESS
    };
}

export function fileDownloadFailed()
{
    return {
        type: ActionTypes.FILE_DOWNLOAD_FAILED
    };
}

export function fileSelected(fileId)
{
    return {
        type: ActionTypes.FILE_SELECTED,
        [NAMESPACE.SOULIKE_DRIVE.FILE.ID]: fileId
    };
}

export function fileUnselected(fileId)
{
    return {
        type: ActionTypes.FILE_UNSELECTED,
        [NAMESPACE.SOULIKE_DRIVE.FILE.ID]: fileId
    };
}
