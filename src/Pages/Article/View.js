import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {View as Alert} from '../../Components/Alert';
import {requestPrefix} from '../../Static/Functions/Url';
import {appendScriptNodeByCode, appendScriptNodeByUrl, prefixZero} from '../../Static/Functions/Util';
import {appendToLikedList, isInLikedList, removeFromLikedList, submitLikeAsync} from '../../Static/Functions/Like';
import {getAsync, postAsync} from '../../Static/Functions/Net';
import {markdownToHtml} from '../../Static/Functions/MDConverter';
import highLight from 'highlight.js';
import {View as FunctionButton} from './Components/ArticleFunctionButton';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Article.module.scss';
import {STATUS_CODE} from '../../Static/Constants';
import {redirectToLogin} from '../Login/Functions';
import {View as Modal} from '../../Components/Modal';
import {Types as ReminderTypes, View as Reminder} from '../../Components/Reminder';

class Article extends Component
{
    constructor()
    {
        super(...arguments);
        const date = new Date();
        this.state = {
            articleId: 0,
            title: 'Loading……',
            content: 'Loading……',
            articleType: 'Loading……',
            articleTypeId: 0,
            like: 0,
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
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
                            appendScriptNodeByCode(`MathJax.Hub.Config({tex2jax: {inlineMath: [ ['$','$']],displayMath: [ ['$$','$$']]}});`, 'text/x-mathjax-config');
                            appendScriptNodeByUrl('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_HTMLorMML');
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
        if (this.state.articleId !== 0)
        {
            const {articleId, title, content, articleTypeId} = this.state;
            sessionStorage.setItem('title', title);
            sessionStorage.setItem('content', content);
            sessionStorage.setItem('articleTypeId', articleTypeId);
            browserHistory.push(`/articleEditor?modify=${true}&articleId=${articleId}`);
        }
        else
        {
            Alert.show('文章不存在', false);
        }
    };

    onDeleteButtonClick = (e) =>
    {
        e.preventDefault();
        const {articleId} = this.state;
        if (articleId !== 0)
        {
            const {title} = this.state;
            Modal.show('删除确认', `确认要删除文章《${title}》吗？`, () =>
            {
                postAsync(requestPrefix('/blog/deleteArticle'), {articleId})
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
            const {hasLiked, articleId} = this.state;
            submitLikeAsync(articleId, !hasLiked)
                .then(res =>
                {
                    const {statusCode, data} = res;
                    const {like} = data;
                    if (statusCode === STATUS_CODE.SUCCESS)
                    {
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
    };

    render()
    {
        const {title, content, articleType, createdAt, updatedAt, hasLiked, like, canLikeButtonClick} = this.state;
        const {hasLoggedIn} = this.props;
        const contentHtml = markdownToHtml(content);
        const daysAfterModification = Math.floor((Date.now() - Date.parse(updatedAt)) / (24 * 60 * 60 * 1000));
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
                    <div className={style.articleTime}>{this.generateTimeString(createdAt)}</div>
                    <div className={style.articleType}>{articleType}</div>
                </div>
                {
                    daysAfterModification > 30 ?
                        <div className={style.timelinessReminderWrapper}>
                            <Reminder type={ReminderTypes.WARNING}>
                                本文章最后编辑于 {daysAfterModification} 天前，其内容可能已不具有时效性，请谨慎阅读。
                            </Reminder>
                        </div> : null
                }
                <div className={style.articleContent} dangerouslySetInnerHTML={{__html: contentHtml}}/>
                <div className={style.articleFunctionButtonWrapper}>
                    <FunctionButton icon={solidIcon.faThumbsUp}
                                    number={like}
                                    onClick={canLikeButtonClick ? this.onLikeButtonClick : null}
                                    hasClicked={hasLiked}/>
                </div>
                <div className={style.articleFooter}>
                    <Reminder type={ReminderTypes.TIP}>
                        本站作品采用
                        <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                            知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
                        </a>进行许可。
                        <div>文章内容仅供参考，本人不对内容的正确性做出任何保证。</div>
                    </Reminder>
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
