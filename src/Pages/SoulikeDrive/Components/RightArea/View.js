import React, {Component} from 'react';
import './RightArea.css';

class RightArea extends Component
{
    render()
    {
        return (
            <div className={'RightArea'}>
                {this.props.children}
            </div>
        );
    }
}

export default RightArea;
