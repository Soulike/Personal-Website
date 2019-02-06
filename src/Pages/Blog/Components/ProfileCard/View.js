import React, {Component} from 'react';
import {connect} from 'react-redux';
import Functions from '../../../../Functions';
import style from './ProfileCard.module.scss';
import NAMESPACE from '../../../../Namespace';
import RequestProcessors from '../../../../RequestProcessor';

const {staticPrefix} = Functions;

class ProfileCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.BLOG.PROFILE_CARD.IMAGE_FILE_NAME]: '',
            [NAMESPACE.BLOG.AMOUNT.SAYING]: 0,
            [NAMESPACE.BLOG.AMOUNT.ARTICLE]: 0,
        };
    }

    componentDidMount()
    {
        RequestProcessors.sendGetProfileCardInfoRequest.apply(this);
    }

    render()
    {
        const {
            [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
            [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
            [NAMESPACE.SHARE.INFO.MOTTO]: motto,
        } = this.props;
        const {
            [NAMESPACE.BLOG.PROFILE_CARD.IMAGE_FILE_NAME]: profileCardImage,
            [NAMESPACE.BLOG.AMOUNT.SAYING]: sayingAmount,
            [NAMESPACE.BLOG.AMOUNT.ARTICLE]: articleAmount,
        } = this.state;
        return (
            <div className={style.ProfileCard}>
                <div className={style.profileCardImage}
                     style={{backgroundImage: `url(${staticPrefix(profileCardImage)})`}} />
                <div className={style.avatarAndBasicInformationWrapper}>
                    <img src={staticPrefix(avatarFileName)} alt="avatar" className={style.avatar} />
                    <div className={style.basicInformationWrapper}>
                        <div className={style.nickname} title={nickname}>{nickname}</div>
                        <div className={style.motto} title={motto}>{motto}</div>
                    </div>
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
    const {
        [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
        [NAMESPACE.SHARE.INFO.MOTTO]: motto,
    } = state['Blog'];
    return {
        [NAMESPACE.SHARE.INFO.NICKNAME]: nickname,
        [NAMESPACE.SHARE.INFO.AVATAR.FILE_NAME]: avatarFileName,
        [NAMESPACE.SHARE.INFO.MOTTO]: motto,
    };
};

export default connect(mapStateToProps)(ProfileCard);
