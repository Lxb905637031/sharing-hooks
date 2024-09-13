/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会每隔 500ms 执行一次相关函数。
 */

import React, { useState } from 'react'
import { useThrottleFn } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [value, setValue] = useState(0)
  const { run } = useThrottleFn(() => {
    setValue(value + 1)
  }, {
    wait: 500
  })

  return (
    <div>
      <p style={{ marginTop: 16}}>Click count: { value }</p>
      <Button onClick={run}>Click fast!!!</Button>
    </div>
  )
}