import React, {Component} from 'react';
import {getAsync} from '../../../../Static/functions';
import './Footer.css';

class Footer extends Component
{
    constructor()
    {
        super(...arguments);
        this.emoji = ['(°∀°)ﾉ', 'Σ(ﾟдﾟ;)', '（/TДT)/', '(｡･ω･｡)', 'ヽ(`Д´)ﾉ', '(￣ε(#￣) Σ'];
        this.state = {
            emojiNumber: this.getRandomNumber(),
            hitokoto: 'Loading……'
        };
    }

    componentDidMount()
    {
        getAsync('https://v1.hitokoto.cn', {c: 'a'})
            .then((res) =>
            {
                this.setState({hitokoto: res.hitokoto});
            });
    }

    getRandomNumber = () =>
    {
        return Math.round(Math.random() * (this.emoji.length - 1));
    };

    onEmojiClicked = () =>
    {
        const {emojiNumber} = this.state;
        let newNumber = emojiNumber;
        while (newNumber === emojiNumber)
        {
            newNumber = this.getRandomNumber();
        }
        this.setState({emojiNumber: newNumber});
    };

    render()
    {
        const {emojiNumber, hitokoto} = this.state;
        const date = new Date();
        return (
            <footer className={'footer'}>
                <div className={'hitokoto'}>{hitokoto}</div>
                <div className={'thanksWrapper'}>
                    <div className={'thanks'}>本站由
                        <a href="https://reactjs.org/" className={'link'}>React</a>,
                        <a href="https://redux.js.org/" className={'link'}>Redux</a> 以及
                        <a href="https://nodejs.org/" className={'link'}>NodeJS</a> 编写而成，所有的矢量图标均由
                        <a href="https://fontawesome.com/" className={'link'}>FontAwesome</a> 提供，感谢以上所有开源项目的贡献者们。
                    </div>
                    <div className={'thanks'}>另外特别感谢 <a href="https://www.bilibili.com/"
                                                        className={'link'}>bilibili</a> 的美工 (滑稽)。
                    </div>
                </div>
                <div className={'emoji'} onClick={this.onEmojiClicked}>{this.emoji[emojiNumber]}</div>
                <div className={'copyRight'}>Copyleft ⑨ {date.getFullYear()} Soulike 版权没有</div>
            </footer>
        );
    }
}

export default Footer;
