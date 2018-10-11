import React, {Component} from 'react';
import style from './RightArea.module.scss';

class RightArea extends Component
{
    render()
    {
        return (
            <div className={style.RightArea}>
                {this.props.children}
            </div>
        );
    }
}

export default RightArea;
