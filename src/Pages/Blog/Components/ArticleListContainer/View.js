import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAsync} from '../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../Static/Functions/Url';
import {View as Alert} from '../../../../Components/Alert';
import {View as ArticleWrapper} from './Components/ArticleWrapper';
import {CSSTransitionGroup} from 'react-transition-group';
import style from './ArticleListContainer.module.scss';
import './Transition.scss';
import {STATUS_CODE} from '../../../../Static/Constants';
import NAMESPACE from '../../../../Namespace';

class ArticleListContainer extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.ARTICLE_LIST.NAME]: [],
            [NAMESPACE.BLOG.ARTICLE_LIST.CURRENT_PAGE]: 0,
            hasReachedListEnd: false
        };
    }

    componentDidMount()
    {
        this.getArticleListIfExist(this.props.selectedArticleTypeId);
        window.addEventListener('scroll', () =>
        {
            const {[NAMESPACE.BLOG.ARTICLE_LIST.CURRENT_PAGE]: currentPage} = this.state;
            const {pageYOffset, innerHeight} = window;
            if (pageYOffset > currentPage * innerHeight * 0.75)
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
                    [NAMESPACE.BLOG.ARTICLE_LIST.NAME]: [],
                    [NAMESPACE.BLOG.ARTICLE_LIST.CURRENT_PAGE]: 0,
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
            const {[NAMESPACE.BLOG.ARTICLE_LIST.CURRENT_PAGE]: currentPage} = this.state;
            this.setState({[NAMESPACE.BLOG.ARTICLE_LIST.CURRENT_PAGE]: currentPage + 1}, () =>
            {
                this.getArticleListAsync(articleTypeId, currentPage + 1)
                    .then(data =>
                    {
                        const {[NAMESPACE.BLOG.ARTICLE_LIST.NAME]: articleList} = data;
                        if (articleList.length !== 0)// 如果有数据就更新数据
                        {
                            this.setState({
                                [NAMESPACE.BLOG.ARTICLE_LIST.NAME]: [...this.state[NAMESPACE.BLOG.ARTICLE_LIST.NAME], ...articleList]
                            });
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
                const {statusCode, data} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    resolve(data);
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    reject('服务器错误');
                }
                else
                {
                    reject('获取文章列表失败');
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
        const {[NAMESPACE.BLOG.ARTICLE_LIST.NAME]: articleList} = this.state;
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
