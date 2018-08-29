import * as ActionTypes from './ActionTypes';

export function getArticleList(articleTypeId)
{

}

export function switchArticleType(articleTypeId)
{
    return {
        type: ActionTypes.SWITCH_ARTICLE_TYPE,
        articleTypeId
    };
}

export function getArticlesSuccess(articleList)
{
    return {
        type: ActionTypes.GET_ARTICLES_SUCCESS,
        articleList
    };
}

export function getArticlesFailed()
{
    return {
        type: ActionTypes.GET_ARTICLES_FAILED
    };
}
