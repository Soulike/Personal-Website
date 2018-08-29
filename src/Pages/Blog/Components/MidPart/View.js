import React, {Component} from 'react';
import './MidPart.css';
import {View as TypeSelectBar} from './TypeSelectBar';
import {View as ArticleContainer} from './ArticleContainer';

class MidPart extends Component
{
    render()
    {
        return (
            <div className={'MidPart'}>
                <TypeSelectBar/>
                <ArticleContainer/>
            </div>
        );
    }
}

export default MidPart;
