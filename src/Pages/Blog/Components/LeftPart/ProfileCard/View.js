import React, {Component} from 'react';
import {connect} from 'react-redux';
import './UserInfoCard.css';
import {getAsync, getFilePrefix, requestPrefix} from '../../../../../Static/functions';
import {View as Alert} from '../../../../../Components/Alert/index';

class ProfileCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            image: '',
            sayingNum: 0,
            articleNum: 0
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/blog/getProfileCardInfo'))
            .then((res) =>
            {
                const {isSuccess, msg, data} = res;
                if (isSuccess)
                {
                    const {img, sayingNum, articleNum} = data;
                    this.setState({
                        image: img,
                        sayingNum,
                        articleNum
                    });
                }
                else
                {
                    Alert.show(msg, false);
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
        const {nickname, avatar} = this.props;
        const {image, sayingNum, articleNum} = this.state;
        return (
            <div className={'ProfileCard card'}>
                <div className={'profileCardImage'} style={{backgroundImage: `url(${getFilePrefix(image)})`}}>

                </div>
                <div className={'avatarAndNicknameWrapper'}>
                    <img src={getFilePrefix(avatar)} alt="avatar" className={'avatar'}/>
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

const mapStateToProps = (state) =>
{
    const {nickname, avatar} = state['Blog'];
    return {
        nickname,
        avatar
    };
};

export default connect(mapStateToProps)(ProfileCard);
