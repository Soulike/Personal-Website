import Store from '../../../../Store';
import {getBannerImage} from './Actions/Actions';

export function refreshBannerImage()
{
    Store.dispatch(getBannerImage(true));
}