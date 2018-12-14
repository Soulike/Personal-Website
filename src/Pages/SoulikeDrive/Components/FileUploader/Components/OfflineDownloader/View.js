import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postAsync, requestPrefix} from '../../../../../../Static/Functions';
import {View as Alert} from '../../../../../../Components/Alert';
import style from './OfflineDownloader.module.scss';
import {STATUS_CODE} from '../../../../../../Static/Constants';

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
        postAsync(requestPrefix('/soulikeDrive/submitOfflineDownloadURL'), {url: this.state.offlineDownloadURL})
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
