/**
 * title: 基础用法
 * desc: 请点击按钮或按钮外查看效果。
 */

import React, { useState, useRef } from 'react'
import { useClickAway } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLButtonElement>(null)

  useClickAway(() => {
    setCount((c) => c + 1)
  }, ref)

  return (
    <div>
      <Button ref={ref}>
        box
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
