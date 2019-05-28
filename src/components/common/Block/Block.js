import React from 'react'
import './Block.css'
import { isEmpty } from 'ramda'

export default class Block extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // y: top position for the Block
            y: 0,
            // Animation speed of loop
            stepCount: 500 / 16, // how many steps will we take
            // animate the block
            animate: {
                start: 0,
                end: 0,
                y: 0,
            },
            stepSize: 0,
        }
    }

    componentWillMount() {
        this.setState({
            y: this.props.y
        });
    }

    componentWillReceiveProps(nextProps) {
        const {
            props,
        } = this;

        if (isEmpty(props)) return;

        if (nextProps.y === this.state.y) return;

        if (nextProps.y < 0) {
            this.setState({
                y: nextProps.y,
            });
            return;
        }

        if (!nextProps.animate) {
            this.setState({
                y: nextProps.y,
            });
            return;
        }


        this.setState({
            animate: {
                start: this.state.y,
                end: nextProps.y,
            },
            stepSize: (nextProps.y - this.state.y) / this.state.stepCount
        },
            () => {
                this.animateBlocks(nextProps)
            });
    }

    stepSize = (endValue, startValue, stepCount) =>
        (endValue - startValue) / stepCount // how big will each step be

    animateBlocks = () => {
        if (this.state.y < this.state.animate.end) {
            this.setState({
                y: this.state.y + this.state.stepSize
            });
            setTimeout(() => this.animateBlocks(), 10)
        } else {
            this.setState({
                y: this.state.animate.end,
            });
        }
    };

    render() {
        const styles = {
            transform: `translate(${this.props.x}px, ${this.state.y}px)`,
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            backgroundColor: this.props.colour,
        };

        return (
            <div
                onClick={() => this.props.eventClick(this.props)}
                className="block"
                style={styles}
            ></div>
        )
    }
};
