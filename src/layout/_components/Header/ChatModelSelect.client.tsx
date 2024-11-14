'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import NotaSelect from '@/components/NotaSelect';
import type { ChatModels } from '@/layout/_models';
import { getTransformSelectOption } from '@/utils/form';

interface Props {
    data: ChatModels;
}

export default function ChatModelSelect(props: Props) {
    const {
        data: { data },
    } = props;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const options = getTransformSelectOption(data, 'chat_model_name', 'chat_model_id');
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const defaultChatModelId = data[0]?.chat_model_id;
    const currentModelId = searchParams.get('model');

    const handleSelect = (value: string) => {
        newSearchParams.set('model', value);
        const newUrl = `/?${newSearchParams.toString()}`;
        router.push(newUrl);
    };

    useEffect(() => {
        const isInvalidChatModelId = !currentModelId || !data.some((model) => model.chat_model_id === currentModelId);

        if (isInvalidChatModelId && defaultChatModelId) {
            newSearchParams.set('model', defaultChatModelId);
            router.replace(`${pathname}?${newSearchParams.toString()}`);
        }
    }, [currentModelId, data]);

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
