import React, {Component} from 'react';
import style from './Options.module.scss';
import {View as Title} from '../../Components/Title';

class Options extends Component
{
    render()
    {
        return (
            <div className={style.Options}>
                <Title titleText={'博客设置'}/>
            </div>
        );
    }
}

export default Options;
