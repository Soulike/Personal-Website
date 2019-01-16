import Functions from '../../Functions';
import {requestPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function blogPrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/blog/${url}`);
}
