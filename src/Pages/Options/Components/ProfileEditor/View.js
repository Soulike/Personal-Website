import React, {Component} from 'react';
import Style from './ProfileEditor.module.scss';
import {View as SubTitle} from '../../../../Components/SubTitle';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';

class ProfileEditor extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SHARE.INFO.NICKNAME]: '',
            [NAMESPACE.SHARE.INFO.MOTTO]: '',
        };
    }

    componentDidMount()
    {
        const $nickname = document.querySelector(`.${Style.nickname}`);
        const $motto = document.querySelector(`.${Style.motto}`);
        const $submitButton = document.querySelector(`.${Style.submitButton}`);
        $nickname.value = '';
        $motto.value = '';
        $nickname.disabled = true;
        $motto.disabled = true;
        $submitButton.disabled = true;
        RequestProcessor.sendGetBasicInformationRequestAsync.apply(this)
            .then(res =>
            {
                if (res === true)
                {
                    $nickname.removeAttribute('disabled');
                    $motto.removeAttribute('disabled');
                    $submitButton.removeAttribute('disabled');
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {[NAMESPACE.SHARE.INFO.NICKNAME]: nickname, [NAMESPACE.SHARE.INFO.MOTTO]: motto} = this.state;
        const $nickname = document.querySelector(`.${Style.nickname}`);
        const $motto = document.querySelector(`.${Style.motto}`);
        $nickname.value = nickname;
        $motto.value = motto;
    }

    onNicknameInputChange = e =>
    {
        this.setState({
            [NAMESPACE.SHARE.INFO.NICKNAME]: e.target.value,
        });
    };

    onMottoInputChange = e =>
    {
        this.setState({
            [NAMESPACE.SHARE.INFO.MOTTO]: e.target.value,
        });
    };

    onSubmitButtonClick = e =>
    {
        e.preventDefault();
        const $submitButton = document.querySelector(`.${Style.submitButton}`);
        $submitButton.disabled = true;
        RequestProcessor.sendPostSubmitBasicInformationRequestAsync.apply(this)
            .then(() =>
            {
                $submitButton.removeAttribute('disabled');
            });
    };

    render()
    {
        return (
            <div className={Style.ProfileEditor}>
                <SubTitle>基本信息</SubTitle>
                <div className={Style.inputWrapper}>
                    <label className={Style.labelWrapper}>
                        <span className={Style.labelText}>昵称：</span>
                        <input type="text"
                               className={`${Style.input} ${Style.nickname}`}
                               onChange={this.onNicknameInputChange} />
                    </label>
                    <label className={Style.labelWrapper}>
                        <span className={Style.labelText}>签名：</span>
                        <input type="text"
                               className={`${Style.input} ${Style.motto}`}
                               onChange={this.onMottoInputChange} />
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