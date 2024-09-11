import useDebounceFn from '../useDebounceFn'
import { useState, useEffect } from 'react'

interface Options {
  wait?: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

function useDebounce<T>(value: T, options: Options) {
  const [debounceVal, setDebounceVal] = useState(value)

  const { run } = useDebounceFn(() => {
    setDebounceVal(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return debounceVal
}

export default useDebounce
