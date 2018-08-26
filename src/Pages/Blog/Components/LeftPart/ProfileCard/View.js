import React, {Component} from 'react';
import './UserInfoCard.css';
import {getAsync, getFilePrefix, requestPrefix} from '../../../../../Static/functions';
import {View as Alert} from '../../../../../Components/Alert/index';

class ProfileCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            nickname: '',
            avatar: '',
            image: '',
            sayingNum: 0,
            articleNum: 0
        };
    }

    componentDidMount()
    {
        Promise.all([getAsync(requestPrefix('/blog/getProfileCardInfo')), getAsync(requestPrefix('/getAvatar'))])
            .then(([infoRes, avatarRes]) =>
            {
                const {isSuccess: infoIsSuccess, msg: infoMsg, data: infoData} = infoRes;
                if (infoIsSuccess)
                {
                    const {nickname, img, sayingNum, articleNum} = infoData;
                    this.setState({
                        nickname,
                        image: img,
                        sayingNum,
                        articleNum
                    });
                }
                else
                {
                    Alert.show(infoMsg, false);
                }

                const {isSuccess: avatarIsSuccess, msg: avatarMsg, data: avatarData} = avatarRes;
                if (avatarIsSuccess)
                {
                    const {url} = avatarData;
                    this.setState({avatar: getFilePrefix(url)});
                }
                else
                {
                    Alert.show(avatarMsg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('资料卡信息获取失败', false);
                console.log(e);
            });
    }

    render()
    {
        const {nickname, avatar, image, sayingNum, articleNum} = this.state;
        return (
            <div className={'ProfileCard card'}>
                <div className={'profileCardImage'} style={{backgroundImage: `url(${getFilePrefix(image)})`}}>

                </div>
                <div className={'avatarAndNicknameWrapper'}>
                    <img src={avatar} alt="avatar" className={'avatar'}/>
                    <div className={'nickname'}>{nickname}</div>
                </div>
                <div className={'numWrapper'}>
                    <div className={'sayingNumWrapper'}>
                        <div className={'profileCardNum'}>{sayingNum}</div>
                        <div className={'profileCardLabel'}>说说</div>
                    </div>
                    <div className={'articleNumWrapper'}>
                        <div className={'profileCardNum'}>{articleNum}</div>
                        <div className={'profileCardLabel'}>文章</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCard;
