import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import highLight from 'highlight.js';
import {getAsync, postAsync} from '../../Static/Functions/Net';
import {markdownToHtml} from '../../Static/Functions/MDConverter';
import {requestPrefix} from '../../Static/Functions/Url';
import {View as Alert} from '../../Components/Alert';
import {View as Title} from '../../Components/Title';
import style from './ArticleEditor.module.scss';
import {STATUS_CODE} from '../../Static/Constants';
import {redirectToLogin} from '../Login/Functions';
import NAMESPACE from '../../Namespace';

class ArticleEditor extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.ARTICLE.TITLE]: '',
            [NAMESPACE.BLOG.ARTICLE.CONTENT]: '',
            [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: 0,
            [NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: [],
            previewHTML: ''
        };
    }

    componentDidMount()
    {
        document.title = '文章编辑器 - Soulike 的个人网站';
        const articleTitle = sessionStorage.getItem(NAMESPACE.BLOG.ARTICLE.TITLE);
        const articleContent = sessionStorage.getItem(NAMESPACE.BLOG.ARTICLE.CONTENT);
        const articleTypeId = sessionStorage.getItem(NAMESPACE.BLOG.ARTICLE.TYPE_ID);
        if (articleTitle)
        {
            this.setState({[NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle});
            const $articleTitle = document.querySelector(`.${style.articleTitle}`);
            $articleTitle.value = articleTitle;
        }
        if (articleContent)
        {
            this.setState({
                [NAMESPACE.BLOG.ARTICLE.CONTENT]: articleContent,
                previewHTML: markdownToHtml(articleContent)
            }, () =>
            {
                highLight.initHighlighting();
            });
            const $articleContent = document.querySelector(`.${style.articleContent}`);
            $articleContent.value = articleContent;
        }
        if (articleTypeId)
        {
            this.setState({
                [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId
            });
        }

        getAsync(requestPrefix('/blog/getArticleTypes'), false)
            .then(res =>
            {
                const {statusCode, data} = res;
                const {[NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypes} = data;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({
                        [NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypes
                    });
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取文章类型失败', false);
                console.log(e);
            });
    }

    onTitleChange = (e) =>
    {
        this.setState({[NAMESPACE.BLOG.ARTICLE.TITLE]: e.target.value});
        sessionStorage.setItem(NAMESPACE.BLOG.ARTICLE.TITLE, e.target.value);
    };

    onContentChange = (e) =>
    {
        this.setState({
            [NAMESPACE.BLOG.ARTICLE.CONTENT]: e.target.value,
            previewHTML: markdownToHtml(e.target.value)
        }, () =>
        {
            const blocks = [...document.querySelectorAll('pre code')];
            blocks.forEach(block =>
            {
                highLight.highlightBlock(block);
            });
        });
        sessionStorage.setItem(NAMESPACE.BLOG.ARTICLE.CONTENT, e.target.value);
    };

    onTypeChange = (e) =>
    {
        this.setState({[NAMESPACE.BLOG.ARTICLE.TYPE_ID]: e.target.value});
        sessionStorage.setItem(NAMESPACE.BLOG.ARTICLE.TYPE_ID, e.target.value);
    };

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {
            [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
            [NAMESPACE.BLOG.ARTICLE.CONTENT]: articleContent,
            [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId
        } = this.state;

        const articleId = this.props.location.query.articleId ? this.props.location.query.articleId : 0;

        if (!articleTitle)
        {
            Alert.show('请填写标题', false);
        }
        else if (!articleContent)
        {
            Alert.show('请填写正文', false);
        }
        else if (!parseInt(articleTypeId, 10))
        {
            Alert.show('请选择分类', false);
        }
        else
        {
            if (Object.is(parseInt(articleId, 10), NaN))
            {
                Alert.show('要修改的文章不存在', false);
            }
            else
            {
                postAsync(requestPrefix('/blog/submitArticle'), {
                    [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
                    [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
                    [NAMESPACE.BLOG.ARTICLE.CONTENT]: articleContent,
                    [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId
                })
                    .then(res =>
                    {
                        const {statusCode, data} = res;
                        if (statusCode === STATUS_CODE.SUCCESS)
                        {
                            if (articleId === 0)
                            {
                                Alert.show('提交成功', true);
                            }
                            else
                            {
                                Alert.show('修改成功', true);
                            }

                            sessionStorage.removeItem(NAMESPACE.BLOG.ARTICLE.TYPE_ID);
                            sessionStorage.removeItem(NAMESPACE.BLOG.ARTICLE.TITLE);
                            sessionStorage.removeItem(NAMESPACE.BLOG.ARTICLE.CONTENT);

                            this.setState({
                                [NAMESPACE.BLOG.ARTICLE.TITLE]: '',
                                [NAMESPACE.BLOG.ARTICLE.CONTENT]: '',
                                [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: 0
                            });

                            const $articleTitle = document.querySelector(`.${style.articleTitle}`);
                            const $articleContent = document.querySelector(`.${style.articleContent}`);
                            $articleTitle.value = '';
                            $articleContent.value = '';

                            const {[NAMESPACE.BLOG.ARTICLE.ID]: respondArticleId} = data;
                            setTimeout(() =>
                            {
                                browserHistory.push(`/article?articleId=${respondArticleId}`);
                            }, 1000);
                        }
                        else if (statusCode === STATUS_CODE.WRONG_PARAMETER)
                        {
                            Alert.show('请求参数无效', false);
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
                        Alert.show('文章提交失败', false);
                        console.log(e);
                    });
            }
        }
    };

    render()
    {
        const {
            [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId,
            [NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypeList,
            previewHTML
        } = this.state;
        return (
            <div className={style.ArticleEditor}>
                <Title titleText={'编辑文章'}/>
                <input type="text"
                       className={style.articleTitle}
                       placeholder={'文章标题'}
                       onChange={this.onTitleChange}/>
                <textarea className={style.articleContent}
                          placeholder={'文章正文（使用 MarkDown）'}
                          onChange={this.onContentChange}/>
                <div className={style.articlePreview} dangerouslySetInnerHTML={{__html: previewHTML}}/>
                <div className={style.articleTypeSelectWrapper}>
                    <select className={style.articleTypeSelect} value={articleTypeId} onChange={this.onTypeChange}>
                        <option value="0" defaultChecked={true}>选择文章分类</option>
                        {articleTypeList.map(type =>
                        {
                            const {
                                [NAMESPACE.BLOG.ARTICLE_TYPE.ID]: id,
                                [NAMESPACE.BLOG.ARTICLE_TYPE.NAME]: name
                            } = type;
                            return <option value={id} key={id}>{name}</option>;
                        })}
                    </select>
                </div>
                <div className={style.articleButtonWrapper}>
                    <button className={`${style.articleSubmitBtn}`}
                            onClick={this.onSubmit}>提交
                    </button>
                </div>
            </div>
        );
    }

}

export default ArticleEditor;
