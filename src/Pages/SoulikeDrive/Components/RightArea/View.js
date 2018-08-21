import React, {Component} from 'react';
import './RightArea.css';
import {checkLoginState} from '../../../../Components/AuthProcessor/Actions/Actions';

class RightArea extends Component
{
    componentDidMount()
    {
        checkLoginState();
    }

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
