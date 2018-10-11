import React, {Component} from 'react';
import {View as TypeSelectBar} from './Components/TypeSelectBar';
import {View as ArticleContainer} from './Components/ArticleListContainer';

import style from './MidPart.module.scss';

class MidPart extends Component
{
    render()
    {
        return (
            <div className={style.MidPart}>
                <TypeSelectBar/>
                <ArticleContainer/>
            </div>
        );
    }
}

export default MidPart;
