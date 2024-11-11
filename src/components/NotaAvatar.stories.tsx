import type { Meta, StoryObj } from '@storybook/react';

import NotaAvatar from '@/components/NotaAvatar';

const meta = {
    title: 'Avatar',
    component: NotaAvatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        imageSrc: { control: 'text' },
        fallback: { control: 'text' },
        size: { control: 'select', options: ['default', 'sm', 'lg'] },
    },
    args: {},
} satisfies Meta<typeof NotaAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
    args: {
        imageSrc: 'https://github.com/shadcn.png',
        fallback: 'user',
        size: 'default',
    },
};
