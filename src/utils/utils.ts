// TODO интерфейсы
export const classNames = (...args: string[] | any): string => {
    if (args[0] && args[0].toString() === '[object Object]') {
        const classObj = args[0];
        const classList = args[1];
        const baseClass = args[2];

        return classList
            .split(' ')
            // @ts-ignore
            .map(className => classObj[`${baseClass}__${className}`])
            // @ts-ignore
            .filter(i => !!i)
            .join(' ');
    }

    // @ts-ignore
    return args.filter(i => !!i).join(' ');
};
