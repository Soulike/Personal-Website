import React, {Component} from 'react';
import {View as TabBar} from './Components/TabBar';
import {View as CardBody} from './Components/CardBody';
import {Tab} from './Components/TabBar/Components/Tab';
import TabId from './OrderedByTypes';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './MostPopularCard.module.scss';

class MostPopularCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            tabArray: [
                new Tab(solidIcon.faEye, TabId.VIEW_AMOUNT),
                new Tab(solidIcon.faThumbsUp, TabId.LIKE_AMOUNT)
                /*new Tab(solidIcon.faComment, TabId.comment)*/
            ]
        };
    }


    render()
    {
        const {tabArray} = this.state;
        return (
            <div className={style.MostPopularCard}>
                <TabBar tabArray={tabArray}/>
                <CardBody/>
            </div>
        );
    }
}

export default MostPopularCard;
