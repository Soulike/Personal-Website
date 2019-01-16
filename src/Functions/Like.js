export default {
    appendToLikedList,
    removeFromLikedList,
    isInLikedList
};

function getLikedListFromLocalStorage()
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

function appendToLikedList(articleId)
{
    const list = getLikedListFromLocalStorage();
    list[articleId] = true;
    localStorage.setItem('likedList', JSON.stringify(list));
}

function removeFromLikedList(articleId)
{
    const list = getLikedListFromLocalStorage();
    delete list[articleId];
    localStorage.setItem('likedList', JSON.stringify(list));
}

function isInLikedList(articleId)
{
    const list = getLikedListFromLocalStorage();
    return !!list[articleId];
}

