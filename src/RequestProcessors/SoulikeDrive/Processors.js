import Functions from '../../Functions';
import NAMESPACE from '../../Namespace';
import {STATUS_CODE} from '../../Static/Constants';
import {View as Alert} from '../../Components/Alert';
import {SUBMIT_OFFLINE_DOWNLOAD_URL} from './Routes';
import {redirectToLogin} from '../../Pages/Login/Functions';
import {Functions as SoulikeDriveFileListFunctions} from '../../Pages/SoulikeDrive/Components/FileList';

const {downloadFile, getAsync, postAsync, requestPrefix} = Functions;

export default {
    sendPostSubmitOfflineDownloadURLRequest,
    sendGetFileListRequestAsync,
    sendPostUploadFileRequest,
    sendPostDeleteFileRequestAsync,
    sendGetDownloadURLRequestAsync
};

function sendPostSubmitOfflineDownloadURLRequest()
{
    const {offlineDownloadURL} = this.state;
    postAsync(SUBMIT_OFFLINE_DOWNLOAD_URL,
        {
            [NAMESPACE.SOULIKE_DRIVE.DOWNLOAD.URL]: offlineDownloadURL
        })
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('任务创建成功', true);
                this.refs.urlInput.value = '';
            }
            else if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
            }
            else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
            {
                Alert.show('请求参数错误', false);
            }
            else if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                Alert.show('下载链接无效', false);
            }
            if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }

        })
        .catch(e =>
        {
            Alert.show('提交离线下载任务失败', false);
            console.log(e);
        });
}

async function sendGetFileListRequestAsync(dispatch, succeedAction, failAction)
{
    try
    {
        const res = await getAsync(requestPrefix('/soulikeDrive/getFileList'), false);
        const {statusCode, data: {[NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList}} = res;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            dispatch(succeedAction(fileList));
        }
        else
        {
            dispatch(failAction());
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
        dispatch(failAction());
        Alert.show('文件列表获取失败', false);
        console.log(e);
    }
}

function sendPostUploadFileRequest($fileInput)
{
    const {formData} = this.state;
    postAsync(requestPrefix('/soulikeDrive/uploadFile'), formData, {
        onUploadProgress: event =>
        {
            if (event.lengthComputable)
            {
                this.setState({uploadProgress: event.loaded / event.total});
            }
        }
    })
        .then(res =>
        {
            const {statusCode} = res;
            setTimeout(() =>
            {
                $fileInput.value = '';
                this.setState({
                    fileNum: 0,
                    fileSize: 0,
                    fileList: [],
                    uploadProgress: 0
                });
            }, 750);
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('上传成功', true);
            }
            else if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            this.setState({
                uploadProgress: 0
            });
            Alert.show('上传失败', false);
            console.log(e);
        })
        .finally(() =>
        {
            $fileInput.disabled = false;
        });
}

async function sendPostDeleteFileRequestAsync(dispatch, succeedAction, failAction, fileList = [])
{
    try
    {
        const res = await postAsync(requestPrefix('/soulikeDrive/deleteFile'),
            {[NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList});
        const {statusCode, data} = res;
        const {[NAMESPACE.SOULIKE_DRIVE.DELETE_FILE.DELETE_FILE_AMOUNT]: deleteFileAmount} = data;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            Alert.show(`删除成功，共删除了 ${deleteFileAmount} 个文件`, true);
            dispatch(succeedAction());
            setTimeout(() =>
            {
                SoulikeDriveFileListFunctions.reloadFileList();
            }, 750);
        }
        else
        {
            dispatch(failAction());
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
        dispatch(failAction());
        Alert.show('文件删除失败', false);
        console.log(e);
    }
}

async function sendGetDownloadURLRequestAsync(dispatch, succeedAction, failAction, fileList = [])
{
    try
    {
        const res = await postAsync(requestPrefix('/soulikeDrive/getDownloadURL'),
            {[NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: fileList});
        const {statusCode, data: {[NAMESPACE.SOULIKE_DRIVE.DOWNLOAD.URL]: url}} = res;
        if (statusCode === STATUS_CODE.SUCCESS)
        {
            Alert.show('开始下载', true);
            dispatch(succeedAction());
            downloadFile(url);
        }
        else
        {
            dispatch(failAction());
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
        dispatch(failAction());
        Alert.show('文件下载失败', false);
        console.log(e);
    }
}
