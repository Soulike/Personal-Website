import React, {Component} from 'react';
import {connect} from 'react-redux';
import './OfflineDownloader.css';
import {postAsync, requestPrefix} from '../../../../../../../../Static/Functions';
import {View as Alert} from '../../../../../../../../Components/Alert';

class OfflineDownloader extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            offlineDownloadURL: ''
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return false;
    }

    onOfflineDownloaderInputChange = (e) =>
    {
        this.setState({offlineDownloadURL: e.target.value});
    };

    OfflineDownloaderButtonClicked = (e) =>
    {
        e.preventDefault();
        postAsync(requestPrefix('/soulikeDrive/submitOfflineDownloadURL'), {url: this.state.offlineDownloadURL})
            .then(res =>
            {
                const {isSuccess, msg} = res;
                Alert.show(msg, isSuccess);
                if (isSuccess)
                {
                    this.refs.urlInput.value = '';
                }
            })
            .catch(e =>
            {
                Alert.show('提交离线下载任务失败', false);
                console.log(e);
            });
    };

    render()
    {
        return (
            <div className={'OfflineDownloader'}>
                <div className={'title'}>离线下载</div>
                <form action="" className={'OfflineDownloaderForm'}>
                    <input type="text"
                           className={'linkInput'}
                           placeholder={'下载链接'}
                           onChange={this.onOfflineDownloaderInputChange} ref={'urlInput'}/>
                    <button className={'submitButton btn btn-primary'}
                            onClick={this.OfflineDownloaderButtonClicked}>提交
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(OfflineDownloader);
