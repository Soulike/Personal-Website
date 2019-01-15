import {postAsync} from './Net';
import {requestPrefix} from './Url';
import NAMESPACE from '../../Namespace';

export async function submitLikeAsync(articleId, isAddLike)
{
    return postAsync(requestPrefix('/blog/likeArticle'), {
        [NAMESPACE.BLOG.ARTICLE.ID]: articleId,
        [NAMESPACE.BLOG.LIKE.IS_ADD_LIKE]: isAddLike
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

