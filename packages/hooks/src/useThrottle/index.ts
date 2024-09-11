import useThrottleFn from '../useThrottleFn'
import { useEffect, useState } from 'react'

interface Options {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

function useThrottle<T>(value: T, options: Options) {
  const [throttleVal, setThrottleVal] = useState(value)

  const { run } = useThrottleFn(() => {
    setThrottleVal(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return throttleVal
}

export default useThrottle
