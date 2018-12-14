import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Store from '../../../../../../Store';
import {fileSelected, fileUnselected} from '../../Actions/Actions';
import style from './File.module.scss';

class File extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            selected: false
        };
    }

    onFileClick = () =>
    {
        const {selected} = this.state;
        const {id} = this.props;

        if (selected)
        {
            Store.dispatch(fileUnselected(id));
        }
        else
        {
            Store.dispatch(fileSelected(id));
        }
        this.refs.fileCheckbox.checked = !selected;
        this.setState({selected: !selected});
    };

    timestampFormat = (timestamp) =>
    {
        const prefixZero = (num) =>
        {
            if (num >= 0 && num < 10)
            {
                return '0' + num.toString();
            }
            else
            {
                return num.toString();
            }

        };

        const date = new Date(timestamp);
        return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())} ${prefixZero(date.getHours())}:${prefixZero(date.getMinutes())}`;
    };

    render()
    {
        const {selected} = this.state;
        const {name, size, uploader, uploadTime} = this.props;
        return (
            <tr className={`${style.File} ${selected ? style.selected : ''}`} onClick={this.onFileClick}>
                <td><input type="checkbox" ref={'fileCheckbox'}/></td>
                <td>{name}</td>
                <td>{(size / 1024 / 1024).toFixed(2)}M</td>
                <td>{uploader}</td>
                <td>{this.timestampFormat(uploadTime)}</td>
            </tr>
        );
    }
}

File.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    uploader: PropTypes.string.isRequired,
    uploadTime: PropTypes.string.isRequired
};

export default File;
