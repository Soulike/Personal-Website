import React, {Component} from 'react';
import {connect} from 'react-redux';
import TypeId from '../../TypeId';
import {CSSTransitionGroup} from 'react-transition-group';
import {getAsync} from '../../../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../../../Static/Functions/Url';
import Alert from '../../../../../../Components/Alert/View';
import CardBodyListItem from './Components/CardBodyListItem/View';
import style from './CardBody.module.scss';
import './Transition.scss';
import {STATUS_CODE} from '../../../../../../Static/Constants';

class CardBody extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            orderedByView: [],
            orderedByLike: [],
            orderedByComment: []
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/blog/getPopularList'))
            .then(res =>
            {
                const {statusCode, data} = res;
                const {popularArticleList} = data;
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
            case TypeId.view:
            {
                articleList = this.state.orderedByView;
                break;
            }
            case TypeId.like:
            {
                articleList = this.state.orderedByLike;
                break;
            }
            case TypeId.comment:
            {
                articleList = this.state.orderedByComment;
                break;
            }
            default:
            {
                articleList = this.state.orderedByView;
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
                                return <CardBodyListItem {...article} key={article.articleId}/>;
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
