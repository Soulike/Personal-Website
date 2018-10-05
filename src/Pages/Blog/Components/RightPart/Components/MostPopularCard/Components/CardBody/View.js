import React, {Component} from 'react';
import {connect} from 'react-redux';
import TypeId from '../../TypeId';
import {CSSTransitionGroup} from 'react-transition-group';
import './CardBody.css';
import {getAsync, requestPrefix} from '../../../../../../../../Static/functions';
import Alert from '../../../../../../../../Components/Alert/View';
import CardBodyListItem from './Components/CardBodyListItem/View';

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
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({...data});
                }
                else
                {
                    Alert.show(msg, false);
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
        }

        return (
            <div className={'MostPopularCardBody'}>
                <CSSTransitionGroup transitionName="mostPopularCardBody"
                                    transitionEnterTimeout={250}
                                    transitionLeaveTimeout={250}>
                    <div key={currentTypeId}>
                        {
                            articleList.map(article =>
                            {
                                return <CardBodyListItem {...article} key={article.id}/>;
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
