/**
 * title: 在任意两个值之间切换
 * desc: 接受两个可选参数，在它们之间进行切换。
 */

import React from 'react'
import { Button } from 'antd'

import { useToggle } from 'sharing-hooks'

export default () => {

  const [state, {toggle, setLeft, setRight, set}] = useToggle('Hello', 'World')

  return (
    <div>
      <div>State: {`${state}`}</div>
      <br />
      <div>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setLeft} style={{margin: '0 10px'}}>Set Left</Button>
        <Button onClick={setRight}>Set Right</Button>
        <Button onClick={() => set('Hello')} style={{margin: '0 10px'}}>Set Hello</Button>
        <Button onClick={() => set('World')}>Set World</Button>
      </div>
    </div>
  )
}
