import type { Meta, StoryObj } from '@storybook/react';

import { PersonIcon } from '../components/PersonIcon/PersonIcon';

const meta = {
    title: 'Common/PersonIcon',
    component: PersonIcon,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        id: '1,2,3',
    },
} satisfies Meta<typeof PersonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        id: '1,2,3',
    },
};

export const Failed: Story = {
    args: {
        id: '1,2,22',
    },
};
