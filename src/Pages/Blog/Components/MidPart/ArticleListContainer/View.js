import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAsync, requestPrefix} from '../../../../../Static/functions';
import {View as Alert} from '../../../../../Components/Alert';
import {View as ArticleWrapper} from './Components/ArticleWrapper';
import {CSSTransitionGroup} from 'react-transition-group';
import './ArticleListContainer.css';

class ArticleListContainer extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            articleList: [],
            currentPage: 0
        };
    }

    componentDidMount()
    {
        this.getArticleList(this.props.selectedArticleTypeId);
        window.addEventListener('scroll', () =>
        {
            const {currentPage} = this.state;
            if (window.pageYOffset >= currentPage * window.innerHeight)
            {
                this.getArticleList(this.props.selectedArticleTypeId);
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if (this.props.selectedArticleTypeId !== nextProps.selectedArticleTypeId)
        {
            this.setState(
                {
                    articleList: [],
                    currentPage: 0
                },
                () =>
                {
                    this.getArticleList(nextProps.selectedArticleTypeId);
                });
        }
    }

    getArticleList = (articleTypeId) =>
    {
        const {currentPage} = this.state;
        this.setState({currentPage: currentPage + 1});
        this.getArticleListAsync(articleTypeId, currentPage + 1)
            .then(data =>
            {
                this.setState({articleList: [...this.state.articleList, ...data]});
            })
            .catch(msg =>
            {
                Alert.show(msg, false);
            });
    };

    getArticleListAsync = async (articleTypeId, currentPage) =>
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const res = await getAsync(requestPrefix('/blog/getArticleList'), false, {
                    articleTypeId,
                    currentPage
                });
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    resolve(data);
                }
                else
                {
                    reject(msg);
                }
            }
            catch (e)
            {
                reject('获取文章列表失败');
                console.log(e);
            }
        });
    };

    render()
    {
        const {articleList} = this.state;
        return (

            <div className={'ArticleListContainer'}>
                <CSSTransitionGroup transitionName="articleList"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={1}>
                    {articleList.map(article =>
                    {
                        return <ArticleWrapper key={article.id} {...article}/>;
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
