import Functions from '../../Functions';
import {STATUS_CODE} from '../../Static/Constants';
import {View as Alert} from '../../Components/Alert';
import {Functions as BannerFunctions} from '../../Pages/Root/Components/Banner';
import {redirectToLogin} from '../../Pages/Login/Functions';
import {Functions as BlogFunctions} from '../../Pages/Blog';
import {
    GET_BASIC_INFORMATION,
    SUBMIT_BASIC_INFORMATION,
    UPLOAD_AVATAR,
    UPLOAD_BANNER_IMAGE,
    UPLOAD_PROFILE_CARD_IMAGE,
} from './Routes';

const {getAsync, postAsync} = Functions;

export default {
    sendPostUploadBannerImageRequest,
    sendPostUploadAvatarRequest,
    sendPostUploadProfileCardImageRequest,
    sendGetBasicInformationRequestAsync,
    sendPostSubmitBasicInformationRequestAsync,
};

function sendPostUploadBannerImageRequest()
{
    const {formData} = this.state;
    postAsync(UPLOAD_BANNER_IMAGE, formData, {
        onUploadProgress: e =>
        {
            if (e.lengthComputable)
            {
                this.setState({uploadProgress: e.loaded / e.total});
            }
        },
    })
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('上传成功', true);
                BannerFunctions.refreshBannerImage();
            }
            else if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.REJECTION)
            {
                Alert.show('没有上传权限', false);
            }
            else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
            {
                Alert.show('参数无效', false);
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('上传失败', false);
            console.log(e);
        });
}

function sendPostUploadAvatarRequest()
{
    const {formData} = this.state;
    postAsync(UPLOAD_AVATAR, formData, {
        onUploadProgress: e =>
        {
            if (e.lengthComputable)
            {
                this.setState({uploadProgress: e.loaded / e.total});
            }
        },
    })
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('上传成功', true);
                BlogFunctions.refreshBlogInfo();
            }
            else if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.REJECTION)
            {
                Alert.show('没有上传权限', false);
            }
            else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
            {
                Alert.show('参数无效', false);
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('上传失败', false);
            console.log(e);
        });
}

function sendPostUploadProfileCardImageRequest()
{
    const {formData} = this.state;
    postAsync(UPLOAD_PROFILE_CARD_IMAGE, formData, {
        onUploadProgress: e =>
        {
            if (e.lengthComputable)
            {
                this.setState({uploadProgress: e.loaded / e.total});
            }
        },
    })
        .then(res =>
        {
            const {statusCode} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                Alert.show('上传成功', true);
                BlogFunctions.refreshBlogInfo();
            }
            else if (statusCode === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (statusCode === STATUS_CODE.REJECTION)
            {
                Alert.show('没有上传权限', false);
            }
            else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
            {
                Alert.show('参数无效', false);
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('上传失败', false);
            console.log(e);
        });
}

async function sendGetBasicInformationRequestAsync()
{
    return new Promise(resolve =>
    {
        getAsync(GET_BASIC_INFORMATION, false)
            .then(res =>
            {
                const {statusCode, data} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data}, () =>
                    {
                        resolve(true);
                    });
                }
                else if (statusCode === STATUS_CODE.INVALID_SESSION)
                {
                    Alert.show('请先登录', false);
                    redirectToLogin();
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                    resolve(false);
                }
                else
                {
                    Alert.show('获取基础信息失败', false);
                    resolve(false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取基础信息失败');
                console.log(e);
                resolve(false);
            });
    });
}

async function sendPostSubmitBasicInformationRequestAsync()
{
    return new Promise(resolve =>
    {
        postAsync(SUBMIT_BASIC_INFORMATION, {...this.state})
            .then(res =>
            {
                const {statusCode} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    Alert.show('提交成功', true);
                    resolve(true);
                }
                else if (statusCode === STATUS_CODE.INVALID_SESSION)
                {
                    Alert.show('请先登录', false);
                    redirectToLogin();
                }
                else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
                {
                    Alert.show('参数错误', false);
                    resolve(false);
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                    resolve(false);
                }
                else
                {
                    Alert.show('提交失败', false);
                    resolve(false);
                }
            })
            .catch(e =>
            {
                Alert.show('提交失败', false);
                console.log(e);
                resolve(false);
            });
    });
}