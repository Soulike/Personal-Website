import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {switchArticleType} from '../../../TypeSelectBar/Actions/Actions';
import {appendToLikedList, isInLikedList, removeFromLikedList, submitLikeAsync} from '../../../../../../Static/Functions/Like';
import {staticPrefix} from '../../../../../../Static/Functions/Url';
import {generateTimeString} from '../../../../../../Static/Functions/Util';
import {View as FunctionButton} from './Components/FunctionButton';
import Alert from '../../../../../../Components/Alert/View';
import style from './ArticleWrapper.module.scss';
import {STATUS_CODE} from '../../../../../../Static/Constants';

class ArticleWrapper extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            like: 0,
            hasLiked: false,
            canLikeButtonClick: true
        };
    }

    componentDidMount()
    {
        const {articleId, like} = this.props;
        this.setState({
            like,
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
        const {hasLiked, canLikeButtonClick} = this.state;
        if (canLikeButtonClick)
        {
            this.setState({canLikeButtonClick: false}, () =>
            {
                const {articleId} = this.props;
                submitLikeAsync(articleId, !hasLiked)
                    .then(res =>
                    {
                        const {statusCode, data} = res;
                        if (statusCode === STATUS_CODE.SUCCESS)
                        {
                            const {like} = data;
                            this.setState({
                                like: parseInt(like, 10),
                                hasLiked: !hasLiked
                            }, () =>
                            {
                                if (isInLikedList(articleId))
                                {
                                    removeFromLikedList(articleId);
                                }
                                else
                                {
                                    appendToLikedList(articleId);
                                }
                            });
                        }
                        else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
                        {
                            Alert.show('请求参数无效', false);
                        }
                        else if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
                        {
                            Alert.show('要点赞的文章不存在', false);
                        }
                        else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                        {
                            Alert.show('服务器错误', false);
                        }
                    })
                    .catch(e =>
                    {
                        Alert.show('点赞失败', false);
                        console.log(e);
                    })
                    .finally(() =>
                    {
                        this.setState({canLikeButtonClick: true});
                    });
            });
        }
    };

    render()
    {
        const {canLikeButtonClick} = this.state;
        const {articleId, title, view, comment, createdAt, articleType, articleTypeId, nickname, avatarFileName} = this.props;
        const {like, hasLiked} = this.state;
        const timeStr = generateTimeString(createdAt);
        return (
            <div className={style.ArticleWrapper}>
                <div className={style.header}>
                    <div className={style.avatarWrapper}>
                        <img src={staticPrefix(avatarFileName)} alt="avatar" className={style.avatar}/>
                    </div>
                    <div className={style.headerMidPart}>
                        <div className={style.nickname}>{nickname}</div>
                        <div className={style.time}>{timeStr}</div>
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
                            {title}
                        </div>
                    </a>
                </div>
                <div className={style.buttonArea}>
                    <FunctionButton icon={solidIcon.faEye} number={view} hasClicked={false}/>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={like}
                                    hasClicked={hasLiked}
                                    onClick={canLikeButtonClick ? this.onLikeButtonClick : null}/>
                    <FunctionButton icon={solidIcon.faComment} number={comment} hasClicked={false}/>
                </div>
            </div>
        );
    }
}

ArticleWrapper.propTypes = {
    articleId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    articleType: PropTypes.string.isRequired,
    articleTypeId: PropTypes.number.isRequired
};

const mapStateToProps = (state) =>
{
    const {nickname, avatarFileName} = state['Blog'];
    return {
        nickname,
        avatarFileName
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
