import {STATUS_CODE} from '../../Static/Constants';
import {View as Alert} from '../../Components/Alert';
import {
    DELETE_ARTICLE,
    GET_ARTICLE,
    GET_ARTICLE_LIST,
    GET_ARTICLE_TYPES,
    GET_POPULAR_LIST,
    GET_PROFILE_CARD_INFO,
    LIKE_ARTICLE,
    SUBMIT_ARTICLE,
} from './Routes';
import NAMESPACE from '../../Namespace';
import style from '../../Pages/ArticleEditor/ArticleEditor.module.scss';
import {browserHistory} from 'react-router';
import {redirectToLogin} from '../../Pages/Login/Functions';
import highLight from '../../ModuleConfig/highlight';
import Functions from '../../Functions';

const {appendToLikedList, isInLikedList, removeFromLikedList, getAsync, postAsync, appendScriptNodeByCode, appendScriptNodeByUrl} = Functions;

export default {
    sendGetProfileCardInfoRequest,
    sendPostSubmitArticleRequest,
    sendGetArticleListRequest,
    sendGetArticleTypesRequest,
    sendGetArticleRequest,
    sendPostDeleteArticleRequest,
    sendPostLikeArticleRequest,
    sendGetPopularListRequest
};

function sendGetProfileCardInfoRequest()
{
    getAsync(GET_PROFILE_CARD_INFO, true)
        .then(res =>
        {
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('资料卡信息获取失败', false);
            console.log(e);
        });
}

function sendPostSubmitArticleRequest()
{
    const {
        [NAMESPACE.BLOG.ARTICLE.TITLE]: articleTitle,
        [NAMESPACE.BLOG.ARTICLE.CONTENT]: articleContent,
        [NAMESPACE.BLOG.ARTICLE.TYPE_ID]: articleTypeId
    } = this.state;

    const articleId = this.props.location.query.articleId ? this.props.location.query.articleId : 0;

    postAsync(SUBMIT_ARTICLE, {
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

function sendGetArticleListRequest()
{
    const {[NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: currentPage} = this.state;
    const {selectedArticleTypeId: articleTypeId} = this.props;
    getAsync(GET_ARTICLE_LIST, false, {
        articleTypeId,
        currentPage
    })
        .then(res =>
        {
            const {statusCode, data} = res;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                const {[NAMESPACE.BLOG.LIST.ARTICLE]: articleList} = data;
                if (articleList.length !== 0)// 如果有数据就更新数据
                {
                    this.setState({
                        [NAMESPACE.BLOG.LIST.ARTICLE]: [...this.state[NAMESPACE.BLOG.LIST.ARTICLE], ...articleList]
                    });
                }
                else// 如果服务器返回列表为空，那就下一次没必要再发送任何请求，设置标志为true
                {
                    this.setState({hasReachedListEnd: true});
                }
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取文章列表失败', false);
            console.log(e);
        });
}

function sendGetArticleTypesRequest()
{
    getAsync(GET_ARTICLE_TYPES, false)
        .then(res =>
        {
            const {statusCode, data} = res;
            const {[NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypes} = data;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                this.setState({[NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypes});
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

function sendGetArticleRequest()
{
    const {articleId} = this.props.location.query;
    getAsync(GET_ARTICLE, true, {[NAMESPACE.BLOG.ARTICLE.ID]: articleId})
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
                document.title = `${data[NAMESPACE.BLOG.ARTICLE.TITLE]} - Soulike 的个人网站`;
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
}

function sendPostDeleteArticleRequest()
{
    const {[NAMESPACE.BLOG.ARTICLE.ID]: articleId} = this.state;
    postAsync(DELETE_ARTICLE, {[NAMESPACE.BLOG.ARTICLE.ID]: articleId})
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
}

function sendPostLikeArticleRequest()
{
    const {hasLiked, [NAMESPACE.BLOG.ARTICLE.ID]: articleId} = this.state;
    postAsync(LIKE_ARTICLE, {
        [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
        [NAMESPACE.BLOG.ARTICLE_FUNCTION.IS_ADD_LIKE]: !hasLiked
    })
        .then(res =>
        {
            const {statusCode, data} = res;
            const {[NAMESPACE.BLOG.AMOUNT.LIKE]: likeAmount} = data;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                this.setState({
                    [NAMESPACE.BLOG.AMOUNT.LIKE]: parseInt(likeAmount, 10),
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
}

function sendGetPopularListRequest()
{
    getAsync(GET_POPULAR_LIST)
        .then(res =>
        {
            const {statusCode, data} = res;
            const {[NAMESPACE.BLOG.LIST.POPULAR_ARTICLE]: popularArticleList} = data;
            if (statusCode === STATUS_CODE.SUCCESS)
            {
                this.setState({...popularArticleList});
            }
            else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            console.log(e);
            Alert.show('获取文章排名信息失败', false);
        });
}
