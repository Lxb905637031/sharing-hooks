import { useMemo } from 'react'
import useLatest from '../useLatest'
import useUnmount from '../useUnmount'
import { debounce } from '../utils/lodash-polyfill'
import isDev from '../utils/isDev'
import { isFunction } from '../utils/index'

type noop = (...args: any[]) => any

interface Options {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

interface Result {
  run: () => void;
  flush: () => void;
  cancel: () => void
}

function useDebounceFn<T extends noop>(fn: T, options?: Options): Result {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`)
    }
  }

  const fnRef = useLatest(fn)
  
  const wait = options?.wait ?? 1000

  const debounced = useMemo(() => {
    return debounce(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      },
      wait,
      options
    )
  }, [])

  useUnmount(() => {
    debounced.cancel()
  })
  
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush
  }
}

export default useDebounceFn
