import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as File} from './Components/File';
import {View as ButtonArea} from './Components/ButtonArea';
import Store from '../../../../Store';
import {tabClicked} from '../../Actions/Actions';
import {getFileList} from './Actions/Actions';
import style from './FileList.module.scss';


class FileList extends Component
{
    componentDidMount()
    {
        Store.dispatch(tabClicked('FileList'));
        Store.dispatch(getFileList());
    }


    render()
    {
        const {fileList} = this.props;
        return (
            <div>
                <ButtonArea/>
                <div className={style.FileListWrapper}>
                    {fileList.length === 0 ? <div className={style.noFileText}>_(:3」∠)_ 你没有文件的样子</div> :
                        <table className={style.fileList}>
                            <tbody>
                            <tr>
                                <th scope="col"><input type="checkbox" disabled={true} style={{opacity: 0}}/></th>
                                <th scope="col">文件名</th>
                                <th scope="col">文件大小</th>
                                <th scope="col">上传人</th>
                                <th scope="col">上传时间</th>
                            </tr>
                            {fileList.map((file) =>
                            {
                                return (<File {...file} key={file.articleId}/>);
                            })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {fileList} = state.FileList;
    return {
        fileList
    };
};

export default connect(mapStateToProps)(FileList);
