import React, {Component} from 'react';
import Style from './ProfileEditor.module.scss';
import {View as SubTitle} from '../../../../Components/SubTitle';
import RequestProcessor from '../../../../RequestProcessor';

class ProfileEditor extends Component
{

    componentDidMount()
    {
        RequestProcessor.sendGetBasicInformationRequest.apply(this);
    }

    onSubmitButtonClick = e =>
    {
        e.preventDefault();
        const $nickname = document.querySelector(`.${Style.nickname}`);
        const $motto = document.querySelector(`.${Style.motto}`);
        // TODO: 完成提交操作
    };

    render()
    {
        return (
            <div className={Style.ProfileEditor}>
                <SubTitle>基本信息</SubTitle>
                <div className={Style.inputWrapper}>
                    <label className={Style.labelWrapper}>
                        <span className={Style.labelText}>昵称：</span>
                        <input type="text" className={`${Style.input} ${Style.nickname}`} />
                    </label>
                    <label className={Style.labelWrapper}>
                        <span className={Style.labelText}>签名：</span>
                        <input type="text" className={`${Style.input} ${Style.motto}`} />
                    </label>
                </div>
                <div className={Style.submitButtonWrapper}>
                    <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>保存</button>
                </div>

            </div>
        );
    }
}

export default ProfileEditor;