import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {View as Alert} from '../../Components/Alert';
import {
    addScript,
    appendToLikedList,
    getAsync,
    isInLikedList,
    markdownToHtml,
    postAsync,
    prefixZero,
    removeFromLikedList,
    requestPrefix,
    submitLikeAsync
} from '../../Static/Functions';
import highLight from 'highlight.js';
import {View as FunctionButton} from './Components/ArticleFunctionButton';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Article.module.scss';
import {STATUS_CODE} from '../../Static/Constants';
import {redirectToLogin} from '../Login/Functions';
import {View as Modal} from '../../Components/Modal';

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
            hasLiked: false,
            canLikeButtonClick: true
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
                    const {statusCode, data} = res;
                    if (statusCode === STATUS_CODE.SUCCESS)
                    {
                        this.setState({...data}, () =>
                        {
                            highLight.initHighlighting();
                            addScript('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_HTMLorMML');
                        });
                        document.title = `${data.title} - Soulike 的个人网站`;
                    }
                    else if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
                    {
                        Alert.show('文章不存在', false);
                    }
                    else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
                    {
                        Alert.show('请求参数错误', false);
                    }
                    else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                    {
                        Alert.show('服务器内部错误', false);
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

    onModifyButtonClick = (e) =>
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

    onDeleteButtonClick = (e) =>
    {
        e.preventDefault();
        if (this.state.id !== 0)
        {
            const {title} = this.state;
            Modal.show('删除确认', `确认要删除文章《${title}》吗？`, () =>
            {
                postAsync(requestPrefix('/blog/deleteArticle'), {articleId: this.state.id})
                    .then(res =>
                    {
                        const {statusCode} = res;
                        if (statusCode === STATUS_CODE.SUCCESS)
                        {
                            Alert.show('删除成功', true);
                            setTimeout(() =>
                            {
                                browserHistory.push('/');
                            }, 1000);
                        }
                        else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
                        {
                            Alert.show('请求参数无效', false);
                        }
                        else if (statusCode === STATUS_CODE.CONTENT_NOT_FOUND)
                        {
                            Alert.show('要删除的文章不存在', false);
                        }
                        else if (statusCode === STATUS_CODE.REJECTION)
                        {
                            Alert.show('你没有删除此文章的权限', false);
                        }
                        else if (statusCode === STATUS_CODE.INVALID_SESSION)
                        {
                            Alert.show('请先登录', false);
                            redirectToLogin();
                        }
                        else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                        {
                            Alert.show('服务器错误', false);
                        }
                    })
                    .catch(e =>
                    {
                        Alert.show('删除失败', false);
                        console.log(e);
                    });
            });
        }
        else
        {
            Alert.show('参数无效', false);
        }
    };

    onLikeButtonClick = () =>
    {
        this.setState({canLikeButtonClick: false}, () =>
        {
            const {hasLiked, id} = this.state;
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
    };

    render()
    {
        const {title, content, type, time, hasLiked, like, canLikeButtonClick} = this.state;
        const {hasLoggedIn} = this.props;
        const contentHtml = markdownToHtml(content);
        const daysAfterSubmit = Math.floor((Date.now() - Date.parse(time)) / (24 * 60 * 60 * 1000));
        return (
            <div className={style.Article}>
                <div className={style.articleTitle}>{title}</div>
                {hasLoggedIn ? <div className={style.articleBtnWrapper}>
                    <button className={`${style.articleModifyBtn}`}
                            onClick={this.onModifyButtonClick}>编辑
                    </button>
                    <button className={`${style.articleDeleteBtn}`}
                            onClick={this.onDeleteButtonClick}>删除
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
                                    onClick={canLikeButtonClick ? this.onLikeButtonClick : null}
                                    hasClicked={hasLiked}/>
                </div>
                <div className={style.articleFooter}>
                    <div
                        className={style.timeWarning}>本文发表于 {daysAfterSubmit >= 0 ? daysAfterSubmit : 0} 天前，其内容可能已不具有时效性，请谨慎阅读。
                    </div>
                    <div className={style.copyRightWarning}>原创文章，转载请注明出处。禁止任何形式的商业使用。</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {hasLoggedIn} = state.Login;
    return {
        hasLoggedIn
    };
};


export default connect(mapStateToProps)(Article);
