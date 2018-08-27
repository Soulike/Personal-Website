import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as ProgressBar} from './Components/ProgressBar';
import './Uploader.css';
import {postAsync, requestPrefix} from '../../../../../../../../Static/functions';
import {View as Alert} from '../../../../../../../../Components/Alert';

class Uploader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            fileNum: 0,
            fileSize: 0,
            fileList: [],
            updateProgress: 0
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
        fileList.map((file) =>
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
        const formData = new FormData;
        fileList.map(file =>
        {
            formData.append(`file`, file);
        });

        postAsync(requestPrefix('/soulikeDrive/uploadFile'), formData, {
            onUploadProgress: event =>
            {
                if (event.lengthComputable)
                {
                    this.setState({updateProgress: event.loaded / event.total});
                }
            }
        })
            .then(res =>
            {
                const {isSuccess, msg} = res;
                setTimeout(() =>
                {
                    fileInput.value = '';
                    this.setState({
                        fileNum: 0,
                        fileSize: 0,
                        fileList: [],
                        updateProgress: 0
                    });
                }, 750);
                Alert.show(msg, isSuccess);
            })
            .catch(e =>
            {
                this.setState({
                    updateProgress: 0
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
        const {fileNum, fileSize, updateProgress} = this.state;
        return (
            <div className={'Uploader'}>
                <div className={'UploaderTitle'}>上传</div>
                <form action="" className={'fileUploadForm'} onSubmit={this.onFormSubmit}>
                    <label className={'fileInputWrapper btn btn-primary'}>
                        选择文件
                        <input type="file"
                               multiple={true}
                               className={'fileInput'}
                               onChange={this.onFileInputChange}
                               ref={'fileInput'}/>
                    </label>
                    <div className={'fileInputStatus'}>{`已选择 ${fileNum} 个文件，总大小 ${(fileSize / 1024 / 1024).toFixed(2)}M`}</div>
                    <button className={'fileUploadBtn btn btn-primary'}>上传</button>
                </form>
                <div className={'uploadProgressBarWrapper'}>
                    <ProgressBar progress={updateProgress}/>
                </div>
            </div>
        );
    }
}

export default connect()(Uploader);
