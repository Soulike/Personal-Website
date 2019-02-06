import React, {Component} from 'react';
import Style from './Options.module.scss';
import {View as BannerImageUploader} from './Components/BannerImageUploader';
import {View as DividingLine} from './Components/DividingLine';
import {View as AvatarUploader} from './Components/AvatarUploader';
import {View as ProfileCardImageUploader} from './Components/ProfileCardImageUploader';
import {ITEM_TYPES} from './Items';
import {View as NavBar} from './Components/NavBar';
import {View as ProfileEditor} from './Components/ProfileEditor';
import {View as AboutEditor} from './Components/AboutMeEditor';

class Options extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            currentNavBarItem: ITEM_TYPES.PROFILE,
        };
    }

    changeNavBarItem = nextItem =>
    {
        if (Object.values(ITEM_TYPES).includes(nextItem))
        {
            this.setState({
                currentNavBarItem: nextItem,
            });
        }
    };

    getCurrentItemComponent = () =>
    {
        const {currentNavBarItem} = this.state;
        if (currentNavBarItem === ITEM_TYPES.PROFILE)
        {
            return (
                <div className={Style.optionComponent}>
                    <ProfileEditor />
                    <DividingLine />
                    <AboutEditor />
                </div>
            );
        }
        else if (currentNavBarItem === ITEM_TYPES.IMAGE)
        {
            return (
                <div className={Style.optionComponent}>
                    <BannerImageUploader />
                    <DividingLine />
                    <ProfileCardImageUploader />
                    <DividingLine />
                    <AvatarUploader />
                </div>
            );
        }
        else if (currentNavBarItem === ITEM_TYPES.ARTICLE)
        {
            return (
                <div className={Style.optionComponent}>

                </div>
            );
        }
        else
        {
            return null;
        }
    };

    render()
    {
        const {currentNavBarItem} = this.state;
        return (
            <div className={Style.Options}>
                <div className={Style.navBarWrapper}>
                    <NavBar currentNavBarItem={currentNavBarItem} changeNavBarItem={this.changeNavBarItem} />
                </div>
                {
                    this.getCurrentItemComponent()
                }
            </div>
        );
    }
}

export default Options;
