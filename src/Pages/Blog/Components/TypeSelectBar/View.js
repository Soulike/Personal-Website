import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ARTICLE_TYPE} from '../../../../Static/Constants';
import {switchArticleType} from './Actions/Actions';
import style from './TypeSelectBar.module.scss';
import NAMESPACE from '../../../../Namespace';
import RequestProcessors from '../../../../RequestProcessors';

class TypeSelectBar extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: []
        };
    }

    componentDidMount()
    {
        RequestProcessors.sendGetArticleTypesRequest.apply(this);
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
        const {[NAMESPACE.BLOG.LIST.ARTICLE_TYPE]: articleTypes} = this.state;
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
                        const {
                            [NAMESPACE.BLOG.ARTICLE_TYPE.ID]: articleTypeId,
                            [NAMESPACE.BLOG.ARTICLE_TYPE.NAME]: articleTypeName
                        } = articleType;
                        return <div data-article_type_id={articleTypeId}
                                    key={articleTypeId}
                                    className={`${style.articleType} ${parseInt(selectedArticleTypeId, 10) === parseInt(articleTypeId, 10) ? style.currentArticleType : ''}`}
                                    onClick={this.onArticleTypeClicked}>{articleTypeName}
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
