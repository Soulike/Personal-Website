import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as ArticleWrapper} from './Components/ArticleWrapper';
import {CSSTransitionGroup} from 'react-transition-group';
import style from './ArticleListContainer.module.scss';
import './Transition.scss';
import NAMESPACE from '../../../../Namespace';
import RequestProcessors from '../../../../RequestProcessors';

class ArticleListContainer extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.LIST.ARTICLE]: [],
            [NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: 0,
            hasReachedListEnd: false
        };
    }

    componentDidMount()
    {
        this.getArticleListIfExist();
        window.addEventListener('scroll', () =>
        {
            const {[NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: currentPage} = this.state;
            const {pageYOffset, innerHeight} = window;
            if (pageYOffset > currentPage * innerHeight * 0.75)
            {
                this.getArticleListIfExist();
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if (this.props.selectedArticleTypeId !== nextProps.selectedArticleTypeId)
        {
            this.setState(
                {
                    [NAMESPACE.BLOG.LIST.ARTICLE]: [],
                    [NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: 0,
                    hasReachedListEnd: false
                },
                () =>
                {
                    this.getArticleListIfExist();
                });
        }
    }

    // 如果上一次服务器返回不为空就继续请求，否则直接忽略
    getArticleListIfExist = () =>
    {
        if (!this.state.hasReachedListEnd)
        {
            const {[NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: currentPage} = this.state;
            this.setState({[NAMESPACE.BLOG.ARTICLE_LIST_CONTAINER.CURRENT_PAGE]: currentPage + 1}, () =>
            {
                RequestProcessors.sendGetArticleListRequest.apply(this);
            });
        }
    };

    render()
    {
        const {[NAMESPACE.BLOG.LIST.ARTICLE]: articleList} = this.state;
        return (
            <div className={style.ArticleListContainer}>
                <CSSTransitionGroup transitionName="articleList"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={1}>
                    {articleList.map(article =>
                    {
                        return <ArticleWrapper key={article[NAMESPACE.BLOG.ARTICLE.ID]} {...article}/>;
                    })}
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {selectedArticleTypeId} = state['TypeSelectBar'];
    return {
        selectedArticleTypeId
    };
};
export default connect(mapStateToProps)(ArticleListContainer);
