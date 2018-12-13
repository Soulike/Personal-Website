import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './FunctionButton.module.scss';

class FunctionButton extends Component
{
    render()
    {
        const {icon, number, onClick, hasClicked} = this.props;
        return (
            <div className={`${style.FunctionButton} ${hasClicked ? style.buttonIconClicked : ''}`} onClick={onClick}>
                <FontAwesomeIcon icon={icon} className={style.buttonIcon}/>
                <span className={style.number}>{number}</span>
            </div>
        );
    }
}

FunctionButton.propTypes = {
    icon: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    hasClicked: PropTypes.bool.isRequired
};

export default FunctionButton;
