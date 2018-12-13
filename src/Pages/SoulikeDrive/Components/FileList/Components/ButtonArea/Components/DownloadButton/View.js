import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {View as Alert} from '../../../../../../../../Components/Alert';
import Store from '../../../../../../../../Store';
import {downloadFiles} from '../../../../Actions/Actions';
import PropTypes from 'prop-types';
import style from './DownloadButton.module.scss';

class DownloadButton extends Component
{
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return false;
    }

    onDownloadBtnClicked = (e) =>
    {
        e.preventDefault();
        const {selectedFileList: fileList} = this.props;
        if (fileList.length === 0)
        {
            Alert.show('请选择要下载的文件', false);
        }
        else
        {
            Store.dispatch(downloadFiles(fileList));
        }
    };

    render()
    {
        return (
            <button className={style.DownloadButton} onClick={this.onDownloadBtnClicked}>
                <div className={style.downloadButtonText}>
                    <FontAwesomeIcon icon={solidIcons.faDownload} className={style.buttonIcon}/>
                    下载
                </div>
            </button>);
    }
}

const mapStateToProps = (state) =>
{
    const {selectedFileList} = state['FileList'];
    return {
        selectedFileList
    };
};

DownloadButton.propTypes = {
    selectedFileList: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DownloadButton);
