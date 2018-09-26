import React from 'react';
import axios from 'axios';

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
            const res = await axios.get(url, allowCache ? {...params} : {
                params: {
                    ...params,
                    _t: Date.now()
                },
                ...config
            });
            resolve(res.data);
        }
        catch (e)
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
        }
        catch (e)
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
