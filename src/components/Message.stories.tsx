import type { Meta, StoryObj } from '@storybook/react';

import Message from '@/components/Message';

const meta = {
    title: 'Message',
    component: Message,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        hasProfile: { control: 'boolean' },
        profileImageUrl: { control: 'text' },
        profileFallback: { control: 'text' },
        profilePosition: { control: 'radio', options: ['left', 'right'] },
    },
    args: {},
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageWithAvatar: Story = {
    args: {
        text: 'Heeeeeello!',
        hasProfile: true,
        profileImageUrl:
            'https://static.wixstatic.com/media/6ee621_46b49dcb2b1e4bb8aa12c802e71492b0~mv2.png/v1/fill/w_210,h_210,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Nota%20AI_YouTube%20profile_4_edited.png',
    },
};
