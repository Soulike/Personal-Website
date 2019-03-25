export default {
    ROOT: Symbol('ROOT'),
    LOGIN: Symbol('login'),
    ABOUT_ME: Symbol('aboutMe'),
    OPTIONS: Symbol('options'),
    DYNAMIC: Symbol('dynamic'),

    BLOG: {
        ROOT: Symbol('blog'),
        ARTICLE: Symbol('article'),
        ARTICLE_EDITOR: Symbol('articleEditor'),
    },

    TOOL: {
        ROOT: Symbol('tool'),
        HASH_GENERATOR: Symbol('hashGenerator'),
        BASE64_CONVERTER: Symbol('base64Converter'),
    },

    APPLICATION: {
        ROOT: Symbol('application'),
        SOULIKE_DRIVE: {
            ROOT: Symbol('soulikeDrive'),
            FILE_LIST: Symbol('fileList'),
            FILE_UPLOAD: Symbol('fileUpload'),
        },
    },
};