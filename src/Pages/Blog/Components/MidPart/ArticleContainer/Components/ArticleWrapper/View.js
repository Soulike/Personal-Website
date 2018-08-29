import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './ArticleWrapper.css';
import {switchArticleType} from '../../../TypeSelectBar/Actions/Actions';
import {prefixZero} from '../../../../../../../Static/functions';

class ArticleWrapper extends Component
{
    onArticleTypeClicked = (e) =>
    {
        this.props.changeCurrentArticleTypeId(e.target.dataset['article_type_id']);
        console.log(e.target);
        console.log(e.target.dataset['article_type_id']);
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
        const {id, title, time, type, typeId, nickname, avatar} = this.props;
        const timeStr = this.generateTimeStr(time);
        return (
            <div className={'ArticleWrapper'}>
                <div className={'articleWrapperHeader'}>
                    <div className={'ArticleWrapperAvatarWrapper'}>
                        <img src={avatar} alt="avatar" className={'ArticleWrapperAvatar'}/>
                    </div>
                    <div className={'ArticleWrapperHeaderMidPart'}>
                        <div className={'ArticleWrapperNickname'}>{nickname}</div>
                        <div className={'ArticleWrapperTime'}>{timeStr}</div>
                    </div>
                </div>
                <div className={'ArticleWrapperArticleTypeWrapper'}
                     data-article_type_id={typeId}
                     onClick={this.onArticleTypeClicked}>
                    <div className={'ArticleWrapperArticleType'}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>{type}</div>
                    <div className={'ArticleWrapperArticleTypeTriangle'}
                         data-article_type_id={typeId}
                         onClick={this.onArticleTypeClicked}>
                    </div>
                </div>
                <div className={'ArticleWrapperMainPart'}>
                    <div className={'ArticleWrapperMainPartDescription'}>发表了文章：</div>
                    <a href={`/article?articleId=${id}`} target='_blank' className={'ArticleWrapperTitleWrapper'}>
                        <div className={'ArticleWrapperTitle'}>
                            {title}
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

ArticleWrapper.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
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
