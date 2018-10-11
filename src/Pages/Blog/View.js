import React, {Component} from 'react';
import Store from '../../Store';
import {getInfo} from './Action/Actions';
import {View as LeftPart} from './Components/LeftPart';
import {View as MidPart} from './Components/MidPart';
import {View as RightPart} from './Components/RightPart';
import style from './Blog.module.scss';

class Blog extends Component
{
    componentDidMount()
    {
        document.title = '博客 - Soulike 的个人网站';
        Store.dispatch(getInfo());
    }

    render()
    {
        return (
            <div className={style.Blog}>
                <LeftPart/>
                <MidPart/>
                <RightPart/>
            </div>
        );
    }
}

export default Blog;
