import React, {Component} from 'react';
import style from './BannerImageUploader.module.scss';
import {View as SubTitle} from '../../../../Components/SubTitle';
import {View as ProgressBar} from '../../../../Components/ProgressBar';
import {View as Hint} from '../Hint';
import RequestProcessors from '../../../../RequestProcessor';

class BannerImageUploader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            uploadProgress: 0,
            formData: null
        };
    }

    onFormSubmit = (e) =>
    {
        e.preventDefault();
        const $input = document.querySelector(`.${style.fileInput}`);
        const fileList = $input.files;
        const formData = new FormData();
        formData.append(`file`, fileList[0]);
        this.setState({formData}, () =>
        {
            RequestProcessors.sendPostUploadBannerImageRequest.apply(this);
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
                <SubTitle>头图上传</SubTitle>
                <Hint>推荐分辨率为 1920×400 的图片</Hint>
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
