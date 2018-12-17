import React, {Component} from 'react';
import style from './Options.module.scss';
import {View as Title} from '../../Components/Title';
import {View as BannerImageUploader} from './Components/BannerImageUploader';

class Options extends Component
{
    render()
    {
        return (
            <div className={style.Options}>
                <Title titleText={'网站设置'}/>
                <BannerImageUploader/>
            </div>
        );
    }
}

export default Options;
