import {View as Root} from '../Pages/Root';
import {View as Login} from '../Pages/Login';
import {View as AboutMe} from '../Pages/AboutMe';
import {View as Options} from '../Pages/Options';
import {View as Blog} from '../Pages/Blog';
import {View as Article} from '../Pages/Article';
import {View as ArticleEditor} from '../Pages/ArticleEditor';
import {View as HashGenerator} from '../Pages/HashGenerator';
import {View as Base64Converter} from '../Pages/Base64Converter';
import {View as SoulikeDrive} from '../Pages/SoulikeDrive';
import {View as SoulikeDriveFileList} from '../Pages/SoulikeDrive/Components/FileList';
import {View as SoulikeDriveFileUploader} from '../Pages/SoulikeDrive/Components/FileUploader';

export const PAGE_ID = {
    INDEX: Symbol('INDEX'),

    ROOT: {
        LOGIN: Symbol('login'),
        ABOUT_ME: Symbol('aboutMe'),
        OPTIONS: Symbol('options'),
        DYNAMIC: Symbol('dynamic'),
    },

    BLOG: {
        INDEX: Symbol('blog'),
        ARTICLE: Symbol('article'),
        ARTICLE_EDITOR: Symbol('articleEditor'),
    },

    TOOL: {
        INDEX: Symbol('tool'),
        HASH_GENERATOR: Symbol('hashGenerator'),
        BASE64_CONVERTER: Symbol('base64Converter'),
    },

    APPLICATION: {
        INDEX: Symbol('application'),
        SOULIKE_DRIVE: {
            INDEX: Symbol('soulikeDrive'),
            FILE_LIST: Symbol('fileList'),
            FILE_UPLOAD: Symbol('fileUpload'),
        },
    },
};

export const PAGE_ID_TO_COMPONENT = {
    [PAGE_ID.INDEX]: Root,
    [PAGE_ID.ROOT.LOGIN]: Login,
    [PAGE_ID.ROOT.ABOUT_ME]: AboutMe,
    [PAGE_ID.ROOT.OPTIONS]: Options,
    [PAGE_ID.ROOT.DYNAMIC]: null,

    [PAGE_ID.BLOG.INDEX]: Blog,
    [PAGE_ID.BLOG.ARTICLE]: Article,
    [PAGE_ID.BLOG.ARTICLE_EDITOR]: ArticleEditor,

    [PAGE_ID.TOOL.INDEX]: Root,
    [PAGE_ID.TOOL.HASH_GENERATOR]: HashGenerator,
    [PAGE_ID.TOOL.BASE64_CONVERTER]: Base64Converter,

    [PAGE_ID.APPLICATION.INDEX]: SoulikeDrive,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]: SoulikeDrive,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_LIST]: SoulikeDriveFileList,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_UPLOAD]: SoulikeDriveFileUploader,
};

export const PAGE_ID_TO_ROUTE = {
    [PAGE_ID.INDEX]: '/',
    [PAGE_ID.ROOT.LOGIN]: '/login',
    [PAGE_ID.ROOT.ABOUT_ME]: '/aboutMe',
    [PAGE_ID.ROOT.OPTIONS]: '/options',
    [PAGE_ID.ROOT.DYNAMIC]: '/dynamic',

    [PAGE_ID.BLOG.INDEX]: '/blog',
    [PAGE_ID.BLOG.ARTICLE]: '/blog/article',
    [PAGE_ID.BLOG.ARTICLE_EDITOR]: '/blog/article',

    [PAGE_ID.TOOL.INDEX]: '/tool',
    [PAGE_ID.TOOL.HASH_GENERATOR]: '/tool/hashGenerator',
    [PAGE_ID.TOOL.BASE64_CONVERTER]: '/tool/base64Converter',

    [PAGE_ID.APPLICATION.INDEX]: '/application',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]: '/application/soulikeDrive',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_LIST]: '/application/soulikeDrive/fileList',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_UPLOAD]: '/application/soulikeDrive/fileUpload',
};

export const PAGE_ID_TO_LOGIN_REQUIREMENT = {
    [PAGE_ID.INDEX]: false,
    [PAGE_ID.ROOT.LOGIN]: false,
    [PAGE_ID.ROOT.ABOUT_ME]: false,
    [PAGE_ID.ROOT.OPTIONS]: true,
    [PAGE_ID.ROOT.DYNAMIC]: true,

    [PAGE_ID.BLOG.INDEX]: false,
    [PAGE_ID.BLOG.ARTICLE]: false,
    [PAGE_ID.BLOG.ARTICLE_EDITOR]: true,

    [PAGE_ID.TOOL.INDEX]: false,
    [PAGE_ID.TOOL.HASH_GENERATOR]: false,
    [PAGE_ID.TOOL.BASE64_CONVERTER]: false,

    [PAGE_ID.APPLICATION.INDEX]: true,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]: true,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_LIST]: true,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_UPLOAD]: true,

};