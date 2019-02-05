import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';
import style from './AboutMe.module.scss';
import NAMESPACE from '../../Namespace';
import Functions from '../../Functions';
import RequestProcessors from '../../RequestProcessor';

const {markdownToHtml} = Functions;


class AboutMe extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: 'Loading……'
        };
    }

    componentDidMount()
    {
        document.title = '关于我 - Soulike 的个人网站';
        RequestProcessors.sendGetAboutMeRequest.apply(this);
    }

    render()
    {
        return (
            <div className={style.AboutMe}>
                <Title>关于我</Title>
                <div className={style.aboutMeContent}
                     dangerouslySetInnerHTML={{__html: markdownToHtml(this.state[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN])}}/>
            </div>);
    }
}

export default AboutMe;
