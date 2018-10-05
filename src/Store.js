import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {ARTICLE_TYPE} from './Static/constants';
import {Reducer as SoulikeDriveReducer} from './Pages/SoulikeDrive';
import {Reducer as BlogReducer} from './Pages/Blog';
import {Reducer as DynamicReducer} from './Pages/Dynamic';
import {Reducer as MusicPlayerReducer} from './Pages/MusicPlayer';
import {Reducer as OptionsReducer} from './Pages/Options';
import {Reducer as BannerReducer} from './Pages/Root/Components/Banner';
import {Reducer as FileListReducer} from './Pages/SoulikeDrive/Components/RightArea/Components/FileList';
import {Reducer as AuthProcessorReducer} from './Components/AuthProcessor';
import {Reducer as TypeSelectBarReducer} from './Pages/Blog/Components/MidPart/Components/TypeSelectBar';
import {Reducer as MostPopularCardReducer} from './Pages/Blog/Components/RightPart/Components/MostPopularCard';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    SoulikeDrive: {
        currentActiveTabId: 0
    },
    Blog: {
        nickname: '',
        avatar: ''
    },
    TypeSelectBar: {
        selectedArticleTypeId: ARTICLE_TYPE.ALL,
        fileList: []
    },
    Dynamic: {},
    MusicPlayer: {},
    Options: {},
    Banner: {
        bannerBackground: ''
    },
    FileList: {
        fileList: [],
        selectedFileList: []
    },
    AuthProcessor: {hasLoggedIn: false},
    MostPopularCard: {
        currentTypeId: 0
    }
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares)
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    SoulikeDrive: SoulikeDriveReducer,
    Blog: BlogReducer,
    TypeSelectBar: TypeSelectBarReducer,
    Dynamic: DynamicReducer,
    MusicPlayer: MusicPlayerReducer,
    Options: OptionsReducer,
    Banner: BannerReducer,
    FileList: FileListReducer,
    AuthProcessor: AuthProcessorReducer,
    MostPopularCard: MostPopularCardReducer
});

export default createStore(Reducer, initValues, storeEnhancers);
