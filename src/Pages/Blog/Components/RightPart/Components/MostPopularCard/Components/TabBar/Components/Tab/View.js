import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {switchTab} from '../../../../Actions/Actions';
import Store from '../../../../../../../../../../Store';
import style from './Tab.module.scss';

class Tab extends Component
{
    onTabClicked = () =>
    {
        const {typeId} = this.props;
        Store.dispatch(switchTab(typeId));
    };

    render()
    {
        const {icon, currentTypeId, typeId} = this.props;
        return (
            <div className={`${style.MostPopularCardTab} ${currentTypeId === typeId ? style.currentTab : ''}`}
                 onClick={this.onTabClicked}>
                <FontAwesomeIcon icon={icon}/>
            </div>
        );
    }
}

Tab.propTypes = {
    icon: PropTypes.object.isRequired,
    typeId: PropTypes.number.isRequired,
    currentTypeId: PropTypes.number.isRequired
};

const mapStateToProps = (state) =>
{
    const {currentTypeId} = state['MostPopularCard'];
    return {
        currentTypeId
    };
};

export default connect(mapStateToProps)(Tab);
