import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import highLight from 'highlight.js';
import {getAsync, markdownToHtml, postAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import {View as Title} from '../../Components/Title';
import style from './ArticleEditor.module.scss';
import {STATUS_CODE} from '../../Static/Constants';
import {redirectToLogin} from '../Login/Functions';

class ArticleEditor extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            title: '',
            content: '',
            typeId: 0,
            allTypes: [],
            previewHTML: ''
        };
    }

    componentDidMount()
    {
        document.title = '文章编辑器 - Soulike 的个人网站';
        const title = sessionStorage.getItem('title');
        const content = sessionStorage.getItem('content');
        const typeId = sessionStorage.getItem('typeId');
        if (title)
        {
            this.setState({title});
            this.refs.title.value = title;
        }
        if (content)
        {
            this.setState({
                content,
                previewHTML: markdownToHtml(content)
            }, () =>
            {
                highLight.initHighlighting();
            });
            this.refs.content.value = content;
        }
        if (typeId)
        {
            this.setState({typeId});
        }

        getAsync(requestPrefix('/blog/getArticleTypes'), false)
            .then(res =>
            {
                const {statusCode, data} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({allTypes: data});
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
        this.setState({title: e.target.value});
        sessionStorage.setItem('title', e.target.value);
    };

    onContentChange = (e) =>
    {
        this.setState({
            content: e.target.value,
            previewHTML: markdownToHtml(e.target.value)
        }, () =>
        {
            const blocks = [...document.querySelectorAll('pre code')];
            blocks.forEach(block =>
            {
                highLight.highlightBlock(block);
            });
        });
        sessionStorage.setItem('content', e.target.value);
    };

    onTypeChange = (e) =>
    {
        this.setState({typeId: e.target.value});
        sessionStorage.setItem('typeId', e.target.value);
    };

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {title, content, typeId} = this.state;
        let {articleId} = this.props.location.query;

        if (!articleId)
        {
            articleId = 0;
        }

        if (!title)
        {
            Alert.show('请填写标题', false);
        }
        else if (!content)
        {
            Alert.show('请填写正文', false);
        }
        else if (!parseInt(typeId, 10))
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
                    id: articleId,
                    title,
                    content: content,
                    typeId
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

                            sessionStorage.removeItem('typeId');
                            sessionStorage.removeItem('title');
                            sessionStorage.removeItem('content');
                            this.setState({
                                typeId: 0,
                                title: '',
                                content: ''
                            });
                            this.refs.title.value = '';
                            this.refs.content.value = '';
                            setTimeout(() =>
                            {
                                browserHistory.push(`/article?articleId=${data}`);
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
        const {typeId, previewHTML} = this.state;
        return (
            <div className={style.ArticleEditor}>
                <Title titleText={'编辑文章'}/>
                <input type="text"
                       className={style.articleTitle}
                       placeholder={'文章标题'}
                       ref={'title'}
                       onChange={this.onTitleChange}/>
                <textarea className={style.articleContent}
                          placeholder={'文章正文（使用 MarkDown）'}
                          ref={'content'}
                          onChange={this.onContentChange}/>
                <div className={style.articlePreview} dangerouslySetInnerHTML={{__html: previewHTML}}/>
                <div className={style.articleTypeSelectWrapper}>
                    <select className={style.articleTypeSelect} value={typeId} onChange={this.onTypeChange}>
                        <option value="0" defaultChecked={true}>选择文章分类</option>
                        {this.state.allTypes.map(type =>
                        {
                            const {id, name} = type;
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
