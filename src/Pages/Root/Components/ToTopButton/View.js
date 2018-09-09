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

        this.scrollListener = () =>
        {
            if (window.pageYOffset >= 0.5 * window.innerHeight)
            {
                this.setState({show: true});
            }
            else
            {
                this.setState({show: false});
            }
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return (nextState.show !== this.state.show);
    }

    componentDidMount()
    {
        window.addEventListener('scroll', this.scrollListener);
    }

    componentWillUnmount()
    {
        window.removeEventListener('scroll', this.scrollListener);
    }


    onToTopButtonClicked = (e) =>
    {
        e.preventDefault();
        let x = window.pageXOffset;
        let y = window.pageYOffset;
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
            <div className={'ToTopButton'}>
                <CSSTransitionGroup transitionName="toTopButtonTransition"
                                    transitionEnterTimeout={250}
                                    transitionLeaveTimeout={250}>
                    {show ?
                        <button className={'button'} onClick={this.onToTopButtonClicked}>
                            <FontAwesomeIcon icon={solidIcon.faArrowUp}/></button> : null}
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default ToTopButton;
