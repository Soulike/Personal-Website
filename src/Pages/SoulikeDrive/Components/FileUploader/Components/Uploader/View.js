import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as ProgressBar} from '../../../../../../Components/ProgressBar';
import {postAsync} from '../../../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../../../Static/Functions/Url';
import {View as Alert} from '../../../../../../Components/Alert';
import style from './Uploader.module.scss';
import {STATUS_CODE} from '../../../../../../Static/Constants';
import {redirectToLogin} from '../../../../../Login/Functions';

class Uploader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            fileNum: 0,
            fileSize: 0,
            fileList: [],
            uploadProgress: 0
        };
    }

    onFileInputChange = (e) =>
    {
        const fileList = [...e.target.files];
        let fileSize = 0;
        this.setState({
            fileNum: fileList.length,
            fileList
        });
        fileList.forEach(file =>
        {
            fileSize += file.size;
        });
        this.setState({fileSize});
    };

    onFormSubmit = (e) =>
    {
        e.preventDefault();
        const fileInput = this.refs.fileInput;
        const {fileList} = this.state;
        fileInput.disabled = true;
        const formData = new FormData();
        fileList.forEach(file =>
        {
            formData.append(`file`, file);
        });

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
                    fileInput.value = '';
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
                fileInput.disabled = false;
            });

    };

    render()
    {
        const {fileNum, fileSize, uploadProgress} = this.state;
        return (
            <div className={style.Uploader}>
                <div className={style.title}>上传</div>
                <form action="" className={style.fileUploadForm} onSubmit={this.onFormSubmit}>
                    <label className={style.fileInputWrapper}>
                        选择文件
                        <input type="file"
                               multiple={true}
                               className={style.fileInput}
                               onChange={this.onFileInputChange}
                               ref={'fileInput'}/>
                    </label>
                    <div
                        className={style.fileInputStatus}>{`已选择 ${fileNum} 个文件，总大小 ${(fileSize / 1024 / 1024).toFixed(2)}M`}</div>
                    <button className={style.fileUploadBtn} onClick={this.onFormSubmit}>上传</button>
                </form>
                <div className={style.uploadProgressBarWrapper}>
                    <ProgressBar progress={uploadProgress}/>
                </div>
            </div>
        );
    }
}

export default connect()(Uploader);
