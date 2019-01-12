import showdown from 'showdown';

const converter = new showdown.Converter({
    tables: true,
    openLinksInNewWindow: true,
    smoothLivePreview: true
});

export function markdownToHtml(markdown)
{
    return converter.makeHtml(markdown);
}

export default {markdownToHtml};
