import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {View as Alert} from '../../Components/Alert';
import {getAsync, postAsync, prefixZero, requestPrefix, submitLikeAsync, appendToLikedList, removeFromLikedList, isInLikedList, markdownToHtml} from '../../Static/Functions';
import highLight from 'highlight.js';
import {View as FunctionButton} from './Components/ArticleFunctionButton';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import btnStyle from '../../Static/Button.module.scss';
import style from './Article.module.scss';

class Article extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            id: 0,
            title: 'Loading……',
            content: 'Loading……',
            type: 'Loading……',
            typeId: 0,
            like: 0,
            time: 0,
            modifyTime: 0,
            hasLiked: false
        };
    }

    componentDidMount()
    {
        const {articleId} = this.props.location.query;
        if (!articleId)
        {
            Alert.show('参数无效', false);
        }
        else
        {
            getAsync(requestPrefix('/blog/getArticle'), true, {articleId})
                .then(res =>
                {
                    const {isSuccess, msg, data} = res;
                    if (isSuccess)
                    {
                        this.setState({...data}, () =>
                        {
                            highLight.initHighlighting();
                        });
                        document.title = `${data.title} - Soulike 的个人网站`;
                    }
                    else
                    {
                        Alert.show(msg, false);
                    }
                })
                .catch(e =>
                {
                    Alert.show('获取文章失败', false);
                    console.log(e);
                });

            this.setState({hasLiked: isInLikedList(articleId)});
        }
    }

    generateTimeString = (time) =>
    {
        const date = new Date(time);
        return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())} ${prefixZero(date.getHours())}:${prefixZero(date.getMinutes())}`;
    };

    onModifyButtonClicked = (e) =>
    {
        e.preventDefault();
        if (this.state.id !== 0)
        {
            const {id, title, content, typeId} = this.state;
            sessionStorage.setItem('title', title);
            sessionStorage.setItem('content', content);
            sessionStorage.setItem('typeId', typeId);
            browserHistory.push(`/articleEditor?modify=${true}&articleId=${id}`);
        }
        else
        {
            Alert.show('文章不存在', false);
        }
    };

    // TODO: 二次确认模态框
    onDeleteButtonClicked = (e) =>
    {
        e.preventDefault();
        if (this.state.id !== 0)
        {
            postAsync(requestPrefix('/blog/deleteArticle'), {articleId: this.state.id})
                .then(res =>
                {
                    const {isSuccess, msg} = res;
                    Alert.show(msg, isSuccess);
                    if (isSuccess)
                    {
                        setTimeout(() =>
                        {
                            browserHistory.push('/');
                        }, 1000);
                    }
                })
                .catch(e =>
                {
                    Alert.show('删除失败', false);
                    console.log(e);
                });
        }
        else
        {
            Alert.show('文章不存在', false);
        }
    };

    onLikeButtonClicked = (e) =>
    {
        const {hasLiked, id} = this.state;
        submitLikeAsync(id, !hasLiked)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({
                        like: parseInt(data, 10),
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
        if (isInLikedList(id))
        {
            removeFromLikedList(id);
        }
        else
        {
            appendToLikedList(id);
        }
    };

    render()
    {
        const {title, content, type, time, hasLiked, like} = this.state;
        const {hasLoggedIn} = this.props;
        const contentHtml = markdownToHtml(content);
        const daysAfterSubmit = Math.floor((Date.now() - Date.parse(time)) / (24 * 60 * 60 * 1000));
        return (
            <div className={style.Article}>
                <div className={style.articleTitle}>{title}</div>
                {hasLoggedIn ? <div className={style.articleBtnWrapper}>
                    <button className={`${style.articleModifyBtn}`}
                            onClick={this.onModifyButtonClicked}>编辑
                    </button>
                    <button className={`${style.articleDeleteBtn}`}
                            onClick={this.onDeleteButtonClicked}>删除
                    </button>
                </div> : null}
                <div className={style.articleInfo}>
                    <div className={style.articleInfoTriangle}/>
                    <div className={style.articleTime}>{this.generateTimeString(time)}</div>
                    <div className={style.articleType}>{type}</div>
                </div>
                <div className={style.articleContent} dangerouslySetInnerHTML={{__html: contentHtml}}/>
                <div className={style.articleFunctionButtonWrapper}>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={like}
                                    onClick={this.onLikeButtonClicked}
                                    hasClicked={hasLiked}/>
                </div>
                <div className={style.articleFooter}>
                    <div className={style.timeWarning}>本文发表于 {daysAfterSubmit >= 0 ? daysAfterSubmit : 0} 天前，其内容可能已不具有时效性，请谨慎阅读。</div>
                    <div className={style.copyRightWarning}>原创文章，转载请注明出处。禁止任何形式的商业使用。</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state['AuthProcessor'];
    return {
        hasLoggedIn
    };
};


export default connect(mapStateToProps)(Article);
