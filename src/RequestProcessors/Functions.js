import Functions from '../Functions';

const {removePrependSlashes} = Functions;

export function requestPrefix(url)
{
    url = removePrependSlashes(url);
    return `/server/${url}`;
}
