import type { Meta, StoryObj } from '@storybook/react';

import IconComponent from '@/components/Icon';

const meta = {
    title: 'Icon',
    component: IconComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['pencil', 'send', 'up', 'down'] },
        size: { control: 'select', options: ['default', 'sm', 'lg'] },
        color: { control: 'select', options: ['primary', 'secondary'] },
    },
    args: {},
} satisfies Meta<typeof IconComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pencil: Story = {
    args: {
        variant: 'pencil',
    },
};

export const Send: Story = {
    args: {
        variant: 'send',
    },
};

export const Up: Story = {
    args: {
        variant: 'up',
    },
};

export const Down: Story = {
    args: {
        variant: 'down',
    },
};
