import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {View as Title} from '../../Components/Title';
import style from './Login.module.scss';
import NAMESPACE from '../../Namespace';
import RequestProcessors from '../../RequestProcessor';

class Login extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SHARE.LOGIN.USERNAME]: '',
            [NAMESPACE.SHARE.LOGIN.PASSWORD]: ''
        };
    }

    componentDidMount()
    {
        document.title = '登录 - Soulike 的个人网站';
    }

    onUsernameChange = (e) =>
    {
        this.setState({[NAMESPACE.SHARE.LOGIN.USERNAME]: e.target.value});
    };

    onPasswordChange = (e) =>
    {
        this.setState({[NAMESPACE.SHARE.LOGIN.PASSWORD]: e.target.value});
    };

    onSubmitButtonClick = (e) =>
    {
        e.preventDefault();
        RequestProcessors.sendPostLoginRequest.apply(this);
    };

    render()
    {
        return (

            <div className={style.Login}>
                <Title>登录</Title>
                <form onSubmit={this.onSubmitButtonClick}>
                    <div className={style.inputWrapper}>
                        <FontAwesomeIcon icon={solidIcons.faUserCircle} className={style.icon}/>
                        <input type="text"
                               placeholder={'用户名'}
                               className={style.loginInput}
                               onChange={this.onUsernameChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <FontAwesomeIcon icon={solidIcons.faKey} className={style.icon}/>
                        <input type="password"
                               placeholder={'密码'}
                               className={style.loginInput}
                               onChange={this.onPasswordChange}/>
                    </div>
                    <button className={`${style.submitButton}`}>
                        登录
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
