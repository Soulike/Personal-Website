import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {Actions} from '../../Components/AuthProcessor';
import './Login.css';
import {View as Alert} from '../../Components/Alert';
import {View as Title} from '../../Components/Title';

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

    componentWillReceiveProps(nextProps, nextContext)
    {
        if (nextProps.hasLoggedIn)
        {
            browserHistory.push('/');
            Alert.show('您已登录', true);
        }
    }

    onUsernameChange = (e) =>
    {
        this.setState({username: e.target.value});
    };

    onPasswordChange = (e) =>
    {
        this.setState({password: e.target.value});
    };

    onSubmitButtonClick = (e) =>
    {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.onSubmit(username, password);
    };

    render()
    {
        return (
            <div className={'Login'}>
                <Title titleText={'登录'}/>
                <form onSubmit={this.onSubmitButtonClick}>
                    <div className={'inputWrapper'}>
                        <FontAwesomeIcon icon={solidIcons.faUserCircle} className={'icon'}/>
                        <input type="text"
                               placeholder={'用户名'}
                               className={'loginInput'}
                               onChange={this.onUsernameChange}/>
                    </div>
                    <div className={'inputWrapper'}>
                        <FontAwesomeIcon icon={solidIcons.faKey} className={'icon'}/>
                        <input type="password"
                               placeholder={'密码'}
                               className={'loginInput'}
                               onChange={this.onPasswordChange}/>
                    </div>
                    <button className={'submitButton'}>登陆</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state['AuthProcessor'];
    return {hasLoggedIn};
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        onSubmit: (username, password) =>
        {
            dispatch(Actions.login(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
