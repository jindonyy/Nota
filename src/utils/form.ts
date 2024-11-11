export const getFormattedSelectOption = <T extends Record<keyof T, string | number>>(
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
