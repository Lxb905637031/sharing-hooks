import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import useMemoizedFn from '../useMemoizedFn'

type ResetState = () => void

const useResetState = <S>(initalState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, ResetState] => {
  const [state, setState] = useState(initalState)

  const resetState = useMemoizedFn(() => {
    setState(initalState)
  })

  return [state, setState, resetState]
}

export default useResetState
