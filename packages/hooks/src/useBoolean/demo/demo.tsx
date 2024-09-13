/**
 * title: 基础用法
 * desc: 切换 boolean，可以接收默认值。
 */

import React from 'react'
import { Button } from 'antd'

import { useBoolean } from 'sharing-hooks'

export default () => {

  const [state, { toggle, setTrue, setFalse }] = useBoolean(true)

  return (
    <div>
      <div>State: {`${state}`}</div>
      <br />
      <div>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setTrue} style={{margin: '0 10px'}}>Set true</Button>
        <Button onClick={setFalse}>Set false</Button>
      </div>
    </div>
  )
}
