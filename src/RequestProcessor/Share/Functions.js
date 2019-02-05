import Functions from '../../Functions';
import {requestPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function sharePrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/${url}`);
}
