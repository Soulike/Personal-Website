import Functions from '../../Functions';
import {requestPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function soulikeDrivePrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/soulikeDrive/${url}`);
}
