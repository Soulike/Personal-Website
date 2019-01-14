const Blog = {
    PROFILE_CARD: {
        IMAGE_FILE_NAME: 'profileCardImageFileName'
    },

    AMOUNTS: {
        SAYING: 'sayingAmount',
        ARTICLE: 'articleAmount',
        COMMENT: 'commentAmount',
        VIEW: 'viewAmount',
        LIKE: 'likeAmount'
    },

    ARTICLE: {
        ID: 'articleId',
        TITLE: 'articleTitle',
        CONTENT: 'articleContent',
        TYPE_ID: 'articleTypeId',
        TYPE: 'articleType',
        CREATED_AT: 'articleCreatedAt',
        UPDATED_AT: 'articleUpdatedAt'
    },

    ARTICLE_TYPE: {
        ID: 'articleTypeId',
        NAME: 'articleType'
    },

    ARTICLE_FUNCTION: {
        IS_ADD_LIKE: 'isAddLike'
    },

    ARTICLE_LIST: {
        NAME: 'articleList',
        CURRENT_PAGE: 'currentPage',
        POPULAR_ARTICLE_LIST: {
            NAME: 'popularArticleList',
            ORDERED_BY_VIEW_AMOUNT_LIST: 'orderedByViewAmountList',
            ORDERED_BY_LIKE_AMOUNT_LIST: 'orderedByLikeAmountList',
            ORDERED_BY_COMMENT_AMOUNT_LIST: 'orderedByCommentAmountList'
        }
    }
};

module.exports = Blog;
