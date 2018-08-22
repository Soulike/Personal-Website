import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {View as Alert} from '../Components/Alert/index';

// 所有的请求走/server，所有的静态文件获取走/static
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

export function getFilePrefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return `/static/${url}`;
}

export async function getAsync(url, params = {}, config = {})
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.get(url, {
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
