import React from 'react';
import { act, create } from 'react-test-renderer';
import Counter from './Counter';

describe('components/Counter.tsx', () => {
    test('Counter snapshot', () => {
        const component = create(<Counter />);

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Counter unit', () => {
        const component = create(<Counter />);

        const codeElement = component.root.findByType('code');
        const getCodeElementText = () => codeElement.children[0];

        expect(getCodeElementText()).toBe('0');

        const incrementButton = component.root.find((node) => node.children[0] === 'Increment');
        act(() => {
            incrementButton.props.onClick();
        });
        expect(getCodeElementText()).toBe('1');

        const decrementButton = component.root.find((node) => node.children[0] === 'Decrement');
        act(() => {
            decrementButton.props.onClick();
            decrementButton.props.onClick();
        });
        expect(getCodeElementText()).toBe('-1');
    });
});
