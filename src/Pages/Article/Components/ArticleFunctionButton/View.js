import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './ArticleFunctionButton.module.scss';

class ArticleFunctionButton extends Component
{
    render()
    {
        const {icon, number, onClick, hasClicked} = this.props;
        return (
            <div className={`${style.ArticleFunctionButton} ${hasClicked ? style.buttonIconClicked : ''}`}
                 onClick={onClick}>
                <FontAwesomeIcon icon={icon} className={style.buttonIcon}/>
                <span className={style.number}>{number}</span>
            </div>
        );
    }
}

ArticleFunctionButton.propTypes = {
    icon: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    hasClicked: PropTypes.bool.isRequired,
};

export default ArticleFunctionButton;
