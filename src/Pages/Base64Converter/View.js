import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';

import style from './Base64Converter.module.scss';

class Base64Converter extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            originalText: '',
            base64Text: ''
        };
    }

    componentDidMount()
    {
        document.title = 'Base64 转换器 - Soulike 的个人网站';
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return false;
    }

    onOriginalTextChange = (e) =>
    {
        this.setState({originalText: e.target.value});
    };

    onBase64TextChange = (e) =>
    {
        this.setState({base64Text: e.target.value});
    };

    onOriginalToBase64ButtonClick = (e) =>
    {
        e.preventDefault();
        const base64Text = Buffer.from(this.state.originalText, 'utf-8').toString('base64');
        this.setState({base64Text});
        this.refs.base64Text.value = base64Text;
    };

    onBase64ToOriginalButtonClick = (e) =>
    {
        e.preventDefault();
        const originalText = Buffer.from(this.state.base64Text, 'base64').toString('utf-8');
        this.setState({originalText});
        this.refs.base64OriginalText.value = originalText;
    };


    render()
    {
        return (
            <div className={style.Base64Converter}>
                <Title>Base64 转换器</Title>
                <div className={style.originalTextWrapper}>
                    <div className={style.originalTextHeader}>原始文本</div>
                    <textarea className={style.originalText}
                              ref={'base64OriginalText'}
                              onChange={this.onOriginalTextChange}
                              draggable={false}/>
                </div>
                <div className={style.converterButtonWrapper}>
                    <button className={style.originalToBase64Button}
                            onClick={this.onOriginalToBase64ButtonClick}>转换为 Base64↓
                    </button>
                    <button className={style.base64ToOriginalButton}
                            onClick={this.onBase64ToOriginalButtonClick}>转换为文本↑
                    </button>
                </div>
                <div className={style.textWrapper}>
                    <div className={style.textHeader}>BASE64</div>
                    <textarea className={style.base64Text}
                              ref={'base64Text'}
                              onChange={this.onBase64TextChange}
                              draggable={false}/>
                </div>
            </div>
        );
    }
}

export default Base64Converter;
