import React, {Component} from 'react';
import {connect} from 'react-redux';
import ORDERED_BY_TYPES from '../../OrderedByTypes';
import {CSSTransitionGroup} from 'react-transition-group';
import {getAsync} from '../../../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../../../Static/Functions/Url';
import Alert from '../../../../../../Components/Alert/View';
import CardBodyListItem from './Components/CardBodyListItem/View';
import style from './CardBody.module.scss';
import './Transition.scss';
import {STATUS_CODE} from '../../../../../../Static/Constants';
import NAMESPACE from '../../../../../../Namespace';

class CardBody extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_VIEW_AMOUNT]: [],
            [NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_LIKE_AMOUNT]: [],
            [NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_COMMENT_AMOUNT]: []
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/blog/getPopularList'))
            .then(res =>
            {
                const {statusCode, data} = res;
                const {[NAMESPACE.BLOG.LIST.POPULAR_ARTICLE]: popularArticleList} = data;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({...popularArticleList});
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                }
            })
            .catch(e =>
            {
                console.log(e);
                Alert.show('获取文章排名信息失败', false);
            });
    }


    render()
    {
        const {currentTypeId} = this.props;
        let articleList = null;
        switch (currentTypeId)
        {
            case ORDERED_BY_TYPES.VIEW_AMOUNT:
            default:
            {
                articleList = this.state[NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_VIEW_AMOUNT];
                break;
            }
            case ORDERED_BY_TYPES.LIKE_AMOUNT:
            {
                articleList = this.state[NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_LIKE_AMOUNT];
                break;
            }
            case ORDERED_BY_TYPES.COMMENT_AMOUNT:
            {
                articleList = this.state[NAMESPACE.BLOG.LIST.POPULAR_ARTICLE.ORDERED_BY_COMMENT_AMOUNT];
                break;
            }
        }

        return (
            <div className={style.MostPopularCardBody}>
                <CSSTransitionGroup transitionName='mostPopularCardBody'
                                    transitionEnterTimeout={250}
                                    transitionLeaveTimeout={250}>
                    <div key={currentTypeId}>
                        {
                            articleList.map(article =>
                            {
                                return <CardBodyListItem {...article} key={article[NAMESPACE.BLOG.ARTICLE.ID]}/>;
                            })
                        }
                    </div>
                </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {currentTypeId} = state['MostPopularCard'];
    return {
        currentTypeId
    };
};

export default connect(mapStateToProps)(CardBody);
