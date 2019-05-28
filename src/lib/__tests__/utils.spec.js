import {getColour, getBlockIndex, getBlock, isBlockCaptured, captureBlock} from '../utils';
import {mockData} from '../__mocks__/mocks';

describe('@UTILS', () => {
    describe.skip('getColour()', () => {
        test('', () => {
            const expected = ['red', 'green', 'blue']
            expect(getColour()).toEqual(expect.arrayContaining(expected))
        })
    });



    describe('getBlockIndex()', () => {
        describe('BLOCK Y:0 X:0', () => {
            const initProps = {
                state: mockData,
                direction: '',
                block: {
                    "y": 0,
                    "x": 0,
                    "width": 100,
                    "height": 100,
                    "colour": "red",
                    "position": [0, 0]
                },
            };

            test('should return index 0 if direction is top', () => {
                const props = {...initProps, direction: 'top'};
                const expected = 0;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 0 if direction is left', () => {
                const props = {...initProps, direction: 'left'};
                const expected = 0;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 1 if direction is right', () => {
                const props = {...initProps, direction: 'right'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 1 if direction is bottom', () => {
                const props = {...initProps, direction: 'bottom'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
        });
        describe('BLOCK Y:0 X:400', () => {
            const initProps = {
                state: mockData,
                direction: '',
                block: {
                    "y": 0,
                    "x": 400,
                    "width": 100,
                    "height": 100,
                    "colour": "green",
                    "position": [4, 0]
                },
            };
            test('should return index 0 if direction is top', () => {
                const props = {...initProps, direction: 'top'};
                const expected = 0;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 3 if direction is left', () => {
                const props = {...initProps, direction: 'left'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 4 if direction is right', () => {
                const props = {...initProps, direction: 'right'};
                const expected = 4;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 1 if direction is bottom', () => {
                const props = {...initProps, direction: 'bottom'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
        });
        describe('BLOCK Y:200 X:200', () => {
            const initProps = {
                state: mockData,
                direction: '',
                block:             {
                    "y": 200,
                    "x": 200,
                    "width": 100,
                    "height": 100,
                    "colour": "red",
                    "position": [2, 2]
                },
            };
            test('should return index 1 if direction is top', () => {
                const props = {...initProps, direction: 'top'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 1 if direction is left', () => {
                const props = {...initProps, direction: 'left'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 3 if direction is right', () => {
                const props = {...initProps, direction: 'right'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 3 if direction is bottom', () => {
                const props = {...initProps, direction: 'bottom'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
        });
        describe('BLOCK Y:400 X:0', () => {
            const initProps = {
                state: mockData,
                direction: '',
                block: {
                    "y": 400,
                    "x": 0,
                    "width": 100,
                    "height": 100,
                    "colour": "red",
                    "position": [0, 4]
                },
            };

            test('should return index 3 if direction is top', () => {
                const props = {...initProps, direction: 'top'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 0 if direction is left', () => {
                const props = {...initProps, direction: 'left'};
                const expected = 0;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 1 if direction is right', () => {
                const props = {...initProps, direction: 'right'};
                const expected = 1;
                expect(getBlockIndex(props).index).toEqual(expected)
            });

            test('should return index 4 if direction is bottom', () => {
                const props = {...initProps, direction: 'bottom'};
                const expected = 4;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
        });
        describe('BLOCK Y:400 X:400', () => {
            const initProps = {
                state: mockData,
                direction: '',
                block: {
                    "y": 400,
                    "x": 400,
                    "width": 100,
                    "height": 100,
                    "colour": "red",
                    "position": [4, 4]
                },
            };
            test('should return index 3 if direction is top', () => {
                const props = {...initProps, direction: 'top'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 3 if direction is left', () => {
                const props = {...initProps, direction: 'left'};
                const expected = 3;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 4 if direction is right', () => {
                const props = {...initProps, direction: 'right'};
                const expected = 4;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
            test('should return index 4 if direction is bottom', () => {
                const props = {...initProps, direction: 'bottom'};
                const expected = 4;
                expect(getBlockIndex(props).index).toEqual(expected)
            });
        });
    });
    describe('getBlock()', () => {
        const initProps = {
            state: mockData,
            direction: '',
            block: {
                "y": 200,
                "x": 200,
                "width": 100,
                "height": 100,
                "colour": "red",
                "position": [2, 2]
            },
        };

        test('should return the next block direction top', () => {
            const props = {...initProps, direction: 'top', index: 1};
            const expected = {
                "y": 100,
                "x": 200,
                "width": 100,
                "height": 100,
                "colour": "red",
                "position": [2, 1]
            };
            expect(getBlock(props).nextBlock).toEqual(expected)
        });
        test('should return the next block direction left', () => {
            const props = {...initProps, direction: 'left', index: 1};
            const expected = {
                "y": 200,
                "x": 100,
                "width": 100,
                "height": 100,
                "colour": "red",
                "position": [1, 2]
            };
            expect(getBlock(props).nextBlock).toEqual(expected)
        });
        test('should return the next block direction bottom', () => {
            const props = {...initProps, direction: 'bottom', index: 3};
            const expected = {
                "y": 300,
                "x": 200,
                "width": 100,
                "height": 100,
                "colour": "red",
                "position": [2, 3]
            };
            expect(getBlock(props).nextBlock).toEqual(expected)
        });
        test('should return the next block direction right', () => {
            const props = {...initProps, direction: 'right', index: 3};
            const expected = {
                "y": 200,
                "x": 300,
                "width": 100,
                "height": 100,
                "colour": "green",
                "position": [3, 2]
            };
            expect(getBlock(props).nextBlock).toEqual(expected)
        });
    });
    describe.skip('isBlockCaptured()', () => {
        const initProps = {
            state: mockData,
            direction: 'top',
            index: 1,
            nextBlock: {
                "y": 200,
                "x": 200,
                "width": 100,
                "height": 100,
                "colour": "red",
                "position": [2, 2]
            },
        };
        test('', () => {
            const props = {initProps};
            console.log(isBlockCaptured(props))



            expect(isBlockCaptured(props).captured).toBeFalsy()
        })
    });
    describe('captureBlock()', () => {
        const initProps = {
            state: mockData,
            direction: '',
            block: {
                "colour": "red",
            },
            nextBlock: {
                "colour": "blue",
            }
        };

        test('should return null if block is captured', () => {
            const props = {...initProps, captured: true};
            const expected = null;
            expect(captureBlock(initProps)).toEqual(expected)
        });
        test('should return null if block colour does not match nextBlock colour', () => {
            const props = {...initProps, direction: 'bottom', index: 3};
            const expected = null;
            expect(captureBlock(props)).toEqual(expected)
        });
        test('should return nextBlock if block colour does match nextBlock colour', () => {
            const props = {...initProps, nextBlock: {colour: 'red'}};
            const expected = {colour: 'red'};
            expect(captureBlock(props)).toEqual(expected)
        });
    });


    describe.skip('findNextBlock()', () => {

    });




    describe.skip('engine()', () => {});
});
