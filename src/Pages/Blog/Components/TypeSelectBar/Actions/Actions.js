import * as ActionTypes from './ActionTypes';

export function switchArticleType(articleTypeId)
{
    return {
        type: ActionTypes.SWITCH_ARTICLE_TYPE,
        articleTypeId
    };
}
