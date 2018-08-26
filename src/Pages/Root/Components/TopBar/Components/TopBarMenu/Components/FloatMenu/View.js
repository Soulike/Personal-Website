import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './FloatMenu.css';
import {View as TopBarLink} from '../../../TopBarLink';

class FloatMenu extends Component
{
    render()
    {
        const {items} = this.props;
        return (
            <div className={'FloatMenu'}>
                {items.map((item) =>
                {
                    const {iconStyle, to, text} = item;
                    return <div className={'floatMenuLink'}>
                        <TopBarLink iconStyle={iconStyle} to={to} text={text}/>
                    </div>;
                })}
            </div>
        );
    }
}

FloatMenu.propTypes = {
    items: PropTypes.array.isRequired
};

export default FloatMenu;
