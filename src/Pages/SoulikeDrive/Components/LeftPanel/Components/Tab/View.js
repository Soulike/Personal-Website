import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {tabClicked} from '../../../../Actions/Actions';
import style from './Tab.module.scss';

class Tab extends Component
{
    onThisTabClick = () =>
    {
        const {tabId, onTabClick} = this.props;
        onTabClick(tabId);
    };

    render()
    {
        const {tabId, currentActiveTabId, icon, text, to} = this.props;
        return (
            <Link className={`${style.Tab} ${tabId === currentActiveTabId ? style.active : ''}`}
                  onClick={this.onThisTabClick}
                  to={to}
                  onlyActiveOnIndex={false}>
                <FontAwesomeIcon icon={icon} className={style.tabIcon}/>
                {text}
            </Link>
        );
    }
}

Tab.propTypes = {
    tabId: PropTypes.number.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const mapStateToProps = function (state)
{
    const {currentActiveTabId} = state.SoulikeDrive;
    return {
        currentActiveTabId
    };
};

const mapDispatchToProps = function (dispatch)
{
    return {
        onTabClick: (tabId) =>
        {
            dispatch(tabClicked(tabId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
