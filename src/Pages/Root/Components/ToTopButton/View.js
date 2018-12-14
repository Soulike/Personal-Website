import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {CSSTransitionGroup} from 'react-transition-group';
import style from './ToTopButton.module.scss';
import './Transition.scss';

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


    onToTopButtonClick = (e) =>
    {
        e.preventDefault();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    };

    render()
    {
        const {show} = this.state;
        return (
            <div className={style.ToTopButton}>
                <CSSTransitionGroup transitionName="toTopButtonTransition"
                                    transitionEnterTimeout={250}
                                    transitionLeaveTimeout={250}>
                    {show ?
                        <button className={style.button} onClick={this.onToTopButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faArrowUp}/></button> : null}
                </CSSTransitionGroup>
            </div>
        );
    }
}

export default ToTopButton;
