import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Store from '../../../../../../Store';
import {fileSelected, fileUnselected} from '../../Actions/Actions';
import style from './File.module.scss';
import NAMESPACE from '../../../../../../Namespace';
import Functions from '../../../../../../Functions';

const {generateFullTimeString, generateRandomString} = Functions;

class File extends Component
{
    constructor()
    {
        super(...arguments);
        const {[NAMESPACE.SOULIKE_DRIVE.FILE.ID]: fileId} = this.props;
        this.state = {
            selected: false,
            checkboxId: `_file_${fileId}_${generateRandomString()}`
        };
    }

    onFileClick = () =>
    {
        const {selected, checkboxId} = this.state;
        const {[NAMESPACE.SOULIKE_DRIVE.FILE.ID]: fileId} = this.props;

        if (selected)
        {
            Store.dispatch(fileUnselected(fileId));
        }
        else
        {
            Store.dispatch(fileSelected(fileId));
        }
        const $fileCheckbox = document.querySelector(`#${checkboxId}`);
        $fileCheckbox.checked = !selected;
        this.setState({selected: !selected});
    };

    render()
    {
        const {selected, checkboxId} = this.state;
        const {
            [NAMESPACE.SOULIKE_DRIVE.FILE.NAME]: fileName,
            [NAMESPACE.SOULIKE_DRIVE.FILE.SIZE]: fileSize,
            [NAMESPACE.SOULIKE_DRIVE.FILE.UPLOADER_NAME]: uploader,
            [NAMESPACE.SOULIKE_DRIVE.FILE.UPLOAD_TIME]: uploadTime
        } = this.props;
        return (
            <tr className={`${style.File} ${selected ? style.selected : ''}`} onClick={this.onFileClick}>
                <td><input type="checkbox" id={checkboxId}/></td>
                <td>{fileName}</td>
                <td>{(fileSize / 1024 / 1024).toFixed(2)}M</td>
                <td>{uploader}</td>
                <td>{generateFullTimeString(uploadTime)}</td>
            </tr>
        );
    }
}

File.propTypes = {
    [NAMESPACE.SOULIKE_DRIVE.FILE.ID]: PropTypes.number.isRequired,
    [NAMESPACE.SOULIKE_DRIVE.FILE.NAME]: PropTypes.string.isRequired,
    [NAMESPACE.SOULIKE_DRIVE.FILE.SIZE]: PropTypes.number.isRequired,
    [NAMESPACE.SOULIKE_DRIVE.FILE.UPLOADER_NAME]: PropTypes.string.isRequired,
    [NAMESPACE.SOULIKE_DRIVE.FILE.UPLOAD_TIME]: PropTypes.string.isRequired
};

export default File;
