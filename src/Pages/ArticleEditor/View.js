import React, {Component} from 'react';
import {getAsync, postAsync, requestPrefix} from '../../Static/functions';
import {View as Alert} from '../../Components/Alert';
import {View as Title} from '../../Components/Title';
import './ArticleEditor.css';

class ArticleEditor extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            title: '',
            content: '',
            typeId: 0,
            allTypes: []
        };
    }

    componentDidMount()
    {
        const title = sessionStorage.getItem('title');
        const content = sessionStorage.getItem('content');
        if (title)
        {
            this.setState({title});
            this.refs.title.value = title;
        }
        if (content)
        {
            this.setState({content});
            this.refs.content.value = content;
        }

        getAsync(requestPrefix('/blog/getArticleTypes'))
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({allTypes: data});
                }
                else
                {
                    Alert.show(msg, false);
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
        this.setState({content: e.target.value});
        sessionStorage.setItem('content', e.target.value);
    };

    onTypeChange = (e) =>
    {
        this.setState({typeId: e.target.value});
    };

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {title, content, typeId} = this.state;
        if (!title)
        {
            Alert.show('请填写标题', false);
        }
        else if (!content)
        {
            Alert.show('请填写正文', false);
        }
        else if (!parseInt(typeId))
        {
            Alert.show('请选择分类', false);
        }
        else
        {
            postAsync(requestPrefix('/blog/submitArticle'), {
                title,
                content: btoa(content),
                typeId
            })
                .then(res =>
                {
                    const {isSuccess, msg} = res;
                    Alert.show(msg, isSuccess);
                    sessionStorage.removeItem('title');
                    sessionStorage.removeItem('content');
                    this.setState({
                        title: '',
                        content: ''
                    });
                    this.refs.title.value = '';
                    this.refs.content.value = '';
                })
                .catch(e =>
                {
                    Alert.show('文章提交失败', false);
                    console.log(e);
                });
        }
    };

    render()
    {
        return (
            <div className={'ArticleEditor'}>
                <Title titleText={'编辑文章'}/>
                <input type="text"
                       className={'articleTitle'}
                       placeholder={'文章标题'}
                       ref={'title'}
                       onChange={this.onTitleChange}/>
                <textarea className={'articleContent'}
                          placeholder={'文章正文（使用 MarkDown）'}
                          ref={'content'}
                          onChange={this.onContentChange}/>
                <div className={'articleTypeSelectWrapper'}>
                    <select className={'articleTypeSelect'} onChange={this.onTypeChange}>
                        <option value="0" defaultChecked={true}>选择文章分类</option>
                        {this.state.allTypes.map(type =>
                        {
                            const {id, name} = type;
                            return <option value={id} key={id}>{name}</option>;
                        })}
                    </select>
                </div>
                <div className={'articleButtonWrapper'}>
                    <button className={'articleSubmitBtn btn btn-primary btn-lg'} onClick={this.onSubmit}>提交</button>
                </div>
            </div>
        );
    }

}

export default ArticleEditor;
