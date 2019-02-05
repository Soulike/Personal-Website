import React from 'react';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
// 所有页面的 View 在此处导入
import {View as Root} from './Pages/Root/';
import {Functions as LoginFunctions, View as Login} from './Pages/Login';
import {View as ArticleEditor} from './Pages/ArticleEditor';
//import {View as Dynamic} from './Pages/Dynamic';
import {View as Blog} from './Pages/Blog';
//import {View as MusicPlayer} from './Pages/MusicPlayer';
import {View as SoulikeDrive} from './Pages/SoulikeDrive';
import {View as Options} from './Pages/Options';
import {View as AboutMe} from './Pages/AboutMe';
import {View as SoulikeDriveFileList} from './Pages/SoulikeDrive/Components/FileList';
import {View as SoulikeDriveFileUploader} from './Pages/SoulikeDrive/Components/FileUploader';
import {View as HashGenerator} from './Pages/HashGenerator';
import {View as Base64Converter} from './Pages/Base64Converter';
import {View as Article} from './Pages/Article';

const {requireLogin} = LoginFunctions;

const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/' component={(props) => (<Root {...props} withBanner={true} withFooter={true}/>)}>
            <IndexRoute component={Blog}/>
            <Route path='/blog' component={Blog}/>
            <Route path='/article' component={Article}/>
            {/*<Route path='/dynamic' component={Dynamic} onEnter={requireLogin}/>*/}
            <Route path='/login' component={Login}/>
            <Route path='/hashGenerator' component={HashGenerator}/>
            <Route path='/base64Converter' component={Base64Converter}/>
            <Route path='/aboutMe' component={AboutMe}/>
        </Route>
        <Route path='/' component={(props) => (<Root {...props} withBanner={false} withFooter={true}/>)}>
            <Route path='/articleEditor' component={ArticleEditor} onEnter={requireLogin}/>
            <Route path='/options' component={Options} onEnter={requireLogin} />
        </Route>
        <Route path='/' component={(props) => (<Root {...props} withBanner={false} withFooter={false}/>)}>
            <Route path='/soulikeDrive' component={SoulikeDrive} onEnter={requireLogin}>
                <IndexRoute component={SoulikeDriveFileList}/>
                <Route path='/soulikeDrive/fileList'
                       component={SoulikeDriveFileList}
                       onEnter={requireLogin}/>
                <Route path='/soulikeDrive/fileUpload'
                       component={SoulikeDriveFileUploader}
                       onEnter={requireLogin}/>
            </Route>
            {/*<Route path='/musicPlayer' component={MusicPlayer}/>*/}
        </Route>
    </Router>
);

export default Routes;
