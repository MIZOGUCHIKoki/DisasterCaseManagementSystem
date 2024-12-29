import type { Meta, StoryObj } from '@storybook/react';

import { PM_Button } from '../components/PM_Button/PM_Button';

const meta = {
    title: 'Common/PM_Button',
    component: PM_Button,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    args: {
        context: 0,
        type: false,
        onClick_plus: () => { return; },
        onClick_minus: () => { return; },
        onClick_decide: () => { return; },
    }
} satisfies Meta<typeof PM_Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
    args: {
        context: 0,
        type: false,
        onClick_plus: () => { return; },
        onClick_minus: () => { return; },
        onClick_decide: () => { return; },
    },
};
