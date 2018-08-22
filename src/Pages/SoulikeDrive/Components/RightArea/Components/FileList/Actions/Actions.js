import * as ActionTypes from './ActionTypes';
import {downloadFile, getAsync, postAsync, requestPrefix} from '../../../../../../../Static/functions';
import {View as Alert} from '../../../../../../../Components/Alert';

export function getFileList()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/soulikeDrive/getFileList'));
            const {isSuccess, msg, data: fileList} = res;
            if (isSuccess)
            {
                dispatch(fileListRequestSuccess(fileList));
            }
            else
            {
                dispatch(fileListRequestFailed());
                Alert.show(msg, false);
            }
        }
        catch (e)
        {
            dispatch(fileListRequestFailed());
            Alert.show('文件列表获取失败', false);
            console.log(e);
        }

    };
}

export function deleteFiles(fileList)
{
    return async dispatch =>
    {
        try
        {
            const res = await postAsync(requestPrefix('/soulikeDrive/deleteFile'), {fileList});
            const {isSuccess, msg} = res;
            if (isSuccess)
            {
                dispatch(fileDeleteSuccess());
                setTimeout(() =>
                {
                    dispatch(getFileList());
                }, 750);
            }
            else
            {
                dispatch(fileDeleteFailed());
            }
            Alert.show(msg, isSuccess);
        }
        catch (e)
        {
            dispatch(fileDeleteFailed());
            Alert.show('文件删除失败', false);
            console.log(e);
        }
    };
}

export function downloadFiles(fileList)
{
    return async dispatch =>
    {
        try
        {
            const res = await postAsync(requestPrefix('/soulikeDrive/getDownloadURL'), {fileList});
            const {isSuccess, msg, data: url} = res;
            if (isSuccess)
            {
                dispatch(fileDownloadSuccess());
                downloadFile(url);
            }
            else
            {
                dispatch(fileDownloadFailed());
            }
            Alert.show(msg, isSuccess);
        }
        catch (e)
        {
            dispatch(fileDownloadFailed());
            Alert.show('文件下载失败', false);
            console.log(e);
        }
    };
}

export function fileListRequestSuccess(fileList)
{
    return {
        type: ActionTypes.FILE_LIST_REQUEST_SUCCESS,
        fileList
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

export function fileSeleted(fileId)
{
    return {
        type: ActionTypes.FILE_SELECTED,
        fileId
    };
}

export function fileUnselected(fileId)
{
    return {
        type: ActionTypes.FILE_UNSELECTED,
        fileId
    };
}
