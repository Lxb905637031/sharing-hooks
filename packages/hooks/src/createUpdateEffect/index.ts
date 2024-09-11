import { useRef } from 'react'
import type { useEffect, useLayoutEffect } from 'react'

type EffectHookType = typeof useEffect | typeof useLayoutEffect

// 只关注更新的effect
export const createUpdateEffect: (hook: EffectHookType) => EffectHookType = (hook) => {
  return (effect, deps) => {
    const isMounted = useRef(false)

    hook(() => {
      return () => {
        isMounted.current = false
      }
    }, [])

    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true
      } else {
        return effect()
      }
    }, deps)
  }
}
