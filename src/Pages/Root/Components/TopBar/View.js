import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Objects as TopBarObjects, View as TopBarLink} from './Components/TopBarLink';
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
        const {TopBarRouteLink, TopBarUrlLink} = TopBarObjects;
        this.state = {
            topBarLinks: [
                new TopBarRouteLink('/', '博客', solidIcons.faHome),
                new TopBarRouteLink('/soulikeDrive', '网盘'),
                /*new TopBarRouteLink('/musicPlayer', '音乐播放器', solidIcons.faHome),*/
                new TopBarUrlLink('https://note.soulike.tech', '笔记'),
                new TopBarUrlLink('https://schedule.soulike.tech', '日程表')
            ],
            menuLinks: [
                new MenuLink(solidIcons.faHashtag, '哈希生成器', '/hashGenerator'),
                new MenuLink(solidIcons.faHashtag, 'base64 转换器', '/base64Converter')
            ]
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return this.props.bannerImageFileUrl !== nextProps.bannerImageFileUrl;
    }

    render()
    {
        const {isBlur} = this.props;
        const {topBarLinks, menuLinks} = this.state;
        const bannerImgStyle = {backgroundImage: this.props.bannerImageFileUrl};
        return (
            <div className={style.TopBar} style={isBlur ? null : {backgroundColor: '#FFF'}}>
                <nav className={style.linkWrapper}>
                    {
                        topBarLinks.map((link, i) => (<TopBarLink {...link} key={i}/>))
                    }
                    <TopBarMenu iconStyle={solidIcons.faToolbox} menuName={'小工具'} menuLinks={menuLinks}/>
                    <TopBarLink to={'/aboutMe'} onlyActiveOnIndex={false} iconStyle={solidIcons.faChild} text={'关于我'}/>
                    <div className={style.authControllerWrapper}>
                        <AuthController/>
                    </div>
                </nav>
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
};

const mapStateToProps = (state) =>
{
    const {bannerImageFileUrl} = state.Banner;
    return {
        bannerImageFileUrl
    };
};


export default connect(mapStateToProps)(TopBar);
