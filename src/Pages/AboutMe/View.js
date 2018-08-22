import React, {Component} from 'react';
import {View as Title} from '../../Components/Title';
import {View as Article} from '../../Components/Article';
import './AboutMe.css';
import {getAsync, prefix} from '../../Static/functions';


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
        getAsync(prefix('/getAboutMe'))
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
            <div className={'AboutMe'}>
                <Title titleText={'关于我'}/>
                <Article content={this.state.aboutMe}/>
            </div>);
    }
}

export default AboutMe;
