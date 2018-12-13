import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as LeftPanel} from './Components/LeftPanel';
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
                <div className={style.rightArea}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect()(SoulikeDrive);
