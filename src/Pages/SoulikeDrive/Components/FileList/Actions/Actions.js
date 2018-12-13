import * as ActionTypes from './ActionTypes';
import {downloadFile, getAsync, postAsync, requestPrefix} from '../../../../../Static/Functions';
import {View as Alert} from '../../../../../Components/Alert';
import {STATUS_CODE} from '../../../../../Static/Constants';
import {redirectToLogin} from '../../../../Login/Functions';

export function getFileList()
{
    return async (dispatch) =>
    {
        try
        {
            const res = await getAsync(requestPrefix('/soulikeDrive/getFileList'), false);
            const {statusCode, data: fileList} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                dispatch(fileListRequestSuccess(fileList));
            }
            else
            {
                dispatch(fileListRequestFailed());
            }

            if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录');
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误');
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
            const {statusCode, data} = res;
            const {deleteNum} = data;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show(`删除成功，共删除了 ${deleteNum} 个文件`, true);
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

            if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }

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
            const {statusCode, data: url} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('开始下载', true);
                dispatch(fileDownloadSuccess());
                downloadFile(url);
            }
            else
            {
                dispatch(fileDownloadFailed());
            }

            if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.REJECTION)
            {
                Alert.show('你不能下载其他用户的文件', false);
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
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