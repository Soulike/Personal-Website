import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './TopBarLink.css';

class TopBarLink extends Component
{
    render()
    {
        const {iconStyle, text, children, ...rest} = this.props;
        return (
            <div className={'TopBarLinkWrapper'}>
                <Link {...rest} className={'topBarLink'}>
                    {iconStyle ? <FontAwesomeIcon className={'topBarIcon'} icon={iconStyle}/> : null}
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
