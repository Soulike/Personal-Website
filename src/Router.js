import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// 所有页面的 View 在此处导入
import {View as Root} from './Pages/Root/';
import {View as Login} from './Pages/Login';
import {View as ArticleEditor} from './Pages/ArticleEditor';
import {View as Dynamic} from './Pages/Dynamic';
import {View as Blog} from './Pages/Blog';
import {View as MusicPlayer} from './Pages/MusicPlayer';
import {View as SoulikeDrive} from './Pages/SoulikeDrive';
import {View as Options} from './Pages/Options';
import {View as SoulikeDriveFileList} from './Pages/SoulikeDrive/Components/RightArea/Components/FileList';
import {View as SoulikeDriveFileUploader} from './Pages/SoulikeDrive/Components/RightArea/Components/FileUploader';

import {Functions as AuthProcessor} from './Components/AuthProcessor';


const Routes = () => (
    <Router history={browserHistory}>
        <Route path='/' component={(props) => (<Root {...props} withBanner={true} withFooter={true}/>)}>
            <IndexRoute component={Blog}/>
            <Route path='/blog' component={Blog}>
                <Route path='/articleEditor' component={ArticleEditor} onEnter={AuthProcessor.requireLogin}/>
                <Route path='/options' component={Options} onEnter={AuthProcessor.requireLogin}/>
            </Route>
            <Route path='/dynamic' component={Dynamic} onEnter={AuthProcessor.requireLogin}/>
            <Route path='/login' component={Login}/>
        </Route>
        {/*<Route path='/' component={(props) => (<Root {...props} withBanner={false} withFooter={true}/>)}></Route>
         <Route path='/' component={(props) => (<Root {...props} withBanner={true} withFooter={false}/>)}></Route>*/}
        <Route path='/' component={(props) => (<Root {...props} withBanner={false} withFooter={false}/>)}>
            <Route path='/soulikeDrive' component={SoulikeDrive} onEnter={AuthProcessor.requireLogin}>
                <IndexRoute component={SoulikeDriveFileList}/>
                <Route path='/soulikeDrive/fileList'
                       component={SoulikeDriveFileList}
                       onEnter={AuthProcessor.requireLogin}/>
                <Route path='/soulikeDrive/fileUpload'
                       component={SoulikeDriveFileUploader}
                       onEnter={AuthProcessor.requireLogin}/>
            </Route>
            <Route path='/musicPlayer' component={MusicPlayer}/>
        </Route>
    </Router>
);

export default Routes;
