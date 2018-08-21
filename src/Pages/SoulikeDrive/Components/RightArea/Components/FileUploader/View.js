import React, {Component} from 'react';
import './FileUploader.css';
import {View as Uploader} from './Components/Uploader';
import {View as OfflineDownloader} from './Components/OfflineDownloader';
import Store from '../../../../../../Store';
import {tabClicked} from '../../../../Actions/Actions';

class FileUploader extends Component
{
    componentDidMount()
    {
        Store.dispatch(tabClicked('FileUploader'));
    }

    render()
    {
        return (
            <div className={'FileUploader'}>
                <Uploader/>
                <OfflineDownloader/>
            </div>
        );
    }
}

export default FileUploader;
