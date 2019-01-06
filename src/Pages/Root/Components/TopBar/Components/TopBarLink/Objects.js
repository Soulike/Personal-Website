class TopBarLink
{
    constructor(text, iconStyle = null)
    {
        this.onlyActiveOnIndex = false;
        this.text = text;
        this.iconStyle = iconStyle;
    }

}

export class TopBarRouteLink extends TopBarLink
{
    constructor(to, text, iconStyle = null)
    {
        super(text, iconStyle);
        this.to = to;
    }
}

export class TopBarUrlLink extends TopBarLink
{
    constructor(href, text, iconStyle = null)
    {
        super(text, iconStyle);
        this.href = href;
        this.target = '_blank';
    }
}