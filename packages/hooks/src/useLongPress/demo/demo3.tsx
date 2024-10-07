/**
 * title: 超出移动阈值
 * desc: 超出移动阈值之后，长按事件将不会触发
 */
 import React, { useState, useRef } from 'react'
 import { useLongPress } from 'sharing-hooks'
 import { Button } from 'antd'

 export default () => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useLongPress(() => {
    setCount(c => c + 1)
  }, ref, {
    moveThreshold: {
      x: 30
    }
  })

  return (
    <div>
      <Button ref={ref}>
        Press me
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
