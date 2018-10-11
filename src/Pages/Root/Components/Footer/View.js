import React, {Component} from 'react';
import {getAsync} from '../../../../Static/Functions';
import style from './Footer.module.scss';

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
        getAsync('https://v1.hitokoto.cn', false, {c: 'a'})
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
            <footer className={style.Footer}>
                <div className={style.hitokoto}><a href="https://hitokoto.cn/api"
                                                   className={style.hitokotoLink}>{hitokoto}</a>
                </div>
                <div className={style.thanksWrapper}>
                    <div className={style.thanks}>本站由
                        <a href="https://reactjs.org/" className={style.footerLink}>React</a>,
                        <a href="https://redux.js.org/" className={style.footerLink}>Redux</a> 以及
                        <a href="https://nodejs.org/" className={style.footerLink}>NodeJS</a> 编写而成，所有的矢量图标均由
                        <a href="https://fontawesome.com/"
                           className={style.footerLink}>FontAwesome</a> 提供，感谢以上所有开源项目的贡献者们。
                    </div>
                    <div className={style.thanks}>另外特别感谢 <a href="https://www.bilibili.com/"
                                                            className={style.footerLink}>bilibili</a> 的美工 (滑稽)。
                    </div>
                </div>
                <div className={style.emoji} onClick={this.onEmojiClicked}>{this.emoji[emojiNumber]}</div>
                <div className={style.copyRight}>Copyleft ⑨ {date.getFullYear()} Soulike 版权没有</div>
            </footer>
        );
    }
}

export default Footer;
