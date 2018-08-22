import React, {Component} from 'react';
import PropTypes from 'prop-types';
import hightLight from 'highlight.js';
import './Article.css';

class Article extends Component
{
    componentDidMount()
    {
        hightLight.initHighlightingOnLoad();
    }

    render()
    {
        return (
            <article className={'Article'} dangerouslySetInnerHTML={{__html: this.props.content}}>

            </article>
        );
    }
}

Article.propTypes = {
    content: PropTypes.string.isRequired
};

export default Article;
