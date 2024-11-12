export const getTransformSelectOption = <T extends Record<keyof T, string | number>>(
    data: T[],
    labelKey: keyof T,
    valueKey: keyof T,
) => {
    return data.map((item) => {
        if (!item[labelKey] || !item[valueKey]) throw Error('Check the labelKey, valueKey.');

        return {
            label: item[labelKey],
            value: item[valueKey].toString(),
        };
    });
};

export const getTransformObject = <T extends Record<keyof T, unknown>>(data: T, keys: [keyof T, string][]) => {
    return keys.reduce<Record<string, T[keyof T]>>((acc, [from, to]) => {
        if (!data[from]) throw Error(`Check the ${String(from)} key.`);

        acc[to] = data[from];
        return acc;
    }, {});
};
