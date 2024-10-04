/**
 * title: 支持传入 DOM
 * desc: 支持直接传入 DOM 对象或 function。
 */

import React, { useState } from 'react'
import { useClickAway } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [count, setCount] = useState(0)

  useClickAway(() => {
    setCount((c) => c + 1)
  }, () => document.getElementById('use-click-away-button'))

  return (
    <div>
      <Button id="use-click-away-button">
        box
      </Button>
      <p>counter: { count }</p>
    </div>
  )
}
 