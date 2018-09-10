import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {tabClicked} from '../../../../Actions/Actions';
import './Tab.css';

class Tab extends Component
{
    onThisTabClicked = () =>
    {
        const {componentType, onTabClicked} = this.props;
        onTabClicked(componentType);
    };

    render()
    {
        const {tabId, currentActiveTabId, icon, text, to} = this.props;
        return (
            <Link className={`Tab ${tabId === currentActiveTabId ? 'active' : ''}`}
                  onClick={this.onThisTabClicked}
                  to={to}
                  onlyActiveOnIndex={false}>
                <FontAwesomeIcon icon={icon} className={'tabIcon'}/>
                {text}
            </Link>
        );
    }
}

Tab.propTypes = {
    tabId: PropTypes.number.isRequired,
    currentActiveTabId: PropTypes.number.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    componentType: PropTypes.string.isRequired
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
        onTabClicked: (componentType) =>
        {
            dispatch(tabClicked(componentType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
