/**
 * title: 支持多个 DOM 对象
 * desc: 支持传入多个目标对象。
 */

import React, { useState, useRef } from 'react'
import { useClickAway } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [count, setCount] = useState(0)
  const ref1 = useRef(null)
  const ref2 = useRef(null)

  useClickAway(() => {
    setCount((c) => c + 1)
  }, [ref1, ref2])

  return (
    <div>
      <Button ref={ref1}>
        box1
      </Button>
      <Button ref={ref2} style={{ margin: '0 10px'}}>
        box2
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
