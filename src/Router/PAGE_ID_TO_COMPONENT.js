import PAGE_ID from './PAGE_ID';
// 导入所有 View
import {View as Root} from '../Pages/Root';
import {View as Login} from '../Pages/Login';
import {View as ArticleEditor} from '../Pages/ArticleEditor';
import {View as Blog} from '../Pages/Blog';
import {View as SoulikeDrive} from '../Pages/SoulikeDrive';
import {View as Options} from '../Pages/Options';
import {View as AboutMe} from '../Pages/AboutMe';
import {View as SoulikeDriveFileList} from '../Pages/SoulikeDrive/Components/FileList';
import {View as SoulikeDriveFileUploader} from '../Pages/SoulikeDrive/Components/FileUploader';
import {View as HashGenerator} from '../Pages/HashGenerator';
import {View as Base64Converter} from '../Pages/Base64Converter';
import {View as Article} from '../Pages/Article';

export default {
    [PAGE_ID.ROOT]: Root,
    [PAGE_ID.LOGIN]: Login,
    [PAGE_ID.ABOUT_ME]: AboutMe,
    [PAGE_ID.OPTIONS]: Options,
    [PAGE_ID.DYNAMIC]: null,

    [PAGE_ID.BLOG.ROOT]: Blog,
    [PAGE_ID.BLOG.ARTICLE]: Article,
    [PAGE_ID.BLOG.ARTICLE_EDITOR]: ArticleEditor,

    [PAGE_ID.TOOL.ROOT]: Root,
    [PAGE_ID.TOOL.HASH_GENERATOR]: HashGenerator,
    [PAGE_ID.TOOL.BASE64_CONVERTER]: Base64Converter,

    [PAGE_ID.APPLICATION.ROOT]: SoulikeDrive,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.ROOT]: SoulikeDrive,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_LIST]: SoulikeDriveFileList,
    [PAGE_ID.APPLICATION.SOULIKE_DRIVE.FILE_UPLOAD]: SoulikeDriveFileUploader,
};