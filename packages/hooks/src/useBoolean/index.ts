import { useMemo } from 'react'
import useToggle from '../useToggle'

export interface Actions {
  toggle: () => void;
  set: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

export default function useBoolean(defaultValue?: boolean): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(!!defaultValue)

  const actions: Actions = useMemo(() => {
    const setTrue = () => set(true)
    const setFalse = () => set(false)

    return {
      setTrue,
      setFalse,
      set: (v) => set(!!v),
      toggle
    }
  }, [])

  return [
    state,
    actions
  ]
}
