import axios from 'axios';
import crypto from 'crypto';
import showdown from 'showdown';

const converter = new showdown.Converter({
    tables: true,
    openLinksInNewWindow: true,
    smoothLivePreview: true
});

// 所有的请求走/server，所有的静态文件获取走/file
/*
 * 返回值格式
 * {
 *     isSuccess: Bool
 *     msg: String
 *     data: Object
 * }
 * */
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

export async function getAsync(url, allowCache = true, params = {}, config = {})
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.get(url, allowCache ? {params, ...config} : {
                params: {
                    ...params,
                    _t: Date.now()
                },
                ...config
            });
            resolve(res.data);
        } catch (e)
        {
            reject(e);
        }
    });

}

export async function postAsync(url, params = {}, config = {})
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.post(url, params, config);
            resolve(res.data);
        } catch (e)
        {
            reject(e);
        }
    });
}

export function downloadFile(url)
{
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function ()
    {
        document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
}

export function prefixZero(num)
{
    if (num >= 0 && num < 10)
    {
        return '0' + num.toString();
    }
    else
    {
        return num.toString();
    }

}

export async function submitLikeAsync(articleId, isAddLike)
{
    return postAsync(requestPrefix('/blog/likeArticle'), {
        articleId,
        isAddLike
    });
}

function getLikedList()
{
    const list = JSON.parse(localStorage.getItem('likedList'));
    if (!list)
    {
        localStorage.setItem('likedList', JSON.stringify({}));
        return {};
    }
    else
    {
        return list;
    }
}

export function appendToLikedList(articleId)
{
    const list = getLikedList();
    list[articleId] = true;
    localStorage.setItem('likedList', JSON.stringify(list));
}

export function removeFromLikedList(articleId)
{
    const list = getLikedList();
    delete list[articleId];
    localStorage.setItem('likedList', JSON.stringify(list));
}

export function isInLikedList(articleId)
{
    const list = getLikedList();
    return !!list[articleId];
}

export function getHash(text, hashMethod)
{
    const hash = crypto.createHash(hashMethod);
    hash.update(text);
    return hash.digest('hex');
}

export function generateTimeStr(time)
{
    const MILLISECONDS = {
        YEAR: 365 * 24 * 60 * 60 * 1000,
        MONTH: 30 * 24 * 60 * 60 * 1000,
        WEEK: 7 * 24 * 60 * 60 * 1000,
        DAY: 24 * 60 * 60 * 1000,
        HOUR: 60 * 60 * 1000,
        MINUTE: 60 * 1000,
        SECOND: 1000
    };
    const date = new Date(time);
    const diff = Date.now() - date.getTime();
    const {floor} = Math;
    if (diff >= MILLISECONDS.YEAR)
    {
        return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;
    }
    else if (diff >= MILLISECONDS.MONTH)
    {
        return `${floor(diff / MILLISECONDS.MONTH)} 月前`;
    }
    else if (diff >= MILLISECONDS.WEEK)
    {
        return `${floor(diff / MILLISECONDS.WEEK)} 周前`;
    }
    else if (diff >= MILLISECONDS.DAY)
    {
        return `${floor(diff / MILLISECONDS.DAY)} 天前`;
    }
    else if (diff >= MILLISECONDS.HOUR)
    {
        return `${floor(diff / MILLISECONDS.HOUR)} 小时前`;
    }
    else if (diff >= MILLISECONDS.MINUTE)
    {
        return `${floor(diff / MILLISECONDS.MINUTE)} 分钟前`;
    }
    else if (diff >= MILLISECONDS.SECOND)
    {
        return `${floor(diff / MILLISECONDS.SECOND)} 秒前`;
    }
}

export function markdownToHtml(markdown)
{
    return converter.makeHtml(markdown);
}

export function addScript(src)
{
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
}
