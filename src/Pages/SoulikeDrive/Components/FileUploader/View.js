import React, {Component} from 'react';
import {View as Uploader} from './Components/Uploader';
import {View as OfflineDownloader} from './Components/OfflineDownloader';
import Store from '../../../../Store';
import {tabClicked} from '../../Actions/Actions';
import style from './FileUploader.module.scss';
import ComponentTypes from '../../ComponentTypes';

class FileUploader extends Component
{
    componentDidMount()
    {
        Store.dispatch(tabClicked(ComponentTypes.FILE_UPLOADER));
    }

    render()
    {
        return (
            <div className={style.FileUploader}>
                <Uploader/>
                <OfflineDownloader/>
            </div>
        );
    }
}

export default FileUploader;
