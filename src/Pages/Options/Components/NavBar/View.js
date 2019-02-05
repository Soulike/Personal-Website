import React, {Component} from 'react';
import Style from './NavBar.module.scss';
import PropTypes from 'prop-types';
import {getItemName, ITEM_TYPES} from '../../Items';

class NavBar extends Component
{
    onItemClick = itemType =>
    {
        const {changeNavBarItem} = this.props;
        return () =>
        {
            changeNavBarItem(itemType);
        };
    };

    render()
    {
        const {currentNavBarItem} = this.props;
        return (
            <div className={Style.NavBar}>
                {
                    Object.values(ITEM_TYPES)
                        .map(itemType =>
                            (
                                <span className={`${currentNavBarItem === itemType ? `${Style.item} ${Style.active}` : Style.item}`}
                                      onClick={this.onItemClick(itemType)}
                                      key={itemType}>{getItemName(itemType)}</span>))
                }
            </div>
        );
    }
}

NavBar.propTypes = {
    currentNavBarItem: PropTypes.string.isRequired,
    changeNavBarItem: PropTypes.func.isRequired,
};

export default NavBar;