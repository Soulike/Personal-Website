import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard/View';
import style from './LeftPart.module.scss';

class LeftPart extends Component
{
    render()
    {
        return (
            <div className={style.LeftPart}>
                <ProfileCard/>
            </div>
        );
    }
}

export default LeftPart;
