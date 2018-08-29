import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    if (action.type === ActionTypes.SWITCH_ARTICLE_TYPE)
    {
        return {
            ...state,
            selectedArticleTypeId: action.articleTypeId
        };
    }
    else
    {
        return state;
    }
}
