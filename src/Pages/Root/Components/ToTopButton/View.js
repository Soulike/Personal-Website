import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import './ToTopButton.css';
import {CSSTransitionGroup} from 'react-transition-group';

class ToTopButton extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            show: false
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return (nextState.show !== this.state.show);
    }

    componentDidMount()
    {
        const {innerHeight} = window;
        window.addEventListener('scroll', () =>
        {
            if (window.scrollY >= 0.5 * innerHeight)
            {
                this.setState({show: true});
            }
            else
            {
                this.setState({show: false});
            }
        });
    }


    onToTopButtonClicked = (e) =>
    {
        e.preventDefault();
        let x = window.scrollX;
        let y = window.scrollY;
        const interval = setInterval(() =>
        {
            if (y >= 50)
            {
                y -= 50;
            }
            else
            {
                y = 0;
                clearInterval(interval);
            }
            window.scrollTo(x, y);
        }, 10);

    };

    render()
    {
        const {show} = this.state;
        return (
            <CSSTransitionGroup transitionName="ToTopButtonTransition"
                                transitionEnterTimeout={250}
                                transitionLeaveTimeout={250}>
                {show ? <div className={'ToTopButtonWrapper'}>
                    <button className={'ToTopButton'} onClick={this.onToTopButtonClicked}>
                        <FontAwesomeIcon icon={solidIcon.faArrowUp}/></button>
                </div> : null}
            </CSSTransitionGroup>
        );
    }
}

export default ToTopButton;
