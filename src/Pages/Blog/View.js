import React, {Component} from 'react';
import Store from '../../Store';
import {getInfo} from './Action/Actions';
import style from './Blog.module.scss';
import {View as ProfileCard} from './Components/ProfileCard';
import {View as TypeSelectBar} from './Components/TypeSelectBar';
import {View as ArticleContainer} from './Components/ArticleListContainer';
import MostPopularCard from './Components/MostPopularCard/View';

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
                <div className={style.leftPart}>
                    <ProfileCard/>
                </div>
                <div className={style.midPart}>
                    <TypeSelectBar/>
                    <ArticleContainer/>
                </div>
                <div className={style.rightPart}>
                    <MostPopularCard/>
                </div>
            </div>
        );
    }
}

export default Blog;
