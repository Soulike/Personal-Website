export function requestPrefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return `/server/${url}`;
}

export function staticPrefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return url ? `https://static.soulike.tech/userImage/${url}` : '';
}

export default {
    requestPrefix,
    staticPrefix
};
