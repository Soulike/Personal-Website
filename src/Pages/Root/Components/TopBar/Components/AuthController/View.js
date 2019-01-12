import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as TopBarLink} from '../TopBarLink';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import style from './AuthController.module.scss';
import {postAsync} from '../../../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../../../Static/Functions/Url';
import {STATUS_CODE} from '../../../../../../Static/Constants';
import {setOffline, setOnline} from '../../../../../Login/Functions';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../../../../../Components/Alert';

class AuthController extends Component
{
    static logout()
    {
        postAsync(requestPrefix('/logout'))
            .then(res =>
            {
                const {statusCode} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    Alert.show('退出登录成功', true);
                    setOffline();
                    browserHistory.push('/');
                }
                else
                {
                    setOnline();
                }


                if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误');
                }
            })
            .catch(e =>
            {
                setOnline();
                Alert.show('退出登录失败', false);
                console.log(e);
            });
    }

    onExitLinkClick = (e) =>
    {
        e.preventDefault();
        AuthController.logout();
    };

    render()
    {
        const {hasLoggedIn} = this.props;
        // 如果没有登陆，就显示登陆按钮
        return (
            <div className={style.AuthController}>
                {hasLoggedIn ?
                    (
                        <div>
                            <TopBarLink to={'/dynamic'} text={'动态'} iconStyle={solidIcons.faInfoCircle}/>
                            <TopBarLink to={'/articleEditor'} text={'写文章'} iconStyle={solidIcons.faPenSquare}/>
                            <TopBarLink to={'/options'} text={'设置'} iconStyle={solidIcons.faCogs}/>
                            <TopBarLink to={'#'}
                                        text={'退出登录'}
                                        iconStyle={solidIcons.faSignOutAlt}
                                        onClick={this.onExitLinkClick}/>
                        </div>
                    ) :
                    (
                        <TopBarLink to={'/login'} text={'登录'} iconStyle={solidIcons.faUser}/>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state.Login;
    return {
        hasLoggedIn
    };
};

export default connect(mapStateToProps)(AuthController);
