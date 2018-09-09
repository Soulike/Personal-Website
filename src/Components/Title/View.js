import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Title.css';

class Title extends Component
{
    render()
    {
        return (
            <div className={'Title'}>
                <header className={'titleText'}>{this.props.titleText}</header>
            </div>
        );
    }
}

Title.propTypes = {
    titleText: PropTypes.string.isRequired
};

export default Title;
