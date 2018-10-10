import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';
import {getAsync, requestPrefix} from '../../Static/Functions';
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
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    this.setState({aboutMe: data});
                }
                else
                {
                    this.setState({aboutMe: msg});
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
