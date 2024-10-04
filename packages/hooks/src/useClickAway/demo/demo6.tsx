/**
 * title: 支持 shadow DOM
 * desc: 将 addEventListener 添加到 shadow DOM root
 */

import React, { useState, useRef } from 'react'
import { useClickAway } from 'sharing-hooks'
import { Button } from 'antd'
import root from 'react-shadow'

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
    <root.div>
      <div>
        <Button ref={ref}>
          box
        </Button>
        <p>counter: { count }</p>
      </div>
    </root.div>
  )
}
  