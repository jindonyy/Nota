'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import NotaSelect from '@/components/NotaSelect';
import { DEFAULT_CHAT_MODEL } from '@/constants';
import type { ChatModels } from '@/models';
import { getFormattedSelectOption } from '@/utils/form';

interface Props {
    data: ChatModels;
}

export default function ChatModelSelect(props: Props) {
    const { data } = props;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();
    const options = getFormattedSelectOption(data.data, 'chat_model_name', 'chat_model_id');
    const currentModel = searchParams.get('model') ?? DEFAULT_CHAT_MODEL.chat_model_id;

    const handleSelect = (value: string) => {
        params.set('model', value);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="header-chat-model-select">
            <NotaSelect onChange={handleSelect} options={options} defaultValue={currentModel} />
        </div>
    );
}
