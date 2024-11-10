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

const sizes = {
    default: '180px',
    sm: '150px',
    lg: '220px',
};

interface Props<T> {
    options: (T | { label: string; value: T })[];
    defaultValue?: T;
    label?: string;
    placeholder?: string;
    size?: keyof typeof sizes;
    onChange?: () => void;
}

export default function NotaSelect<T extends string>(props: Props<T>) {
    const { options, label, defaultValue, placeholder, size = 'default', onChange } = props;

    return (
        <Select defaultValue={defaultValue} onValueChange={onChange}>
            <SelectTrigger className={`w-[${sizes[size]}]`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
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
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
