import React, {Component} from 'react';
import Store from '../../Store';
import {getInfo} from './Action/Actions';
import './Blog.css';
import {View as LeftPart} from './Components/LeftPart';
import {View as MidPart} from './Components/MidPart';
import {View as RightPart} from './Components/RightPart';

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
            <div className={'Blog'}>
                <LeftPart/>
                <MidPart/>
                <RightPart/>
            </div>
        );
    }
}

export default Blog;
