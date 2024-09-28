import { renderHook } from '@testing-library/react'
import useScroll from '..'

describe('useScroll', () => {
  it('document body', () => {
    const hook = renderHook(() => useScroll(document))
    expect(hook.result.current).toBeUndefined()
  })
})
