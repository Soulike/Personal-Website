import React, {Component} from 'react';
import style from './Hint.module.scss';

class Hint extends Component
{
    render()
    {
        return (
            <div className={style.Hint}>
                {this.props.children}
            </div>
        );
    }
}

export default Hint;