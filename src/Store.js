import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {ARTICLE_TYPE} from './Static/Constants';
import {Reducer as SoulikeDriveReducer} from './Pages/SoulikeDrive';
import {Reducer as LoginReducer} from './Pages/Login';
import {Reducer as BlogReducer} from './Pages/Blog';
import {Reducer as DynamicReducer} from './Pages/Dynamic';
import {Reducer as MusicPlayerReducer} from './Pages/MusicPlayer';
import {Reducer as BannerReducer} from './Pages/Root/Components/Banner';
import {Reducer as FileListReducer} from './Pages/SoulikeDrive/Components/FileList';
import {Reducer as TypeSelectBarReducer} from './Pages/Blog/Components/TypeSelectBar';
import {Reducer as MostPopularCardReducer} from './Pages/Blog/Components/MostPopularCard';
import NAMESPACE from './Namespace';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    SoulikeDrive: {
        currentActiveTabId: 0,
    },
    Blog: {
        [NAMESPACE.SHARE.INFO.NICKNAME]: '',
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: '',
        [NAMESPACE.SHARE.INFO.MOTTO]: '',
    },
    TypeSelectBar: {
        selectedArticleTypeId: ARTICLE_TYPE.ALL,
    },
    Dynamic: {},
    MusicPlayer: {},
    Banner: {
        bannerImageFileUrl: '',
    },
    FileList: {
        [NAMESPACE.SOULIKE_DRIVE.LIST.FILE]: [],
        selectedFileList: [],
    },
    Login: {
        hasLoggedIn: false,
    },
    MostPopularCard: {
        currentTypeId: 0,
    },
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares),
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    SoulikeDrive: SoulikeDriveReducer,
    Blog: BlogReducer,
    Login: LoginReducer,
    TypeSelectBar: TypeSelectBarReducer,
    Dynamic: DynamicReducer,
    MusicPlayer: MusicPlayerReducer,
    Banner: BannerReducer,
    FileList: FileListReducer,
    MostPopularCard: MostPopularCardReducer,
});

export default createStore(Reducer, initValues, storeEnhancers);
