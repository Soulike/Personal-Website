import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';
import {getAsync, requestPrefix} from '../../Static/Functions';
import {STATUS_CODE} from '../../Static/Constants';
import style from './AboutMe.module.scss';


class AboutMe extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            aboutMe: 'Loading……'
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
                    this.setState({aboutMe: data});
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
                <div className={style.aboutMeContent} dangerouslySetInnerHTML={{__html: this.state.aboutMe}}/>
            </div>);
    }
}

export default AboutMe;
