import {getFileList} from './Actions/Actions';
import Store from '../../../../Store';

export function reloadFileList()
{
    Store.dispatch(getFileList());
}
