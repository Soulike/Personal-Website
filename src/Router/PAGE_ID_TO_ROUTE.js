import PAGE_ID from './PAGE_ID';

export default {
    [PAGE_ID.ROOT]: '/',
    [PAGE_ID.LOGIN]: '/login',
    [PAGE_ID.ABOUT_ME]: '/aboutMe',
    [PAGE_ID.OPTIONS]: '/options',
    [PAGE_ID.DYNAMIC]: '/dynamic',

    [PAGE_ID.BLOG.ROOT]: '/blog',
    [PAGE_ID.BLOG.ARTICLE]: '/blog/article',
    [PAGE_ID.BLOG.ARTICLE_EDITOR]: '/blog/article',

    [PAGE_ID.TOOL.ROOT]: '/tool',
    [PAGE_ID.TOOL.HASH_GENERATOR]: '/tool/hashGenerator',
    [PAGE_ID.TOOL.BASE64_CONVERTER]: '/tool/base64Converter',

    [PAGE_ID.APPLICATION.ROOT]: '/application',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.ROOT]: '/application/soulikeDrive',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_LIST]: '/application/soulikeDrive/fileList',
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_UPLOAD]: '/application/soulikeDrive/fileUpload',
};