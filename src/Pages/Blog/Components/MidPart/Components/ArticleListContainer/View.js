import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAsync, requestPrefix} from '../../../../../../Static/functions';
import {View as Alert} from '../../../../../../Components/Alert/index';
import {View as ArticleWrapper} from './Components/ArticleWrapper/index';
import {CSSTransitionGroup} from 'react-transition-group';
import './ArticleListContainer.css';

class ArticleListContainer extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            articleList: [],
            currentPage: 0,
            hasReachedListEnd: false
        };
    }

    componentDidMount()
    {
        this.getArticleListIfExist(this.props.selectedArticleTypeId);
        window.addEventListener('scroll', () =>
        {
            const {currentPage} = this.state;
            const {pageYOffset, innerHeight} = window;
            if (pageYOffset > currentPage * innerHeight)
            {
                this.getArticleListIfExist(this.props.selectedArticleTypeId);
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
                    currentPage: 0,
                    hasReachedListEnd: false
                },
                () =>
                {
                    this.getArticleListIfExist(nextProps.selectedArticleTypeId);
                });
        }
    }

    // 如果上一次服务器返回不为空就继续请求，否则直接忽略
    getArticleListIfExist = (articleTypeId) =>
    {
        if (!this.state.hasReachedListEnd)
        {
            const {currentPage} = this.state;
            this.setState({currentPage: currentPage + 1}, () =>
            {
                this.getArticleListAsync(articleTypeId, currentPage + 1)
                    .then(data =>
                    {
                        if (data.length !== 0)// 如果有数据就更新数据
                        {
                            this.setState({articleList: [...this.state.articleList, ...data]});
                        }
                        else// 如果服务器返回列表为空，那就下一次没必要再发送任何请求，设置标志为true
                        {
                            this.setState({hasReachedListEnd: true});
                        }
                    })
                    .catch(msg =>
                    {
                        Alert.show(msg, false);
                    });
            });
        }
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
