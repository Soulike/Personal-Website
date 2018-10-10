import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {generateTimeStr} from '../../../../../../../../../../Static/Functions';
import './CardBodyListItem.css';

class CardBodyListItem extends Component
{
    render()
    {
        const {title, like, view, id, comment, time} = this.props;
        return (
            <div className={'CardBodyListItem'}>
                <div className={'titleWrapper'}>
                    <a className={'title'} href={`/article?articleId=${id}`} target='_blank'>{title}</a>
                </div>
                <div className={'infoWrapper'}>
                    <div className={'numberArea'}>
                        <div className={'numberWrapper'}>
                            <FontAwesomeIcon icon={solidIcons.faEye} className={'icon'}/>
                            <div className={'number'}>{view}</div>
                        </div>
                        <div className={'numberWrapper'}>
                            <FontAwesomeIcon icon={solidIcons.faThumbsUp} className={'icon'}/>
                            <div className={'number'}>{like}</div>
                        </div>
                        <div className={'numberWrapper'}>
                            <FontAwesomeIcon icon={solidIcons.faComment} className={'icon'}/>
                            <div className={'number'}>{comment}</div>
                        </div>
                    </div>
                    <div className={'timeArea'}>
                        {generateTimeStr(time)}
                    </div>
                </div>
            </div>
        );
    }
}

CardBodyListItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired
};

export default CardBodyListItem;
