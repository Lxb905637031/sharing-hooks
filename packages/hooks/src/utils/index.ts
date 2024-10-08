export const isFunction = (value: unknown): value is (...args) => any => typeof value === 'function'

export const isString = (value: unknown): value is string => typeof value === 'string'

export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined'

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
