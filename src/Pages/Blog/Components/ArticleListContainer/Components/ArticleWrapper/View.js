import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {switchArticleType} from '../../../TypeSelectBar/Actions/Actions';
import {
    appendToLikedList,
    generateTimeStr,
    isInLikedList,
    removeFromLikedList,
    staticPrefix,
    submitLikeAsync
} from '../../../../../../Static/Functions';
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
        const {id, like} = this.props;
        this.setState({
            like,
            hasLiked: isInLikedList(id)
        });
    }

    onArticleTypeClicked = (e) =>
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

    onLikeButtonClicked = () =>
    {
        const {hasLiked, canLikeButtonClick} = this.state;
        if (canLikeButtonClick)
        {
            this.setState({canLikeButtonClick: false}, () =>
            {
                const {id} = this.props;
                submitLikeAsync(id, !hasLiked)
                    .then(res =>
                    {
                        const {statusCode, data} = res;
                        if (statusCode === STATUS_CODE.SUCCESS)
                        {
                            this.setState({
                                like: parseInt(data, 10),
                                hasLiked: !hasLiked,
                            }, () =>
                            {
                                if (isInLikedList(id))
                                {
                                    removeFromLikedList(id);
                                }
                                else
                                {
                                    appendToLikedList(id);
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
        const {id, title, view, comment, time, type, typeId, nickname, avatar} = this.props;
        const {like, hasLiked} = this.state;
        const timeStr = generateTimeStr(time);
        return (
            <div className={style.ArticleWrapper}>
                <div className={style.header}>
                    <div className={style.avatarWrapper}>
                        <img src={staticPrefix(avatar)} alt="avatar" className={style.avatar}/>
                    </div>
                    <div className={style.headerMidPart}>
                        <div className={style.nickname}>{nickname}</div>
                        <div className={style.time}>{timeStr}</div>
                    </div>
                </div>
                <div className={style.articleTypeWrapper}
                     data-article_type_id={typeId}
                     onClick={this.onArticleTypeClicked}>
                    <div className={style.articleType}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>{type}</div>
                    <div className={style.articleTypeTriangle}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>
                    </div>
                </div>
                <div className={style.mainPart}>
                    <div className={style.mainPartDescription}>发表了文章：</div>
                    <a href={`/article?articleId=${id}`}
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
                                    onClick={canLikeButtonClick ? this.onLikeButtonClicked : null}/>
                    <FunctionButton icon={solidIcon.faComment} number={comment} hasClicked={false}/>
                </div>
            </div>
        );
    }
}

ArticleWrapper.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired
};

const mapStateToProps = (state) =>
{
    const {nickname, avatar} = state['Blog'];
    return {
        nickname,
        avatar
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
