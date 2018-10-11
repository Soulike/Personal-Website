import React, {Component} from 'react';
import {View as Tab} from './Components/Tab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import ComponentTypes from '../../ComponentTypes';
import style from './LeftPanel.module.scss';

class LeftPanel extends Component
{
    render()
    {
        /*如果需要增加项，去ComponentTypes.js增加*/
        return (
            <div className={style.LeftPanel}>
                <div className={style.cloudIconWrapper}>
                    <FontAwesomeIcon className={style.cloudIcon} icon={solidIcons.faCloud}/>
                    <div className={style.soulikeDriveText}>SoulikeDrive</div>
                </div>
                <div className={style.Tabs}>
                    <Tab tabId={ComponentTypes['FileList']}
                         icon={solidIcons.faHdd}
                         text={'所有文件'}
                         to={'/soulikeDrive/fileList'}
                         componentType={'FileList'}/>
                    <Tab tabId={ComponentTypes['FileUploader']}
                         icon={solidIcons.faUpload}
                         text={'上传文件'}
                         to={'/soulikeDrive/fileUpload'}
                         componentType={'FileUploader'}/>
                    {/*                    <Tab tabId={2}
                     icon={solidIcons.faTrash}
                     text={'回收站'}/>*/}
                </div>
            </div>
        );
    }
}

export default LeftPanel;
