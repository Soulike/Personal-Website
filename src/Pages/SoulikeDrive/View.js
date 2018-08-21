import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as LeftPanel} from './Components/LeftPanel';
import './SoulikeDrive.css';
import {View as RightArea} from './Components/RightArea';
import Store from '../../Store';
import * as Actions from '../../Components/AuthProcessor/Actions/Actions';

class SoulikeDrive extends Component
{
    componentDidMount()
    {
        document.title = 'SoulikeDrive - Soulike 的个人网站';
        Store.dispatch(Actions.checkLoginState());
    }

    render()
    {
        return (
            <div className={'SoulikeDriveWrapper'}>
                <LeftPanel/>
                <RightArea children={this.props.children}/>
            </div>
        );
    }
}

export default connect()(SoulikeDrive);
