import React from 'react'
import { renderHook, act, render, fireEvent } from '@testing-library/react'
import useHover from '..'
import { Button } from 'antd'

describe('useHover', () => {
  it('should work', () => {
    const { getByText } = render(<Button>Hover</Button>)
    let trigger = 0
    const { result } = renderHook(() => {
      return useHover(getByText('Hover'), {
        onEnter: () => {
          trigger++
        },
        onLeave: () => {
          trigger++
        }
      })
    })

    expect(result.current).toBe(false)

    act(() => void fireEvent.mouseEnter(getByText('Hover')))
    expect(result.current).toBe(true)
    expect(trigger).toBe(1)

    act(() => void fireEvent.mouseLeave(getByText('Hover')))
    expect(result.current).toBe(false)
    expect(trigger).toBe(2)
  })
})
