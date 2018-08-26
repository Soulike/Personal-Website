import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import {View as TopBarLink} from '../TopBarLink';
import {View as FloatMenu} from './Components/FloatMenu';
import './TopBarMenu.css';

class TopBarMenu extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            showFloatMenu: false
        };
    }

    onMouseEnter = () =>
    {
        this.setState({showFloatMenu: true});
    };

    onMouseLeave = () =>
    {
        this.setState({showFloatMenu: false});
    };

    render()
    {
        const {showFloatMenu} = this.state;
        const {iconStyle, menuName, menuLinks} = this.props;
        return (
            <div className={'TopBarMenu'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <TopBarLink iconStyle={iconStyle} text={menuName}>
                    <CSSTransitionGroup transitionName="floatMenu"
                                        transitionEnterTimeout={250}
                                        transitionLeaveTimeout={250}>
                        {showFloatMenu ? <FloatMenu items={menuLinks}/> : null}
                    </CSSTransitionGroup>
                </TopBarLink>
            </div>
        );
    }
}

TopBarMenu.propTypes = {
    iconStyle: PropTypes.object,
    menuName: PropTypes.string.isRequired,
    menuLinks: PropTypes.array.isRequired
};

export default TopBarMenu;
