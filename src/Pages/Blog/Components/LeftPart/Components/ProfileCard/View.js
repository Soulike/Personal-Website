import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAsync, staticPrefix, requestPrefix} from '../../../../../../Static/Functions';
import {View as Alert} from '../../../../../../Components/Alert/index';
import style from './ProfileCard.module.scss';

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
        getAsync(requestPrefix('/blog/getProfileCardInfo'), true)
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
            <div className={style.ProfileCard}>
                <div className={style.profileCardImage}
                     style={{backgroundImage: `url(${staticPrefix(image)})`}}/>
                <div className={style.avatarAndNicknameWrapper}>
                    <img src={staticPrefix(avatar)} alt="avatar" className={style.avatar}/>
                    <div className={style.nickname}>{nickname}</div>
                </div>
                <div className={style.numWrapper}>
                    <div className={style.sayingNumWrapper}>
                        <div className={style.profileCardNum}>{sayingNum}</div>
                        <div className={style.profileCardLabel}>说说</div>
                    </div>
                    <div className={style.articleNumWrapper}>
                        <div className={style.profileCardNum}>{articleNum}</div>
                        <div className={style.profileCardLabel}>文章</div>
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
