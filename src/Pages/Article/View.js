import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import showdown from 'showdown';
import './Article.css';
import {View as Alert} from '../../Components/Alert';
import {getAsync, postAsync, prefixZero, requestPrefix, submitLikeAsync, appendToLikedList, removeFromLikedList, isInLikedList} from '../../Static/functions';
import highLight from 'highlight.js';
import {View as FunctionButton} from './Components/ArticleFunctionButton';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';

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
            getAsync(requestPrefix('/blog/getArticle'), false, {articleId})
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
        const {title, content, type, time, modifyTime, hasLiked, like} = this.state;
        const {hasLoggedIn} = this.props;
        const converter = new showdown.Converter({
            tables: true,
            openLinksInNewWindow: true,
            simplifiedAutoLink: true
        });
        const contentHtml = converter.makeHtml(content);
        const daysAfterSubmit = Math.floor((Date.now() - Date.parse(modifyTime)) / (24 * 60 * 60 * 1000));
        return (
            <div className={'Article'}>
                <div className={'articleTitle'}>{title}</div>
                {hasLoggedIn ? <div className={'articleBtnWrapper'}>
                    <button className={'articleModifyBtn btn btn-primary'}
                            onClick={this.onModifyButtonClicked}>编辑
                    </button>
                    <button className={'articleDeleteBtn btn btn-danger'}
                            onClick={this.onDeleteButtonClicked}>删除
                    </button>
                </div> : null}
                <div className={'articleInfo'}>
                    <div className={'articleInfoTriangle'}/>
                    <div className={'articleTime'}>{this.generateTimeString(time)}</div>
                    <div className={'articleType'}>{type}</div>
                </div>
                <div className={'articleContent'} dangerouslySetInnerHTML={{__html: contentHtml}}/>
                <div className={'articleFunctionButtonWrapper'}>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={like}
                                    onClick={this.onLikeButtonClicked}
                                    hasClicked={hasLiked}/>
                </div>
                <div className={'articleFooter'}>
                    <div className={'timeWarning'}>本文最后更新于 {daysAfterSubmit >= 0 ? daysAfterSubmit : 0} 天前，其内容可能已不具有时效性，请谨慎阅读。</div>
                    <div className={'copyRightWarning'}>原创文章，转载请注明出处。禁止任何形式的商业使用。</div>
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
