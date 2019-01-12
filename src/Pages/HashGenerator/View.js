import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Title} from '../../Components/Title';
import {CSSTransitionGroup} from 'react-transition-group';
import {getHash} from '../../Static/Functions/Crypto';
import Clipboard from 'react-clipboard.js';
import style from './HashGenerator.module.scss';
import './Transition.scss';

class HashGenerator extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            hashMethod: 'md5',
            currentText: '',
            showResult: false,
            hashResult: ''
        };
    }

    componentDidMount()
    {
        document.title = '哈希生成器 - Soulike 的个人网站';
    }

    onSelectChange = (e) =>
    {
        this.setState({
            hashMethod: e.target.value,
            showResult: false,
            hashResult: ''
        });
    };

    onOriginalTextChange = (e) =>
    {
        this.setState({currentText: e.target.value});
    };

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {hashMethod, currentText} = this.state;
        const result = getHash(currentText, hashMethod);

        this.setState({
            showResult: true,
            hashResult: result
        });
    };

    render()
    {
        const {hashMethod, showResult, hashResult} = this.state;
        return (
            <div className={style.HashGenerator}>
                <Title titleText={'哈希生成器'}/>
                <form onSubmit={this.onSubmit}>
                    <select onChange={this.onSelectChange} className={style.methodSelect}>
                        <option value="md5" defaultChecked={true}>MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256">SHA-256</option>
                        <option value="sha384">SHA-384</option>
                        <option value="sha512">SHA-512</option>
                    </select>
                    <input className={style.originalText}
                           type="text"
                           placeholder={'原始字符串'}
                           autoFocus={true}
                           onChange={this.onOriginalTextChange}/>
                    <button className={`${style.originalTextSubmitBtn}`}>提交</button>
                    <CSSTransitionGroup transitionName="hashGeneratorResult"
                                        transitionEnterTimeout={250}
                                        transitionLeaveTimeout={250}>
                        {
                            showResult ?
                                <div className={style.resultWrapper}>
                                    <div className={style.hashMethodWrapper}>{hashMethod.toUpperCase()}</div>
                                    <div className={style.hashResultWrapper}>{hashResult}</div>

                                    <Clipboard className={`${style.copyHashResultBtn}`}
                                               data-clipboard-target={`.${style.hashResultWrapper}`}>
                                        <FontAwesomeIcon icon={solidIcon.faClipboardCheck}
                                                         className={style.copyHashResultBtnIcon}/>复制
                                    </Clipboard>
                                </div>
                                : null
                        }
                    </CSSTransitionGroup>
                </form>
            </div>
        );
    }

}

export default HashGenerator;
