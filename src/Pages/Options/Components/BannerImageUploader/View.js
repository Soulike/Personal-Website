import React, {Component} from 'react';
import style from './BannerImageUploader.module.scss';
import SubTitle from '../../../../Components/SubTitle/View';
import ProgressBar from '../../../../Components/ProgressBar/View';
import {postAsync, requestPrefix} from '../../../../Static/Functions';
import {STATUS_CODE} from '../../../../Static/Constants';
import {View as Alert} from '../../../../Components/Alert';
import {redirectToLogin} from '../../../Login/Functions';
import {Functions as BannerFunctions} from '../../../Root/Components/Banner';

class BannerImageUploader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            uploadProgress: 0
        };
    }


    onFormSubmit = (e) =>
    {
        e.preventDefault();
        const $input = document.querySelector(`.${style.fileInput}`);
        const fileList = $input.files;
        const formData = new FormData();
        formData.append(`file`, fileList[0]);
        postAsync(requestPrefix('/options/uploadBannerImage'), formData, {
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
    };

    onFileInputChange = (e) =>
    {
        this.setState({uploadProgress: 0});
        const $input = e.target;
        const $preview = document.querySelector(`.${style.preview}`);
        const $placeholder = document.querySelector(`.${style.placeholder}`);
        const file = $input.files[0];
        // 如果表单不是空的，就读取文件并显示预览
        if (file instanceof Blob)
        {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e =>
            {
                $placeholder.setAttribute('style', 'display: none');
                $preview.setAttribute('style', `display:block; background-image: url(${e.target.result})`);
            };
        }
        // 如果表单是空的，就直接恢复原样
        else
        {
            $placeholder.removeAttribute('style');
            $preview.removeAttribute('style');
        }
    };

    render()
    {
        const {uploadProgress} = this.state;
        return (
            <div className={style.BannerImageUploader}>
                <SubTitle titleText={'头图上传'}/>
                <div className={style.hint}>推荐分辨率为 1920×400 的图片</div>
                <div className={style.previewWrapper}><span className={style.placeholder}>预览</span>
                    <div className={style.preview}/>
                </div>
                <div className={style.progressBarWrapper}>
                    <ProgressBar progress={uploadProgress}/>
                </div>
                <div className={style.formWrapper}>
                    <form action="#" className={style.form} onSubmit={this.onFormSubmit}>
                        <input type="file" className={style.fileInput} accept={'image/*'}
                               onChange={this.onFileInputChange}/>
                        <button className={style.submitButton}>上传</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default BannerImageUploader;
