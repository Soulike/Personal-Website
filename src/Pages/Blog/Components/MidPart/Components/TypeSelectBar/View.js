import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ARTICLE_TYPE} from '../../../../../../Static/constants';
import {getAsync, requestPrefix} from '../../../../../../Static/functions';
import {View as Alert} from '../../../../../../Components/Alert';
import './TypeSelectBar.css';
import {switchArticleType} from './Actions/Actions';

class TypeSelectBar extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            articleTypes: []
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/blog/getArticleTypes'), false)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({articleTypes: data});
                }
                else
                {
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取文章类型失败', false);
                console.log(e);
            });
    }

    onArticleTypeClicked = (e) =>
    {
        let articleTypeId = -2;
        if (e.target.dataset)
        {
            articleTypeId = e.target.dataset['article_type_id'];
        }
        else
        {
            articleTypeId = e.target.getAttribute('data-article_type_id');
        }

        this.props.changeCurrentArticleTypeId(articleTypeId);
    };


    render()
    {
        const {articleTypes} = this.state;
        const {selectedArticleTypeId} = this.props;
        return (
            <div className={'TypeSelectBar'}>
                <div data-article_type_id={ARTICLE_TYPE.ALL}
                     className={`articleType ${parseInt(selectedArticleTypeId, 10) === ARTICLE_TYPE.ALL ? 'currentArticleType' : ''}`}
                     onClick={this.onArticleTypeClicked}>全部
                </div>
                {/*<div data-article_type_id={ARTICLE_TYPE.SAYING}
                 className={'articleType'}
                 onClick={this.onArticleTypeClicked}>说说
                 </div>*/}
                <div data-article_type_id={ARTICLE_TYPE.ARTICLE}
                     className={`articleType ${parseInt(selectedArticleTypeId, 10) === ARTICLE_TYPE.ARTICLE ? 'currentArticleType' : ''}`}
                     onClick={this.onArticleTypeClicked}>文章
                </div>
                {
                    articleTypes.map(articleType =>
                    {
                        const {id, name} = articleType;
                        return <div data-article_type_id={id}
                                    key={id}
                                    className={`articleType ${parseInt(selectedArticleTypeId, 10) === parseInt(id, 10) ? 'currentArticleType' : ''}`}
                                    onClick={this.onArticleTypeClicked}>{name}
                        </div>;
                    })
                }
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

const mapDispatchToProps = (dispatch) =>
{
    return {
        changeCurrentArticleTypeId: (articleTypeId) =>
        {
            dispatch(switchArticleType(articleTypeId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeSelectBar);
