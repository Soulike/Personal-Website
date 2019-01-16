export default {
    appendScriptNodeByUrl,
    appendScriptNodeByCode,
    generateRandomString,
    generateTimeString,
    generateFullTimeString
};

function appendScriptNodeByUrl(src, type = 'text/javascript')
{
    const script = document.createElement('script');
    script.type = type;
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}

function appendScriptNodeByCode(code, type = 'text/javascript')
{
    const script = document.createElement('script');
    script.type = type;
    script.append(document.createTextNode(code));
    document.body.appendChild(script);
}

function generateRandomString()
{
    return Math.random().toString(36).substr(2);
}

function generateTimeString(time)
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

function generateFullTimeString(time)
{
    const date = new Date(time);
    return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())} ${prefixZero(date.getHours())}:${prefixZero(date.getMinutes())}`;
}

function prefixZero(num)
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
