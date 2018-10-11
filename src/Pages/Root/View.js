import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View as Banner} from './Components/Banner';
import {View as TopBar} from './Components/TopBar';
import {View as Footer} from './Components/Footer';
import Store from '../../Store';
import * as Actions from '../../Components/AuthProcessor/Actions/Actions';
import {View as ToTopButton} from './Components/ToTopButton';
import style from './Root.module.scss';

class Root extends Component
{
    componentDidMount()
    {
        document.title = 'Soulike 的个人网站';
        Store.dispatch(Actions.checkLoginState());
    }

    render()
    {
        const {withBanner, withFooter, children} = this.props;
        return (
            <div className={style.outerWrapper}>
                {withBanner ? <Banner/> : <TopBar isBlur={false}/>}
                <div className={style.innerWrapper} key={this.props.location.pathname}>{children}</div>
                {withFooter ? <Footer/> : null}
                <ToTopButton/>
            </div>
        );
    }
}

Root.propTypes = {
    withBanner: PropTypes.bool.isRequired,
    withFooter: PropTypes.bool.isRequired
};

export default Root;
