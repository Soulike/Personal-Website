import React, {Component} from 'react';
import {View as DownloadButton} from './Components/DownloadButton/index';
import {View as DeleteButton} from './Components/DeleteButton/index';
import './ButtonArea.css';

class ButtonArea extends Component
{
    render()
    {
        return (
            <div className={'ButtonArea'}>
                <DownloadButton/>
                <DeleteButton/>
            </div>
        );
    }
}

export default ButtonArea;
