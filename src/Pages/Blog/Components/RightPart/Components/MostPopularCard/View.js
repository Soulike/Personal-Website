import React, {Component} from 'react';
import {View as TabBar} from './Components/TabBar';
import {View as CardBody} from './Components/CardBody';
import {Tab} from './Components/TabBar/Components/Tab';
import TabId from './TypeId';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import './MostPopularCard.css';

class MostPopularCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            tabArray: [
                new Tab(solidIcon.faEye, TabId.view),
                new Tab(solidIcon.faThumbsUp, TabId.like),
                new Tab(solidIcon.faComment, TabId.comment)
            ]
        };
    }


    render()
    {
        const {tabArray} = this.state;
        return (
            <div className={'MostPopularCard card'}>
                <TabBar tabArray={tabArray}/>
                <CardBody/>
            </div>
        );
    }
}

export default MostPopularCard;
