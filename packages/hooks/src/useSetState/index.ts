import { useCallback, useState } from 'react'
import { isFunction } from '../utils'

export type SetState<S extends Record<string, any>> = <K extends keyof S>(state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | null | S)) => void

const useSetState =  <S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>] => {
  const [state, setState] = useState(initialState)

  // patch 传的形参
  const setMergeState = useCallback((patch) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch
      return newState ? { ...prevState, ...newState } : prevState
    })
  }, [])

  return [state, setMergeState]
}

export default useSetState
