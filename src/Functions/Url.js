export default {
    staticPrefix,
    removePrependSlashes
};

function staticPrefix(url)
{
    url = removePrependSlashes(url);
    return url ? `https://static.soulike.tech/userImage/${url}` : '';
}

function removePrependSlashes(str)
{
    while (str.charAt(0) === '/')
    {
        str = str.substring(1);
    }
    return str;
}
