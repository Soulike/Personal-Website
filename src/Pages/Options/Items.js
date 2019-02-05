// 先在这里添加项的种类
export const ITEM_TYPES = {
    PROFILE: 'OPTIONS/ITEMS/PROFILE', // 个人资料相关设置，如昵称、关于我等
    IMAGE: 'OPTIONS/ITEMS/IMAGE', // 图片相关设置，如头图、头像等
    ARTICLE: 'OPTIONS/ITEMS/ARTICLE', // 文章相关设置，如文章种类等
};


// 然后在这里根据上面的常量设置项的名称
const ITEM_NAMES = {
    [ITEM_TYPES.PROFILE]: '基本信息',
    [ITEM_TYPES.IMAGE]: '图片设置',
    [ITEM_TYPES.ARTICLE]: '文章设置',
};

export function getItemName(itemType)
{
    return ITEM_NAMES[itemType];
}