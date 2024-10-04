/**
 * title: 监听其它事件
 * desc: 通过设置 eventName，可以指定需要监听的事件，试试点击鼠标右键。
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
    'contextmenu'
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
