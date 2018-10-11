import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as TopBar} from '../TopBar/index';
import * as Actions from './Actions/Actions';
import style from './Banner.module.scss';

class Banner extends Component
{
    componentDidMount()
    {
        this.props.onLoad();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return this.props.bannerBackground !== nextProps.bannerBackground;
    }

    render()
    {
        const hasBackgroundStyle = {backgroundImage: this.props.bannerBackground};
        return (
            <div className={style.Banner} style={hasBackgroundStyle}>
                <TopBar isBlur={true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {bannerBackground} = state.Banner;
    return {
        bannerBackground
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        onLoad: () =>
        {
            dispatch(Actions.getBannerImage());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
