import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {generateTimeString} from '../../../../../../../../Static/Functions/Util';
import style from './CardBodyListItem.module.scss';

class CardBodyListItem extends Component
{
    render()
    {
        const {title, like, view, articleId, comment, createdAt} = this.props;
        return (
            <div className={style.CardBodyListItem}>
                <div className={style.titleWrapper}>
                    <a className={style.title}
                       href={`/article?articleId=${articleId}`}
                       rel="noopener noreferrer"
                       target='_blank'>{title}</a>
                </div>
                <div className={style.infoWrapper}>
                    <div className={style.numberArea}>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faEye} className={style.icon}/>
                            <div className={style.number}>{view}</div>
                        </div>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faThumbsUp} className={style.icon}/>
                            <div className={style.number}>{like}</div>
                        </div>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faComment} className={style.icon}/>
                            <div className={style.number}>{comment}</div>
                        </div>
                    </div>
                    <div className={style.timeArea}>
                        {generateTimeString(createdAt)}
                    </div>
                </div>
            </div>
        );
    }
}

CardBodyListItem.propTypes = {
    title: PropTypes.string.isRequired,
    articleId: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired
};

export default CardBodyListItem;
