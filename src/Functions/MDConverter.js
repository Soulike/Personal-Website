import showdown from 'showdown';

export default {
    markdownToHtml
};

const converter = new showdown.Converter({
    tables: true,
    openLinksInNewWindow: true,
    smoothLivePreview: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    emoji: true
});

function markdownToHtml(markdown)
{
    return converter.makeHtml(markdown);
}

