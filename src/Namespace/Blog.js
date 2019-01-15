const Blog = {
    PROFILE_CARD: {
        IMAGE_FILE_NAME: 'profileCardImageFileName'
    },

    ARTICLE_LIST_CONTAINER: {
        CURRENT_PAGE: 'currentPage'
    },

    AMOUNT: {
        SAYING: 'sayingAmount',
        ARTICLE: 'articleAmount',
        COMMENT: 'commentAmount',
        VIEW: 'viewAmount',
        LIKE: 'likeAmount'
    },

    LIST: {
        ARTICLE: 'articleList',
        ARTICLE_TYPE: 'articleTypeList',
        POPULAR_ARTICLE: {
            toString()
            {
                return 'popularArticleList';
            },

            valueOf()
            {
                return 'popularArticleList';
            },

            ORDERED_BY_VIEW_AMOUNT: 'orderedByViewAmountList',
            ORDERED_BY_LIKE_AMOUNT: 'orderedByLikeAmountList',
            ORDERED_BY_COMMENT_AMOUNT: 'orderedByCommentAmountList'
        }
    },

    ARTICLE: {
        ID: 'articleId',
        TITLE: 'articleTitle',
        CONTENT: 'articleContent',
        TYPE_ID: 'articleTypeId',
        TYPE_NAME: 'articleTypeName',
        CREATED_AT: 'articleCreatedAt',
        UPDATED_AT: 'articleUpdatedAt'
    },

    ARTICLE_TYPE: {
        ID: 'articleTypeId',
        NAME: 'articleTypeName'
    },

    ARTICLE_FUNCTION: {
        IS_ADD_LIKE: 'isAddLike'
    }
};

module.exports = Blog;
