import React, {Component} from 'react';
import {connect} from 'react-redux';
import style from './OfflineDownloader.module.scss';
import RequestProcessors from '../../../../../../RequestProcessors';

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

    OfflineDownloaderButtonClick = (e) =>
    {
        e.preventDefault();
        RequestProcessors.sendPostSubmitOfflineDownloadURLRequest.apply(this);
    };

    render()
    {
        return (
            <div className={style.OfflineDownloader}>
                <div className={style.title}>离线下载</div>
                <form action="" className={style.OfflineDownloaderForm}>
                    <input type="text"
                           className={style.linkInput}
                           placeholder={'下载链接'}
                           onChange={this.onOfflineDownloaderInputChange} ref={'urlInput'}/>
                    <button className={style.submitButton}
                            onClick={this.OfflineDownloaderButtonClick}>提交
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(OfflineDownloader);
