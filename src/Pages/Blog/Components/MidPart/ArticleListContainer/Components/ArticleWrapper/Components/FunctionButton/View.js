import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './FunctionButton.css';

class FunctionButton extends Component
{
    render()
    {
        const {icon, number, onClick, hasClicked} = this.props;
        return (
            <div className={`FunctionButton ${hasClicked ? 'buttonIconClicked' : ''}`} onClick={onClick}>
                <FontAwesomeIcon icon={icon} className={'buttonIcon'}/>
                <span className={'number'}>{number}</span>
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