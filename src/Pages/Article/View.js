import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {View as Alert} from '../../Components/Alert';
import Functions from '../../Functions';
import {View as FunctionButton} from './Components/ArticleFunctionButton';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Article.module.scss';
import {View as Modal} from '../../Components/Modal';
import {Types as ReminderTypes, View as Reminder} from '../../Components/Reminder';
import NAMESPACE from '../../Namespace';
import RequestProcessors from '../../RequestProcessor';

const {isInLikedList, markdownToHtml, generateFullTimeString} = Functions;

class Article extends Component
{
    constructor()
    {
        super(...arguments);
        const date = new Date();
        this.state = {
            [NAMESPACE.BLOG.ARTICLE.ID]: 0,
            [NAMESPACE.BLOG.ARTICLE.TITLE]: 'Loading……',
            [NAMESPACE.BLOG.ARTICLE.CONTENT]: 'Loading……',
            [NAMESPACE.BLOG.ARTICLE.TYPE_NAME]: 'Loading……',
            [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: 0,
            [NAMESPACE.BLOG.AMOUNT.LIKE]: 0,
            [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: date.toISOString(),
            [NAMESPACE.BLOG.ARTICLE.UPDATED_AT]: date.toISOString(),
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
            RequestProcessors.sendGetArticleRequest.apply(this);
            this.setState({hasLiked: isInLikedList(articleId)});
        }
    }

    onModifyButtonClick = (e) =>
    {
        e.preventDefault();
        const {[NAMESPACE.BLOG.ARTICLE.ID]: articleId} = this.state;
        if (articleId !== 0)
        {
            const {
                [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
                [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
                [NAMESPACE.BLOG.ARTICLE.CONTENT]: articleContent,
                [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId
            } = this.state;
            sessionStorage.setItem('articleTitle', articleTitle);
            sessionStorage.setItem('articleContent', articleContent);
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
        const {[NAMESPACE.BLOG.ARTICLE.ID]: articleId} = this.state;
        if (articleId !== 0)
        {
            const {[NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle} = this.state;
            Modal.show('删除确认', `确认要删除文章《${articleTitle}》吗？`, () =>
            {
                RequestProcessors.sendPostDeleteArticleRequest.apply(this);
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
            RequestProcessors.sendPostLikeArticleRequest.apply(this);
        });
    };

    render()
    {
        const {
            [NAMESPACE.BLOG.ARTICLE.TITLE]: title,
            [NAMESPACE.BLOG.ARTICLE.CONTENT]: content,
            [NAMESPACE.BLOG.ARTICLE.TYPE_NAME]: articleType,
            [NAMESPACE.BLOG.ARTICLE.CREATED_AT]: createdAt,
            [NAMESPACE.BLOG.ARTICLE.UPDATED_AT]: updatedAt,
            hasLiked,
            [NAMESPACE.BLOG.AMOUNT.LIKE]: like,
            canLikeButtonClick
        } = this.state;
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
                    <div className={style.articleTime}>{generateFullTimeString(createdAt)}</div>
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
