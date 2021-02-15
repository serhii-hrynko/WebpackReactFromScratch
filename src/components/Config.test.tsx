import React from 'react';
import { create } from 'react-test-renderer';
import Config from './Config';

describe('Config.tsx', () => {
    test('Config snapshot', () => {
        const component = create(<Config />);

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
