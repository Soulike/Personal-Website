import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './SubTitle.module.scss';

class SubTitle extends Component
{
    render()
    {
        return (
            <div className={style.SubTitle}>
                <header>{this.props.titleText}</header>
            </div>
        );
    }
}

SubTitle.propTypes = {
    titleText: PropTypes.string.isRequired
};

export default SubTitle;
