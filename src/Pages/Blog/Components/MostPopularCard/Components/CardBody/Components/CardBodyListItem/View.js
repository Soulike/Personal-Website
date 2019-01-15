import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {generateTimeString} from '../../../../../../../../Static/Functions/Util';
import style from './CardBodyListItem.module.scss';
import NAMESPACE from '../../../../../../../../Namespace';

class CardBodyListItem extends Component
{
    render()
    {
        const {
            [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
            [NAMESPACE.BLOG.AMOUNT.LIKE]: likeAmount,
            [NAMESPACE.BLOG.AMOUNT.VIEW]: viewAmount,
            [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
            [NAMESPACE.BLOG.AMOUNT.COMMENT]: commentAmount,
            [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: createdAt
        } = this.props;
        return (
            <div className={style.CardBodyListItem}>
                <div className={style.titleWrapper}>
                    <a className={style.title}
                       href={`/article?articleId=${articleId}`}
                       rel="noopener noreferrer"
                       target='_blank'>{articleTitle}</a>
                </div>
                <div className={style.infoWrapper}>
                    <div className={style.numberArea}>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faEye} className={style.icon}/>
                            <div className={style.number}>{viewAmount}</div>
                        </div>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faThumbsUp} className={style.icon}/>
                            <div className={style.number}>{likeAmount}</div>
                        </div>
                        <div className={style.numberWrapper}>
                            <FontAwesomeIcon icon={solidIcons.faComment} className={style.icon}/>
                            <div className={style.number}>{commentAmount}</div>
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
    [NAMESPACE.BLOG.ARTICLE.TITLE]: PropTypes.string.isRequired,
    [NAMESPACE.BLOG.ARTICLE.ID]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: PropTypes.string.isRequired,
    [NAMESPACE.BLOG.AMOUNT.VIEW]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.AMOUNT.LIKE]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.AMOUNT.COMMENT]: PropTypes.number.isRequired
};

export default CardBodyListItem;
