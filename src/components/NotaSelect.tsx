'use client';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/select';
import * as React from 'react';

interface Props {
    options: (string | { label: string; value: string })[];
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    onChange?: React.ComponentProps<typeof Select>['onValueChange'];
}

export default function NotaSelect(props: Props) {
    const { options, label, defaultValue, placeholder, onChange } = props;

    return (
        <Select defaultValue={defaultValue} onValueChange={onChange}>
            <SelectTrigger className="select-trigger gap-1 break-all text-primary-foreground border-0">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="select-content bg-primary text-primary-foreground">
                <SelectGroup>
                    {label && <SelectLabel>{label}</SelectLabel>}
                    {options.map((option) => {
                        let label = '';
                        let value = '';
                        if (typeof option === 'string') {
                            label = option;
                            value = option;
                        } else {
                            label = option.label;
                            value = option.value;
                        }
                        return (
                            <SelectItem
                                key={value}
                                value={value}
                                className="cursor-pointer focus:bg-primary-focus focus:text-primary-foreground"
                            >
                                {label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
