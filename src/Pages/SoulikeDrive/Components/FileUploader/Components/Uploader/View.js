import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as ProgressBar} from '../../../../../../Components/ProgressBar';
import style from './Uploader.module.scss';
import RequestProcessors from '../../../../../../RequestProcessors';

class Uploader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            fileNum: 0,
            fileSize: 0,
            fileList: [],
            uploadProgress: 0,
            formData: null
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
        const $fileInput = document.querySelector(`.${style.fileInput}`);
        const {fileList} = this.state;
        $fileInput.disabled = true;
        const formData = new FormData();
        fileList.forEach(file =>
        {
            formData.append(`file`, file);
        });
        this.setState({formData}, () =>
        {
            RequestProcessors.sendPostUploadFileRequest.apply(this, [$fileInput]);
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
                        />
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
