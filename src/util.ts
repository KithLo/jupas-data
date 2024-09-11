export function memoize<T extends (arg: any) => any>(func: T): T {
    const cache = new WeakMap()

    const fn: any = (arg: any): any => {
        if (cache.has(arg)) {
            return cache.get(arg)
        } else {
            const result = func(arg)
            cache.set(arg, result)
            return result
        }
    }

    return fn
}
