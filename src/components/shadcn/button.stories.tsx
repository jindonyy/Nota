import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { BsPencilSquare } from 'react-icons/bs';

import { Button } from './button';

const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'ghost', 'link'] },
        size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'default',
        children: 'Button',
        size: 'lg',
        asChild: false,
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Button',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Button',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Button',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Link',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        variant: 'outline',
        children: 'Large',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        variant: 'outline',
        children: 'Small',
    },
};

export const Icon: Story = {
    args: {
        size: 'icon',
        children: <BsPencilSquare />,
    },
};
