import Store from '../../Store';
import {getInfo} from './Action/Actions';

export function refreshBlogInfo()
{
    Store.dispatch(getInfo(true));
}