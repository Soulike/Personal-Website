import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './ProgressBar.module.scss';

class ProgressBar extends Component
{
    render()
    {
        const {progress} = this.props;
        return (
            <div className={style.ProgressBar}>
                <div className={style.progress} style={{width: `${progress * 100}%`}}/>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
};

export default ProgressBar;
