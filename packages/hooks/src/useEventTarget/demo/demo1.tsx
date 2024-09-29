/**
 * title: 基础用法
 * desc: 受控的 input，支持 reset。
 */

import React from 'react'
import { useEventTarget } from 'sharing-hooks'
import { Button, Input } from 'antd'

export default () => {
  const [value, { reset, onChange }] = useEventTarget({
    initialValue: 'This is initial value'
  })

  return (
    <div>
      <Input value={value} onChange={onChange} />
      <Button onClick={reset} style={{ marginTop: 10 }}>reset</Button>
    </div>
  )
}
