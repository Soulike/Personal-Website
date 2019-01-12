import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Reminder.module.scss';

class Reminder extends Component
{
    render()
    {
        const {type, children} = this.props;
        return (
            <div className={`${style.Reminder} ${style[type]}`}>
                {children}
            </div>
        );
    }
}

Reminder.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Reminder;
