import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './ArticleFunctionButton.css';

class ArticleFunctionButton extends Component
{
    render()
    {
        const {icon, number, onClick, hasClicked} = this.props;
        return (
            <div className={`ArticleFunctionButton ${hasClicked ? 'articleFunctionButtonIconClicked' : ''}`}
                 onClick={onClick}>
                <FontAwesomeIcon icon={icon} className={'articleFunctionButtonIcon'}/>
                <span className={'articleFunctionButtonNumber'}>{number}</span>
            </div>
        );
    }
}

ArticleFunctionButton.propTypes = {
    icon: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    hasClicked: PropTypes.bool.isRequired
};

export default ArticleFunctionButton;
