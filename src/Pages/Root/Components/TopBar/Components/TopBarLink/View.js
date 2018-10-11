import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './TopBarLink.module.scss';

class TopBarLink extends Component
{
    render()
    {
        const {iconStyle, text, children, ...rest} = this.props;
        return (
            <div className={style.TopBarLinkWrapper}>
                <Link {...rest} className={style.topBarLink}>
                    {iconStyle ? <FontAwesomeIcon className={style.topBarIcon} icon={iconStyle}/> : null}
                    {text}
                </Link>
                {children}
            </div>
        );
    }
}

TopBarLink.propTypes = {
    iconStyle: PropTypes.object,
    text: PropTypes.string.isRequired
};

export default TopBarLink;
