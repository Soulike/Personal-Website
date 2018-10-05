import React, {Component} from 'react';
import ProfileCard from './Components/ProfileCard/View';
import './LeftPart.css';

class LeftPart extends Component
{
    render()
    {
        return (
            <div className={'LeftPart'}>
                <ProfileCard/>
            </div>
        );
    }
}

export default LeftPart;
