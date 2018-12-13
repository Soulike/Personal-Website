import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {View as Alert} from '../../Components/Alert';
import {View as Title} from '../../Components/Title';
import style from './Login.module.scss';
import {getHash, postAsync, requestPrefix} from '../../Static/Functions';
import {STATUS_CODE} from '../../Static/Constants';
import {removeLoginToken, setOffline, setOnline} from './Functions';

class Login extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount()
    {
        document.title = '登录 - Soulike 的个人网站';
    }

    onUsernameChange = (e) =>
    {
        this.setState({username: e.target.value});
    };

    onPasswordChange = (e) =>
    {
        this.setState({password: e.target.value});
    };

    static login(username, password)
    {
        postAsync(requestPrefix('/login'), {
            username,
            password: getHash(`${username}${password}`, 'sha256')
        })
            .then(res =>
            {
                const {statusCode} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    Alert.show('登录成功', true);
                    setOnline();
                    browserHistory.push('/');
                }
                else
                {
                    setOffline();
                    removeLoginToken();
                }

                if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
                {
                    Alert.show('用户不存在');
                }
                else if (statusCode === STATUS_CODE.REJECTION)
                {
                    Alert.show('密码错误');
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误');
                }
            })
            .catch(e =>
            {
                setOffline();
                Alert.show('登录失败', false);
                console.log(e);
            });
    };

    onSubmitButtonClick = (e) =>
    {
        e.preventDefault();
        const {username, password} = this.state;
        Login.login(username, password);
    };

    render()
    {
        return (

            <div className={style.Login}>
                <Title titleText={'登录'}/>
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
