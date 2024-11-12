import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/select';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof Select> {
    options: (string | { label: string; value: string })[];
    label?: string;
    placeholder?: string;
}

export default function NotaSelect(props: Props) {
    const { options, label, placeholder, ...rest } = props;

    return (
        <Select {...rest}>
            <SelectTrigger className="select-trigger gap-1 break-all text-primary-foreground border-0">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="select-content bg-primary text-primary-foreground z-select">
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
