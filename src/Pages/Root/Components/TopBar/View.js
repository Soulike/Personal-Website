import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View as TopBarLink} from './Components/TopBarLink';
import {View as AuthController} from './Components/AuthController';
import {View as TopBarMenu} from './Components/TopBarMenu';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import MenuLink from './Components/TopBarMenu/MenuLink';
import style from './TopBar.module.scss';

class TopBar extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            menuLinks: [
                new MenuLink(solidIcons.faHashtag, '哈希生成器', '/hashGenerator'),
                new MenuLink(solidIcons.faHashtag, 'base64 转换器', '/base64Converter')
            ]
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return this.props.bannerBackground !== nextProps.bannerBackground;
    }

    render()
    {
        const {isBlur} = this.props;
        const {menuLinks} = this.state;
        const bannerImgStyle = {backgroundImage: this.props.bannerBackground};
        return (
            <div className={style.TopBar} style={isBlur ? null : {backgroundColor: '#FFF'}}>
                <div className={style.linkWrapper}>
                    <TopBarLink to={'/'} onlyActiveOnIndex={false} iconStyle={solidIcons.faHome} text={'博客'}/>
                    <TopBarLink to={'/soulikeDrive'} onlyActiveOnIndex={false} text={'网盘'}/>
                    <TopBarLink to={'/musicPlayer'} onlyActiveOnIndex={false} text={'音乐播放器'}/>
                    <TopBarMenu iconStyle={solidIcons.faToolbox} menuName={'小工具'} menuLinks={menuLinks}/>
                    <TopBarLink to={'/aboutMe'} onlyActiveOnIndex={false} iconStyle={solidIcons.faChild} text={'关于我'}/>
                    <div className={style.authControllerWrapper}>
                        <AuthController/>
                    </div>
                </div>
                {
                    isBlur && (<div>
                        <div className={`${style.mask} ${style.imageMask}`} style={bannerImgStyle}/>
                        <div className={`${style.mask} ${style.backgroundColorMask}`}/>
                    </div>)
                }
            </div>
        );
    }
}

TopBar.propTypes = {
    isBlur: PropTypes.bool.isRequired,
    bannerBackground: PropTypes.string.isRequired
};

const mapStateToProps = (state) =>
{
    const {bannerBackground} = state.Banner;
    return {
        bannerBackground
    };
};


export default connect(mapStateToProps)(TopBar);
