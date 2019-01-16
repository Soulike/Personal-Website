import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {switchArticleType} from '../../../TypeSelectBar/Actions/Actions';
import Functions from '../../../../../../Functions';
import {View as FunctionButton} from './Components/FunctionButton';
import style from './ArticleWrapper.module.scss';
import NAMESPACE from '../../../../../../Namespace';
import RequestProcessors from '../../../../../../RequestProcessors';

const {isInLikedList, staticPrefix, generateTimeString} = Functions;

class ArticleWrapper extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.AMOUNT.LIKE]: 0,
            hasLiked: false,
            canLikeButtonClick: true,
            [NAMESPACE.BLOG.ARTICLE.ID]: 0
        };
    }

    componentDidMount()
    {
        const {
            [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
            [NAMESPACE.BLOG.AMOUNT.LIKE]: likeAmount
        } = this.props;
        this.setState({
            [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
            [NAMESPACE.BLOG.AMOUNT.LIKE]: likeAmount,
            hasLiked: isInLikedList(articleId)
        });
    }

    onArticleTypeClick = (e) =>
    {
        let articleTypeId = -2;
        if (e.target.dataset)
        {
            articleTypeId = e.target.dataset['article_type_id'];
        }
        else
        {
            articleTypeId = e.target.getAttribute('data-article_type_id');
        }

        this.props.changeCurrentArticleTypeId(articleTypeId);
    };

    onLikeButtonClick = () =>
    {
        const {canLikeButtonClick} = this.state;
        if (canLikeButtonClick)
        {
            this.setState({canLikeButtonClick: false}, () =>
            {
                RequestProcessors.sendPostLikeArticleRequest.apply(this);
            });
        }
    };

    render()
    {
        const {canLikeButtonClick} = this.state;
        const {
            [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
            [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
            [NAMESPACE.BLOG.AMOUNT.VIEW]: viewAmount,
            [NAMESPACE.BLOG.AMOUNT.COMMENT]: commentAmount,
            [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: createdAt,
            [NAMESPACE.BLOG.ARTICLE.TYPE_NAME]: articleType,
            [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId,
            [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
            [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName
        } = this.props;
        const {
            [NAMESPACE.BLOG.AMOUNT.LIKE]: likeAmount,
            hasLiked
        } = this.state;
        const timeString = generateTimeString(createdAt);
        return (
            <div className={style.ArticleWrapper}>
                <div className={style.header}>
                    <div className={style.avatarWrapper}>
                        <img src={staticPrefix(avatarFileName)} alt="avatar" className={style.avatar}/>
                    </div>
                    <div className={style.headerMidPart}>
                        <div className={style.nickname}>{nickname}</div>
                        <div className={style.time}>{timeString}</div>
                    </div>
                </div>
                <div className={style.articleTypeWrapper}
                     data-article_type_id={articleTypeId}
                     onClick={this.onArticleTypeClick}>
                    <div className={style.articleType}
                         data-article_type_id={articleTypeId}
                         onClick={this.onArticleTypeClick}>{articleType}</div>
                    <div className={style.articleTypeTriangle}
                         data-article_type_id={articleTypeId}
                         onClick={this.onArticleTypeClick}>
                    </div>
                </div>
                <div className={style.mainPart}>
                    <div className={style.mainPartDescription}>发表了文章：</div>
                    <a href={`/article?articleId=${articleId}`}
                       target='_blank'
                       rel="noopener noreferrer"
                       className={style.titleWrapper}>
                        <div className={style.title}>
                            {articleTitle}
                        </div>
                    </a>
                </div>
                <div className={style.buttonArea}>
                    <FunctionButton icon={solidIcon.faEye} number={viewAmount} hasClicked={false}/>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={likeAmount}
                                    hasClicked={hasLiked}
                                    onClick={canLikeButtonClick ? this.onLikeButtonClick : null}/>
                    <FunctionButton icon={solidIcon.faComment} number={commentAmount} hasClicked={false}/>
                </div>
            </div>
        );
    }
}

ArticleWrapper.propTypes = {
    [NAMESPACE.BLOG.ARTICLE.ID]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.ARTICLE.TITLE]: PropTypes.string.isRequired,
    [NAMESPACE.BLOG.AMOUNT.VIEW]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.AMOUNT.LIKE]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.AMOUNT.COMMENT]: PropTypes.number.isRequired,
    [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: PropTypes.string.isRequired,
    [NAMESPACE.BLOG.ARTICLE.TYPE_NAME]: PropTypes.string.isRequired,
    [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: PropTypes.number.isRequired
};

const mapStateToProps = (state) =>
{
    const {
        [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName
    } = state['Blog'];
    return {
        [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName
    };
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        changeCurrentArticleTypeId: (articleTypeId) =>
        {
            dispatch(switchArticleType(articleTypeId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleWrapper);
