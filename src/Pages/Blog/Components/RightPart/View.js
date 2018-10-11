import React, {Component} from 'react';
import MostPopularCard from './Components/MostPopularCard/View';
import style from './RightPart.module.scss';

class RightPart extends Component
{
    render()
    {
        return (
            <div className={style.RightPart}>
                <MostPopularCard/>
            </div>
        )
    }
}

export default RightPart;
