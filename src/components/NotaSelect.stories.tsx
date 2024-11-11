import type { Meta, StoryObj } from '@storybook/react';

import NotaSelect from '@/components/NotaSelect';

const meta = {
    title: 'Select',
    component: NotaSelect,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        defaultValue: { control: 'text' },
        placeholder: { control: 'text' },
    },
    args: {},
} satisfies Meta<typeof NotaSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
    args: {
        options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Grape', value: 'grape' },
            { label: 'Orange', value: 'orange ' },
        ],
        label: 'fruit',
        placeholder: 'choose fruit',
    },
};
