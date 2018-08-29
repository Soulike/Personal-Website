import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ArticleContainter.css';
import {getAsync, requestPrefix} from '../../../../../Static/functions';
import {View as Alert} from '../../../../../Components/Alert';
import {View as ArticleWrapper} from './Components/ArticleWrapper';
import {CSSTransitionGroup} from 'react-transition-group';

class ArticleContainer extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            articleList: []
        };
    }

    componentDidMount()
    {
        this.getArticleList(this.props.selectedArticleTypeId);
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if (this.props.selectedArticleTypeId !== nextProps.selectedArticleTypeId)
        {
            this.getArticleList(nextProps.selectedArticleTypeId);
        }
    }

    getArticleList = (articleTypeId) =>
    {
        this.setState({articleList: []});
        this.getArticleListAsync(articleTypeId)
            .then(data =>
            {
                this.setState({articleList: data});
            })
            .catch(msg =>
            {
                Alert.show(msg, false);
            });
    };

    getArticleListAsync = async (articleTypeId) =>
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const res = await getAsync(requestPrefix('/blog/getArticleList'), {articleTypeId});
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

            <div className={'ArticleContainer'}>
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
export default connect(mapStateToProps)(ArticleContainer);
