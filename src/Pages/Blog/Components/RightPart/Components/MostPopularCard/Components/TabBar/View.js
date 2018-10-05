import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TabBar.css';
import {View as Tab} from './Components/Tab';

class TabBar extends Component
{
    render()
    {
        const {tabArray} = this.props;
        return (
            <div className={'MostPopularCardTabBar'}>
                {
                    tabArray.map(tab =>
                    {
                        return <Tab {...tab} key={tab.typeId}/>;
                    })
                }
            </div>
        );
    }
}

TabBar.propTypes = {
    tabArray: PropTypes.array.isRequired
};

export default TabBar;
