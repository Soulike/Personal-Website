import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import './DeleteButton.css';
import {View as Alert} from '../../../../../../../../../../Components/Alert';
import {deleteFiles} from '../../../../Actions/Actions';
import Store from '../../../../../../../../../../Store';

class DeleteButton extends Component
{
    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return false;
    }

    onDeleteBtnClicked = (e) =>
    {
        e.preventDefault();
        const {selectedFileList: fileList} = this.props;
        if (fileList.length === 0)
        {
            Alert.show('请选择要删除的文件', false);
        }
        else
        {
            //TODO: 模态框二次确认
            Store.dispatch(deleteFiles(fileList));
        }
    };

    render()
    {
        return (
            <button className={'btn btn-danger DeleteButton'} onClick={this.onDeleteBtnClicked}>
                <div className={'deleteButtonText'}>
                    <FontAwesomeIcon icon={solidIcons.faTrashAlt} className={'buttonIcon'}/>
                    删除
                </div>
            </button>);
    }
}

const mapStateToProps = (state) =>
{
    const {selectedFileList} = state['FileList'];
    return {
        selectedFileList
    };
};

DeleteButton.propTypes = {
    selectedFileList: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DeleteButton);
