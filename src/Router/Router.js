import React from 'react';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
// 所有页面的 View 在此处导入
import {Functions as LoginFunctions} from '../Pages/Login';
import {PAGE_ID, PAGE_ID_TO_COMPONENT, PAGE_ID_TO_LOGIN_REQUIREMENT, PAGE_ID_TO_ROUTE} from './PAGE';

const {requireLogin} = LoginFunctions;

const Routes = () => (
    <Router history={browserHistory}>
        <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.INDEX]}>
            <IndexRoute component={PAGE_ID_TO_COMPONENT[PAGE_ID.BLOG.INDEX]} />
            {
                Object.values(PAGE_ID.ROOT).map(pageId =>
                {
                    return <Route path={PAGE_ID_TO_ROUTE[pageId]}
                                  component={PAGE_ID_TO_COMPONENT[pageId]}
                                  onEnter={PAGE_ID_TO_LOGIN_REQUIREMENT[pageId] ? requireLogin : null}
                                  key={PAGE_ID_TO_ROUTE[pageId]} />;
                })
            }
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.BLOG.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.BLOG.INDEX]}>
                <IndexRoute component={PAGE_ID_TO_COMPONENT[PAGE_ID.BLOG.INDEX]} />
                {
                    Object.values(PAGE_ID.BLOG).map(pageId =>
                    {
                        return <Route path={PAGE_ID_TO_ROUTE[pageId]}
                                      component={PAGE_ID_TO_COMPONENT[pageId]}
                                      onEnter={PAGE_ID_TO_LOGIN_REQUIREMENT[pageId] ? requireLogin : null}
                                      key={PAGE_ID_TO_ROUTE[pageId]} />;
                    })
                }
            </Route>
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.TOOL.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.TOOL.INDEX]}>
                <IndexRoute component={PAGE_ID_TO_COMPONENT[PAGE_ID.TOOL.INDEX]} />
                {
                    Object.values(PAGE_ID.TOOL).map(pageId =>
                    {
                        return <Route path={PAGE_ID_TO_ROUTE[pageId]}
                                      component={PAGE_ID_TO_COMPONENT[pageId]}
                                      onEnter={PAGE_ID_TO_LOGIN_REQUIREMENT[pageId] ? requireLogin : null}
                                      key={PAGE_ID_TO_ROUTE[pageId]} />;
                    })
                }
            </Route>
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.TOOL.INDEX]} component={PAGE_ID_TO_COMPONENT[PAGE_ID.TOOL.INDEX]}>
                {
                    Object.values(PAGE_ID.TOOL).map(pageId =>
                    {
                        return <Route path={PAGE_ID_TO_ROUTE[pageId]}
                                      component={PAGE_ID_TO_COMPONENT[pageId]}
                                      onEnter={PAGE_ID_TO_LOGIN_REQUIREMENT[pageId] ? requireLogin : null}
                                      key={PAGE_ID_TO_ROUTE[pageId]} />;
                    })
                }
            </Route>
            <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.APPLICATION.INDEX]}
                   component={PAGE_ID_TO_COMPONENT[PAGE_ID.APPLICATION.INDEX]}>
                <Route path={PAGE_ID_TO_ROUTE[PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]}
                       component={PAGE_ID_TO_COMPONENT[PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]}>
                    <IndexRoute component={PAGE_ID_TO_COMPONENT[PAGE_ID.APPLICATION.SOULIKE_DRIVE.INDEX]} />
                    {
                        Object.values(PAGE_ID.APPLICATION.SOULIKE_DRIVE).map(pageId =>
                        {
                            return <Route path={PAGE_ID_TO_ROUTE[pageId]}
                                          component={PAGE_ID_TO_COMPONENT[pageId]}
                                          onEnter={PAGE_ID_TO_LOGIN_REQUIREMENT[pageId] ? requireLogin : null}
                                          key={PAGE_ID_TO_ROUTE[pageId]} />;
                        })
                    }
                </Route>
            </Route>
        </Route>
    </Router>
);

export default Routes;
