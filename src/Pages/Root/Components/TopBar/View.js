import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TopBarLink from './Components/TopBarLink';
import AuthController from './Components/AuthController';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import './TopBar.css';

class TopBar extends Component
{
    render()
    {
        const {isBlur} = this.props;
        const style = {backgroundImage: this.props.bannerBackground};
        return (
            <div className={'TopBar'}>
                <div className={'linkWrapper'}>
                    <TopBarLink to={'/'} onlyActiveOnIndex={false} iconStyle={solidIcons.faHome} text={'博客'}/>
                    <TopBarLink to={'/soulikeDrive'} onlyActiveOnIndex={false} text={'网盘'}/>
                    <TopBarLink to={'/musicPlayer'} onlyActiveOnIndex={false} text={'音乐播放器'}/>
                    <div className={'authControllerWrapper'}>
                        <AuthController/>
                    </div>
                </div>
                {
                    isBlur && (<div>
                        <div className={`${'mask'} ${'imageMask'}`} style={style}/>
                        <div className={`${'mask'} ${'backgroundColorMask'}`}/>
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
