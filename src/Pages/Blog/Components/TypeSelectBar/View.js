import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ARTICLE_TYPE, STATUS_CODE} from '../../../../Static/Constants';
import {getAsync} from '../../../../Static/Functions/Net';
import {requestPrefix} from '../../../../Static/Functions/Url';
import {View as Alert} from '../../../../Components/Alert';
import {switchArticleType} from './Actions/Actions';
import style from './TypeSelectBar.module.scss';

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
                const {statusCode, data} = res;
                const {articleTypes} = data;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({articleTypes});
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
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
            <div className={style.TypeSelectBar}>
                <div data-article_type_id={ARTICLE_TYPE.ALL}
                     className={`${style.articleType} ${parseInt(selectedArticleTypeId, 10) === ARTICLE_TYPE.ALL ? style.currentArticleType : ''}`}
                     onClick={this.onArticleTypeClicked}>全部
                </div>
                {/*<div data-article_type_id={ARTICLE_TYPE.SAYING}
                 className={style.articleType}
                 onClick={this.onArticleTypeClicked}>说说
                 </div>*/}
                <div data-article_type_id={ARTICLE_TYPE.ARTICLE}
                     className={`${style.articleType} ${parseInt(selectedArticleTypeId, 10) === ARTICLE_TYPE.ARTICLE ? style.currentArticleType : ''}`}
                     onClick={this.onArticleTypeClicked}>文章
                </div>
                {
                    articleTypes.map(articleType =>
                    {
                        const {id, name} = articleType;
                        return <div data-article_type_id={id}
                                    key={id}
                                    className={`${style.articleType} ${parseInt(selectedArticleTypeId, 10) === parseInt(id, 10) ? style.currentArticleType : ''}`}
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
