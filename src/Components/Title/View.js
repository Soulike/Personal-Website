import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Title.module.scss';

class Title extends Component
{
    render()
    {
        return (
            <div className={style.Title}>
                <header className={style.titleText}>{this.props.titleText}</header>
            </div>
        );
    }
}

Title.propTypes = {
    titleText: PropTypes.string.isRequired
};

export default Title;
