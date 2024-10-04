/**
 * title: 支持传入多个事件名称
 * desc: 设置了多个事件，你可以试试用鼠标左键或者右键。
 */

import React, { useState, useRef } from 'react'
import { useClickAway } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLButtonElement>(null)

  useClickAway(
    () => {
      setCount((c) => c + 1)
    }, 
    ref,
    ['contextmenu', 'click']
  )

  return (
    <div>
      <Button ref={ref}>
        box
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
 