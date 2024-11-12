'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import NotaSelect from '@/components/NotaSelect';
import type { ChatModels } from '@/models';
import { getTransformSelectOption } from '@/utils/form';
import { DEFAULT_CHAT_MODEL } from '@/constants';

interface Props {
    data: ChatModels;
}

export default function ChatModelSelect(props: Props) {
    const { data } = props;
    const params = useParams<{ chat_id: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const options = getTransformSelectOption(data.data, 'chat_model_name', 'chat_model_id');
    const currentModel = searchParams.get('model') ?? DEFAULT_CHAT_MODEL.chat_model_id;
    const isNewChatPage = !params.chat_id;

    const handleSelect = (value: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('model', value);
        const newUrl = `/?${newSearchParams.toString()}`;

        if (isNewChatPage) {
            router.replace(newUrl);
        } else {
            router.push(newUrl);
        }
    };

    return (
        <div className="header-chat-model-select">
            <NotaSelect
                onValueChange={handleSelect}
                options={options}
                defaultValue={currentModel}
                value={currentModel}
                placeholder="모델을 선택해주세요"
            />
        </div>
    );
}
