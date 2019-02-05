import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Title.module.scss';

class Title extends Component
{
    render()
    {
        return (
            <div className={style.Title}>
                <header>{this.props.children}</header>
            </div>
        );
    }
}

Title.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Title;
