import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import './ArticleWrapper.css';
import {switchArticleType} from '../../../TypeSelectBar/Actions/Actions';
import {staticPrefix, prefixZero, postAsync, requestPrefix} from '../../../../../../../Static/functions';
import {View as FunctionButton} from './Components/FunctionButton';
import Alert from '../../../../../../../Components/Alert/View';

class ArticleWrapper extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            like: 0,
            hasLiked: false
        };
    }

    componentDidMount()
    {
        this.setState({like: this.props.like});
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

    onLikeButtonClicked = (e) =>
    {
        const {hasLiked} = this.state;
        const {id} = this.props;
        postAsync(requestPrefix('/blog/likeArticle'), {
            articleId: id,
            isAddLike: !hasLiked
        })
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({
                        like: parseInt(data),
                        hasLiked: !hasLiked
                    });
                }
                else
                {
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('点赞失败', false);
                console.log(e);
            });
    };

    generateTimeStr = (time) =>
    {
        const MILLISECONDS = {
            YEAR: 365 * 24 * 60 * 60 * 1000,
            MONTH: 30 * 24 * 60 * 60 * 1000,
            WEEK: 7 * 24 * 60 * 60 * 1000,
            DAY: 24 * 60 * 60 * 1000,
            HOUR: 60 * 60 * 1000,
            MINUTE: 60 * 1000,
            SECOND: 1000
        };
        const date = new Date(time);
        const diff = Date.now() - date.getTime();
        const {floor} = Math;
        if (diff >= MILLISECONDS.YEAR)
        {
            return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;
        }
        else if (diff >= MILLISECONDS.MONTH)
        {
            return `${floor(diff / MILLISECONDS.MONTH)}月前`;
        }
        else if (diff >= MILLISECONDS.WEEK)
        {
            return `${floor(diff / MILLISECONDS.WEEK)}周前`;
        }
        else if (diff >= MILLISECONDS.DAY)
        {
            return `${floor(diff / MILLISECONDS.DAY)}天前`;
        }
        else if (diff >= MILLISECONDS.HOUR)
        {
            return `${floor(diff / MILLISECONDS.HOUR)}小时前`;
        }
        else if (diff >= MILLISECONDS.MINUTE)
        {
            return `${floor(diff / MILLISECONDS.MINUTE)}分钟前`;
        }
        else if (diff >= MILLISECONDS.SECOND)
        {
            return `${floor(diff / MILLISECONDS.SECOND)}秒前`;
        }
    };

    render()
    {
        const {id, title, view, comment, time, type, typeId, nickname, avatar} = this.props;
        const {like, hasLiked} = this.state;
        const timeStr = this.generateTimeStr(time);
        return (
            <div className={'ArticleWrapper'}>
                <div className={'header'}>
                    <div className={'avatarWrapper'}>
                        <img src={staticPrefix(avatar)} alt="avatar" className={'avatar'}/>
                    </div>
                    <div className={'headerMidPart'}>
                        <div className={'nickname'}>{nickname}</div>
                        <div className={'time'}>{timeStr}</div>
                    </div>
                </div>
                <div className={'articleTypeWrapper'}
                     data-article_type_id={typeId}
                     onClick={this.onArticleTypeClicked}>
                    <div className={'articleType'}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>{type}</div>
                    <div className={'articleTypeTriangle'}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>
                    </div>
                </div>
                <div className={'mainPart'}>
                    <div className={'mainPartDescription'}>发表了文章：</div>
                    <a href={`/article?articleId=${id}`} target='_blank' className={'titleWrapper'}>
                        <div className={'title'}>
                            {title}
                        </div>
                    </a>
                </div>
                <div className={'buttonArea'}>
                    <FunctionButton icon={solidIcon.faEye} number={view} hasClicked={false}/>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={like}
                                    hasClicked={hasLiked}
                                    onClick={this.onLikeButtonClicked}/>
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
