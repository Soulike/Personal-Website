import Functions from '../../Functions';
import {STATUS_CODE} from '../../Static/Constants';
import {View as Alert} from '../../Components/Alert';
import {Functions as BannerFunctions} from '../../Pages/Root/Components/Banner';
import {redirectToLogin} from '../../Pages/Login/Functions';
import {Functions as BlogFunctions} from '../../Pages/Blog';
import {UPLOAD_AVATAR, UPLOAD_BANNER_IMAGE, UPLOAD_PROFILE_CARD_IMAGE} from './Routes';

const {postAsync} = Functions;

export default {
    sendPostUploadBannerImageRequest,
    sendPostUploadAvatar,
    sendUploadProfileCardImage
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
        }
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

function sendPostUploadAvatar()
{
    const {formData} = this.state;
    postAsync(UPLOAD_AVATAR, formData, {
        onUploadProgress: e =>
        {
            if (e.lengthComputable)
            {
                this.setState({uploadProgress: e.loaded / e.total});
            }
        }
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

function sendUploadProfileCardImage()
{
    const {formData} = this.state;
    postAsync(UPLOAD_PROFILE_CARD_IMAGE, formData, {
        onUploadProgress: e =>
        {
            if (e.lengthComputable)
            {
                this.setState({uploadProgress: e.loaded / e.total});
            }
        }
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
