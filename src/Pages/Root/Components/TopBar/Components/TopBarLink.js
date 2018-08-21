import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './TopBarLink.css';

class TopBarLink extends Component
{
    render()
    {
        const {iconStyle, text, ...rest} = this.props;
        // 如果没有图标
        if (!iconStyle)
        {
            return (
                <div className={'TopBarLinkWrapper'}>
                    <Link {...rest} className={'TopBarLink'}>{text}</Link>
                </div>
            );
        }
        // 如果有图标
        else
        {
            return (
                <div className={'TopBarLinkWrapper'}>
                    <Link {...rest} className={'TopBarLink'}>
                        <FontAwesomeIcon className={'TopBarIcon'} icon={iconStyle}/>
                        {text}
                    </Link>
                </div>
            );
        }
    }
}

TopBarLink.propTypes = {
    iconStyle: PropTypes.object,
    text: PropTypes.string.isRequired
};

export default TopBarLink;
