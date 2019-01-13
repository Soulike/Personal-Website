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
        return this.props.bannerImageFileUrl !== nextProps.bannerImageFileUrl;
    }

    render()
    {
        const hasBackgroundStyle = {backgroundImage: this.props.bannerImageFileUrl};
        return (
            <div className={style.Banner} style={hasBackgroundStyle}>
                <TopBar isBlur={true}/>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {bannerImageFileUrl} = state.Banner;
    return {
        bannerImageFileUrl
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
