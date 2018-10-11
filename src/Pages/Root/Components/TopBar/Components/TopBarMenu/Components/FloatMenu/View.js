import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View as TopBarLink} from '../../../TopBarLink';
import style from './FloatMenu.module.scss';

class FloatMenu extends Component
{
    render()
    {
        const {items} = this.props;
        return (
            <div className={style.FloatMenu}>
                {items.map((item) =>
                {
                    const {iconStyle, to, text} = item;
                    return <div className={style.floatMenuLink} key={text}>
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
