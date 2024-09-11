import { throttle } from 'lodash-es'
import useLatest from '../useLatest'
import useUnmount from '../useUnmount'
import { isFunction } from '../utils'
import isDev from '../utils/isDev'
import { useMemo } from 'react'

interface Options {
  leading?: boolean;
  trailing?: boolean;
  wait?: number
}

interface Result {
  run: () => void;
  cancel: () => void;
  flush: () => void;
}

type noop = (...args: any[]) => any

function useThrottleFn<T extends noop>(fn: T, options?: Options): Result {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`)
    }
  }

  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const throttled = useMemo(() => {
    return throttle(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      }, 
      wait,
      options
    )
  },[])

  const { cancel, flush } = throttled

  useUnmount(() => {
    cancel()
  })

  return {
    run: throttled,
    cancel,
    flush
  }
}

export default useThrottleFn
