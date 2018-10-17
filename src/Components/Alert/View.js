import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import style from './Alert.module.scss';

class Alert extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            opacity: 0,
            intervals: []
        };
    }

    componentDidMount()
    {
        const {duration, fadeDuration} = this.props;

        const interval = setInterval(() =>
        {
            this.setState({opacity: this.state.opacity + 0.2});
        }, fadeDuration / 5);

        setTimeout(() =>
        {
            clearInterval(interval);
        }, fadeDuration);

        this.setState({intervals: [...this.state.intervals, interval]});

        setTimeout(() =>
        {
            const interval = setInterval(() =>
            {
                this.setState({opacity: this.state.opacity - 0.2});
            }, fadeDuration / 5);

            this.setState({intervals: [...this.state.intervals, interval]});
        }, duration - fadeDuration);

    }

    componentWillUnmount()
    {
        const {intervals} = this.state;
        intervals.forEach((interval) =>
        {
            clearInterval(interval);
        });
    }

    static show = (msg, isSuccess, duration = 1000, fadeDuration = 200) =>
    {
        const root = document.getElementById('root');
        const node = document.createElement('div');
        node.className = style.alertWrapper;
        const wrapper = root.appendChild(node);
        ReactDOM.render(<Alert msg={msg}
                               isSuccess={isSuccess}
                               duration={duration}
                               fadeDuration={fadeDuration}/>, wrapper);

        setTimeout(() =>
        {
            ReactDOM.unmountComponentAtNode(wrapper);
            root.removeChild(node);

        }, duration);
    };

    render()
    {
        const {msg, isSuccess} = this.props;
        const {opacity} = this.state;
        return (
            <div className={`${style.Alert} ${style[`alert-${isSuccess ? 'success' : 'danger'}`]}`} style={{opacity}}>
                {msg}
            </div>
        );
    }
}

Alert.propTypes = {
    msg: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    fadeDuration: PropTypes.number.isRequired
};

export default Alert;
