import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as LeftPanel} from './Components/LeftPanel';
import {View as RightArea} from './Components/RightArea';
import style from './SoulikeDrive.module.scss';

class SoulikeDrive extends Component
{
    componentDidMount()
    {
        document.title = 'SoulikeDrive - Soulike 的个人网站';
    }

    render()
    {
        return (
            <div className={style.SoulikeDriveWrapper}>
                <LeftPanel/>
                <RightArea children={this.props.children}/>
            </div>
        );
    }
}

export default connect()(SoulikeDrive);
