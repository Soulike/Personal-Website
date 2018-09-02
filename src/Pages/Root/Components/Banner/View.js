import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as TopBar} from '../TopBar/index';
import * as Actions from './Actions/Actions';
import './Banner.css';

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
        const style = {backgroundImage: this.props.bannerBackground};
        return (
            <div className={'banner'} style={style}>
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
