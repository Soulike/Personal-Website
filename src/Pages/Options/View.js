import React, {Component} from 'react';
import style from './Options.module.scss';
import {View as Title} from '../../Components/Title';
import {View as BannerImageUploader} from './Components/BannerImageUploader';
import {View as DividingLine} from './Components/DividingLine';
import {View as AvatarUploader} from './Components/AvatarUploader';

class Options extends Component
{
    render()
    {
        return (
            <div className={style.Options}>
                <Title titleText={'网站设置'}/>
                <BannerImageUploader/>
                <DividingLine/>
                <AvatarUploader/>
                <DividingLine/>
            </div>
        );
    }
}

export default Options;
