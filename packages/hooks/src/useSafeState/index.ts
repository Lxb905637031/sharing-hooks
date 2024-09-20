import { useCallback, useState } from 'react'
import type { Dispath, SetStateAction } from 'react'
import useUnmountedRef from '../useUnmountedRef'

function useSafeState<S>(initialState: S | (() => S)): [S, Dispath<SetStateAction<S>>]

function useSafeState<S = undefined>(): [S | undefined, Dispath<SetStateAction<S | undefined>>]

function useSafeState<S>(initalState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef()
  const [state, setState] = useState(initalState)

  const setCurrentState = useCallback((currentState) => {
    if (unmountedRef.current) return

    setState(currentState)
  }, [])

  return [state, setCurrentState] as const
}

export default useSafeState
