import Functions from '../../Functions';
import {requestPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function optionsPrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/options/${url}`);
}
