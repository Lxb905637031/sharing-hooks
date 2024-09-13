/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数
 */

import { useDebounceFn } from 'sharing-hooks'
import React, { useState } from 'react'
import { Button } from 'antd'

export default () => {
  const [value, setValue] = useState(0)

  const { run } = useDebounceFn(
    () => {
      setValue((v) => v + 1)
    },
    {
      wait: 500
    }
  )

  return (
    <>
      <p style={{ marginTop: 16 }}>Click count: { value }</p>
      <Button
        onClick={run}
      >
        Click fast!!!
      </Button>
    </>
  )
}
