import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';
import {getAsync} from '../../Static/Functions/Net';
import {requestPrefix} from '../../Static/Functions/Url';
import {STATUS_CODE} from '../../Static/Constants';
import style from './AboutMe.module.scss';
import NAMESPACE from '../../Namespace';
import {markdownToHtml} from '../../Static/Functions/MDConverter';


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
        getAsync(requestPrefix('/getAboutMe'), true)
            .then(res =>
            {
                const {statusCode, data} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
                }
                else
                {
                    this.setState({aboutMe: '获取关于我失败'});
                }
            });
    }

    render()
    {
        return (
            <div className={style.AboutMe}>
                <Title titleText={'关于我'}/>
                <div className={style.aboutMeContent}
                     dangerouslySetInnerHTML={{__html: markdownToHtml(this.state[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN])}}/>
            </div>);
    }
}

export default AboutMe;
