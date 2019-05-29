import {includes, pipe, path, __} from 'ramda'

export const getColour = () => {
    const random = Math.floor(Math.random() * 3)
    const colours = ['red', 'blue', 'green']
    return colours[random];
};

export const getBlocks = ({matrix, boardSize}) => Array(matrix)
    .fill({})
    .map((obj, col) =>
        Array(matrix)
            .fill({})
            .map((block, row) => ({
                y: row * (boardSize / matrix),
                x: col * (boardSize / matrix),
                width: (boardSize / matrix),
                height: (boardSize / matrix),
                colour: getColour(),
                position: [col, row],
            }))
    );

export let capture = [];

export const matchBlocks = (state, block) => {
    capture = [];
    capture.push(block);
    engine(state, block);
    return capture;
};

export const getBlockPositionValue = (props) => ({
    ...props,
    position: includes(props.direction, ['top', 'bottom'])
        ? path(['block', 'position', 1], props)
        : path(['block', 'position', 0], props)
});

export const getBlockIndex = (props) => {
    const {direction, state, position} = props;

    switch(direction) {
        case 'top':
        case 'left': {
            return {
                ...props,
                index: (position > 0) ? position - 1 : 0
            };
        }
        case 'bottom':
        case 'right': {
            return {
                ...props,
                index: (position < state.matrix - 1) ? position + 1 : state.matrix - 1
            };
        }
        default:
            console.error('ERROR: ', direction);
            return null;
    }
};

export const getBlock = (props) => {
    const {state, block, direction, index} = props;
    const [y, x] = block.position;

    switch(direction) {
        case 'top':
        case 'bottom':
            return {
                ...props,
                nextBlock: state.blocks[y][index]
            };

        case 'right':
        case 'left':
            return {
                ...props,
                nextBlock: state.blocks[index][x]
            };

        default:
            console.error('ERROR: ', direction);
            return null;
    }
};

export const isBlockCaptured = (props) =>
    includes(props.nextBlock, capture)
        ? {captured: true}
        : props;


export const captureBlock = (props) => {
    const {
        block,
        nextBlock,
        captured
    } = props;
    if(captured) return null;
    if (block.colour !== nextBlock.colour) return null;
    return nextBlock
};

export const findNextBlock = pipe(getBlockPositionValue, getBlockIndex, getBlock, isBlockCaptured, captureBlock);

export const engine = (state, block) => {
    ['top', 'left', 'bottom', 'right']
        .forEach((direction) => {
            const nextBlock = findNextBlock({state, block, direction});
            if (nextBlock) {
                capture.push(nextBlock);
                engine(state, nextBlock);
            }
            console.log('engine: ', direction, nextBlock)
        })
};


export const hideMatchedBlocks = (blocks, matchedBlocks) =>
    blocks.map((ary) =>
        ary.map((block) => includes(block, matchedBlocks)
            ?
                {
                    ...block,
                    destroy: true,
                    y: -(block.y + 100),
                    colour: getColour(),
                }
            : block
        )
    );

export const findBlocksNewPositions = (state, col) => [...col]
    .sort((a,b) => a.y - b.y)
    .reverse()
    .reduce((acc, val, index) => {
        const newPosition = ((state.matrix - 1) - index) * state.blockSize;
        return [...acc, { match: val.y, replace: newPosition }]
    }, []);
