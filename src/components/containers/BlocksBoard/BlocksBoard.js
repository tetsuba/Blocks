import React from 'react'
import './BlocksBoard.css'
import Block from '../../common/Block/Block';
import {getBlocks, matchBlocks, hideMatchedBlocks, findBlocksNewPositions} from '../../../lib/utils';

export default class BlocksBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            boardSize: 500,
            matrix: 5,
            animate: false,
        }
    };

    componentWillMount() {
        this.setState({
            blocks: getBlocks(this.state),
            blockSize: this.state.boardSize / this.state.matrix,
        });
    }

    onClickBlock = (block) => {
        const blocks = matchBlocks(this.state, block);
        this.setState({
            blocks: hideMatchedBlocks(this.state.blocks, blocks)
        }, this.dropBoxes)
    };

    dropBoxes = ()=> {
        this.setState({
            animate: true,
            blocks: this.state.blocks
                .map((col, colIndex) => {
                    const newPositions = findBlocksNewPositions(this.state, col)
                    return col.map((block) => {
                        const posY = newPositions
                            .find(({match}) => block.y === match)
                            .replace;

                        return {
                            ...block,
                            y: posY,
                            position: [colIndex, posY / 100], // must update to match boxes
                        }
                    })
                })

        }, () => {


            // TODO: how to do this better...

            setTimeout(() => {
                this.setState({
                    animate: false,
                    blocks: this
                        .state
                        .blocks
                        .map((col) => col.sort((a, b) => a.y - b.y)),
                })

            },1000)

        });
    };


    renderBlocks = () =>
        this.state.blocks
            .map((col, colIndex) =>
                col
                    .map((block, rowIndex) =>
                        <Block
                            key={`${colIndex}${rowIndex}`}
                            { ...block }
                            column={col}
                            position={[colIndex, rowIndex]}
                            animate={this.state.animate}
                            eventClick={this.onClickBlock} />
                    ));


    render() {
        const styles = {
            width: this.state.boardSize,
            height: this.state.boardSize,
        };

        return (
            <div className="block-board" style={styles}>
                { this.renderBlocks() }
            </div>
        )
    };
};
