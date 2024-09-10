import { sleep } from '../../utils/testingHelper'
import { renderHook, act } from '@testing-library/react'
import useDebounceFn from '..'

interface ParamsObj {
  fn: (...arg: any) => any;
  deps?: any[];
  wait: number;
}

let count = 0
const debouncedFn = (gap: number) => {
  count += gap
}

const setUp = ({ fn, wait }: ParamsObj) => renderHook(() => useDebounceFn(fn, { wait }))

let hook

describe('useDebounceFn', () => {
  it('run, cancel and flush should work', async () => {
    act(() => {
      hook = setUp({
        fn: debouncedFn,
        wait: 200
      })
    })
    await act(async () => {
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      hook.result.current.run(2)
      expect(count).toBe(0)
      await sleep(300)
      expect(count).toBe(2)

      hook.result.current.run(4)
      expect(count).toBe(2)
      await sleep(300)
      expect(count).toBe(6)

      hook.result.current.run(4)
      expect(count).toBe(6)
      hook.result.current.cancel()
      expect(count).toBe(6)
      await sleep(300)
      expect(count).toBe(6)

      hook.result.current.run(1)
      expect(count).toBe(6)
      hook.result.current.flush()
      expect(count).toBe(7)
      await sleep(300)
      expect(count).toBe(7)
    })
  })
})
