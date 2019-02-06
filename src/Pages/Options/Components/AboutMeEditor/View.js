import React, {Component} from 'react';
import Style from './AboutMeEditor.module.scss';
import {View as SubTitle} from '../../../../Components/SubTitle';
import Functions from '../../../../Functions';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';

const {markdownToHtml} = Functions;

class AboutEditor extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: '',
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetAboutMeRequest.apply(this, [false]);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: previousAboutMeMarkdown} = prevState;
        const {[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: aboutMeMarkdown} = this.state;
        if (previousAboutMeMarkdown.length === 0 && aboutMeMarkdown.length !== 0)
        {
            const $textarea = document.querySelector(`.${Style.textarea}`);
            $textarea.value = aboutMeMarkdown;
        }
    }

    onTextareaChange = e =>
    {
        this.setState({
            [NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: e.target.value,
        });
    };

    onSubmitButtonClick = e =>
    {
        e.preventDefault();
        const $textarea = document.querySelector(`.${Style.textarea}`);
        $textarea.disabled = true;
        RequestProcessor.sendPostSubmitAboutMarkdownRequestAsync.apply(this)
            .then(() =>
            {
                $textarea.removeAttribute('disabled');
            });
    };

    render()
    {
        const {[NAMESPACE.SHARE.INFO.ABOUT_ME_MARKDOWN]: aboutMe} = this.state;
        return (
            <div className={Style.AboutEditor}>
                <SubTitle>关于我</SubTitle>
                <div className={Style.previewer} dangerouslySetInnerHTML={{__html: markdownToHtml(aboutMe)}} />
                <textarea className={Style.textarea} onChange={this.onTextareaChange} />
                <div className={Style.submitButtonWrapper}>
                    <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>保存</button>
                </div>
            </div>
        );
    }
}

export default AboutEditor;