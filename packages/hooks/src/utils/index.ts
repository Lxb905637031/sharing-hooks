export const isFunction = (value: unknown): value is (...args) => any => typeof value === 'function'
