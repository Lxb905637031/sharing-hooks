/**
 * title: setState 可以接收函数
 * desc: useCookieState 的 setState 可以接收 function updater，就像 useState 那样。
 */

import React from 'react'
import { useCookieState } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [value, setValue] = useCookieState('useCookieStateUpdater',
  {
    defaultValue: '0'
  })

  return (
    <>
      <p>{ value }</p>
      <Button
        style={{
          marginRight: 16
        }}
        onClick={() => setValue((v) => String(Number(v) + 1))}
      >
        +
      </Button>
      <Button
        style={{
          marginRight: 16
        }}
        onClick={() => setValue((v) => String(Number(v) - 1))}
      >
        -
      </Button>
      <Button
        style={{
          marginRight: 16
        }}
        onClick={() => setValue('0')}
      >
        reset
      </Button>
    </>
  )
}
