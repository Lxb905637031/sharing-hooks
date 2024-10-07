/**
 * title: 基础用法
 * desc: 请长按按钮查看效果。
 */

import React, { useState, useRef } from 'react'
import { useLongPress } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useLongPress(() => {
    setCount(c => c + 1)
  }, ref)

  return (
    <div>
      <Button ref={ref}>
        Press me
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
