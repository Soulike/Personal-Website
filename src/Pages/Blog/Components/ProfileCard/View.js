import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAsync} from '../../../../Static/Functions/Net';
import {requestPrefix, staticPrefix} from '../../../../Static/Functions/Url';
import {View as Alert} from '../../../../Components/Alert';
import style from './ProfileCard.module.scss';
import {STATUS_CODE} from '../../../../Static/Constants';

class ProfileCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            profileCardImage: '',
            sayingAmount: 0,
            articleAmount: 0
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/blog/getProfileCardInfo'), true)
            .then((res) =>
            {
                const {statusCode, data} = res;
                if (statusCode === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
                }
                else if (statusCode === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
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
        const {nickname, avatarFileName} = this.props;
        const {profileCardImage, sayingAmount, articleAmount} = this.state;
        return (
            <div className={style.ProfileCard}>
                <div className={style.profileCardImage}
                     style={{backgroundImage: `url(${staticPrefix(profileCardImage)})`}}/>
                <div className={style.avatarAndNicknameWrapper}>
                    <img src={staticPrefix(avatarFileName)} alt="avatar" className={style.avatar}/>
                    <div className={style.nickname}>{nickname}</div>
                </div>
                <div className={style.numWrapper}>
                    <div className={style.sayingAmountWrapper}>
                        <div className={style.profileCardAmount}>{sayingAmount}</div>
                        <div className={style.profileCardLabel}>说说</div>
                    </div>
                    <div className={style.articleAmountWrapper}>
                        <div className={style.profileCardAmount}>{articleAmount}</div>
                        <div className={style.profileCardLabel}>文章</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {nickname, avatarFileName} = state['Blog'];
    return {
        nickname,
        avatarFileName
    };
};

export default connect(mapStateToProps)(ProfileCard);
