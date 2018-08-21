import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {View as Alert} from '../Components/Alert/index';

/*
 * 返回值格式
 * {
 *     isSuccess: Bool
 *     msg: String
 *     data: Object
 * }
 * */

export function prefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return `/server/${url}`;
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
