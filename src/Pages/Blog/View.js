import React, {Component} from 'react';
import LeftPart from './Components/LeftPart/View';
import RightPart from './Components/RightPart/View';
import './Blog.css';

class Blog extends Component
{
    render()
    {
        return (
            <div className={'Blog'}>
                <LeftPart/>
                <RightPart/>
            </div>
        );
    }
}

export default Blog;
