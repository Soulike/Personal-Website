import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './SubTitle.module.scss';

class SubTitle extends Component
{
    render()
    {
        return (
            <div className={style.SubTitle}>
                <header>{this.props.children}</header>
            </div>
        );
    }
}

SubTitle.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SubTitle;
