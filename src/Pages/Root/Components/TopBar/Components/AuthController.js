import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopBarLink from './TopBarLink';
import {Actions} from '../../../../../Components/AuthProcessor';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

class AuthController extends Component
{
    constructor()
    {
        super(...arguments);
    }

    render()
    {
        const {hasLoggedIn, onClickExitLink} = this.props;
        // 如果没有登陆，就显示登陆按钮
        if (!hasLoggedIn)
        {
            return (
                <div>
                    <TopBarLink to={'/login'} text={'登录'} iconStyle={solidIcons.faUser}/>
                </div>
            );
        }
        // 如果登陆了，就显示功能按钮
        else
        {
            return (
                <div>
                    <TopBarLink to={'/dynamic'} text={'动态'} iconStyle={solidIcons.faInfoCircle}/>
                    <TopBarLink to={'/options'} text={'设置'} iconStyle={solidIcons.faCogs}/>
                    <TopBarLink to={'#'}
                                text={'退出登录'}
                                iconStyle={solidIcons.faSignOutAlt}
                                onClick={onClickExitLink}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state.AuthProcessor;
    return {
        hasLoggedIn
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        onClickExitLink: (e) =>
        {
            e.preventDefault();
            dispatch(Actions.logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthController);
