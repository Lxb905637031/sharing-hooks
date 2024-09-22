import { useState } from 'react'
import useMemoizedFn from '../useMemoizedFn'
import useUpdateEffect from '../useUpdateEffect'
import { isFunction, isUndef } from '../utils'
import { message } from 'antd'

 export type SetState<S> = S | ((prevState?: S) => S)

 export interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
 }

export function createUseStorageState(getStorage: () => Storage | undefined) {
  function useStorageState<T>(key: string, options: Options<T> = {}) {
    let storage: Storage | undefined
    const {
      onError = (e: any) => {
        message.error(e)
      }
    } = options

    try {
      storage = getStorage()
    } catch (err) {
      onError(err)
    }

    // 序列化
    const serializer = (value: T) => {
      if (options.serializer) {
        return options.serializer(value)
      }

      return JSON.stringify(value)
    }

    // 反序列化
    const deserializer = (value: string) => {
      if (options.deserializer) {
        return options.deserializer(value)
      }

      return JSON.parse(value)
    }

    function getStorageValue() {
      try {
        const raw = storage?.getItem(key)

        if (raw) {
          return deserializer(raw)
        }
      } catch (e) {
        onError(e)
      }

      if (isFunction(options.defaultValue)) {
        return options.defaultValue()
      }

      return options.defaultValue
    }

    const [state, setState] = useState(getStorageValue)

    useUpdateEffect(() => {
      setState(getStorageValue())
    }, [key])

    const updateState = (value?: SetState<T>) => {
      const currentState = isFunction(value) ? value(state) : value
      setState(currentState)

      if (isUndef(currentState)) {
        // remove 操作
        storage?.removeItem(key)
      } else {
        try {
          storage?.setItem(key, serializer(currentState))
        } catch (e) {
          onError(e)
        }
      }
    }

    return [
      state,
      useMemoizedFn(updateState)
    ] as const
  }

  return useStorageState
}
