import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as TopBarLink} from '../TopBarLink';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import style from './AuthController.module.scss';
import RequestProcessors from '../../../../../../RequestProcessor';

class AuthController extends Component
{
    onExitLinkClick = e =>
    {
        e.preventDefault();
        RequestProcessors.sendPostLogoutRequest.apply(this);
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
