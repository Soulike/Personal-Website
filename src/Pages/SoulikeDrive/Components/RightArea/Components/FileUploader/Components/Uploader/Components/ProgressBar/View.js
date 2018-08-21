import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

class ProgressBar extends Component
{
    render()
    {
        const {progress} = this.props;
        return (
            <div className={'ProgressBar'}>
                <div className={'progress'} style={{width: `${progress * 100}%`}}/>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
};

export default ProgressBar;
