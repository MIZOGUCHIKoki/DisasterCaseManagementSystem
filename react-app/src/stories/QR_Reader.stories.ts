import type { Meta, StoryObj } from '@storybook/react';

import QR_Reader from '../components/QR_Reader/QR_Reader';

const meta = {
    title: 'Common/QR_Reader',
    component: QR_Reader,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onQRCodeDetected: (result: string | null) => {
            console.log(result);
        },

    },
} satisfies Meta<typeof QR_Reader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QRReaderStory: Story = {
    args: {
        onQRCodeDetected: (result: string | null) => {
            console.log(result);
        },
    },
};
