import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Reducer as SoulikeDriveReducer} from './Pages/SoulikeDrive';
import {Reducer as ArticleEditorReducer} from './Pages/ArticleEditor';
import {Reducer as BlogReducer} from './Pages/Blog';
import {Reducer as DynamicReducer} from './Pages/Dynamic';
import {Reducer as MusicPlayerReducer} from './Pages/MusicPlayer';
import {Reducer as OptionsReducer} from './Pages/Options';
import {Reducer as BannerReducer} from './Pages/Root/Components/Banner';
import {Reducer as FileListReducer} from './Pages/SoulikeDrive/Components/RightArea/Components/FileList';
import {Reducer as AuthProcessorReducer} from './Components/AuthProcessor';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    SoulikeDrive: {
        currentActiveTabId: 0
    },
    ArticleEditor: {},
    Blog: {
        cardBackground: `url('https://i0.hdslb.com/bfs/archive/30d45ce269948eae8ed650e5ce03a2ca463a5d77.png')`,
        avatar: `url('https://i0.hdslb.com/bfs/face/b589846db75bbaa1a22a1bf51243158941996e2f.jpg')`
    },
    Dynamic: {},
    MusicPlayer: {},
    Options: {},
    Banner: {
        bannerBackground: `url('https://i0.hdslb.com/bfs/archive/30d45ce269948eae8ed650e5ce03a2ca463a5d77.png')`
    },
    FileList: {
        fileList: [],
        selectedFileList: []
    },
    AuthProcessor: {hasLoggedIn: false}
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares)
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    SoulikeDrive: SoulikeDriveReducer,
    ArticleEditor: ArticleEditorReducer,
    Blog: BlogReducer,
    Dynamic: DynamicReducer,
    MusicPlayer: MusicPlayerReducer,
    Options: OptionsReducer,
    Banner: BannerReducer,
    FileList: FileListReducer,
    AuthProcessor: AuthProcessorReducer
});

export default createStore(Reducer, initValues, storeEnhancers);
