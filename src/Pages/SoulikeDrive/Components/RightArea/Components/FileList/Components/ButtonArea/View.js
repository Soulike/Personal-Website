import React, {Component} from 'react';
import {View as DownloadButton} from './Components/DownloadButton/index';
import {View as DeleteButton} from './Components/DeleteButton/index';
import style from './ButtonArea.module.scss';

class ButtonArea extends Component
{
    render()
    {
        return (
            <div className={style.ButtonArea}>
                <div className={style.downloadButtonWrapper}>
                    <DownloadButton/>
                </div>
                <div className={style.deleteButtonWrapper}>
                    <DeleteButton/>
                </div>
            </div>
        );
    }
}

export default ButtonArea;
