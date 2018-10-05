import React, {Component} from 'react';
import './RightPart.css';
import MostPopularCard from './Components/MostPopularCard/View';

class RightPart extends Component
{
    render()
    {
        return (
            <div className={'RightPart'}>
                <MostPopularCard/>
            </div>
        )
    }
}

export default RightPart;
