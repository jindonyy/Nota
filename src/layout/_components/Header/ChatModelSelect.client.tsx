'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import NotaSelect from '@/components/NotaSelect';
import type { ChatModels } from '@/models';
import { getTransformSelectOption } from '@/utils/form';
import { useEffect } from 'react';

interface Props {
    data: ChatModels;
}

export default function ChatModelSelect(props: Props) {
    const {
        data: { data },
    } = props;
    const pathname = usePathname();
    const params = useParams<{ chat_id: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const options = getTransformSelectOption(data, 'chat_model_name', 'chat_model_id');
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const defaultChatModelId = data[0]?.chat_model_id;
    const currentModelId = searchParams.get('model');
    const isNewChatPage = !params.chat_id;

    const handleSelect = (value: string) => {
        newSearchParams.set('model', value);
        const newUrl = `/?${newSearchParams.toString()}`;

        if (isNewChatPage) {
            router.replace(newUrl);
        } else {
            router.push(newUrl);
        }
    };

    useEffect(() => {
        const isInvalidChatModelId = !currentModelId || !data.some((model) => model.chat_model_id === currentModelId);

        if (isInvalidChatModelId && defaultChatModelId) {
            newSearchParams.set('model', defaultChatModelId);
            router.replace(`${pathname}?${newSearchParams.toString()}`);
        }
    }, [currentModelId]);

    return (
        <div className="header-chat-model-select">
            <NotaSelect
                onValueChange={handleSelect}
                options={options}
                defaultValue={defaultChatModelId}
                value={currentModelId ?? undefined}
                placeholder="모델을 선택해주세요"
            />
        </div>
    );
}
