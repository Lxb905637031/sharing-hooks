/**
 * title.zh-CN: 自定义转换函数
 * desc.zh-CN: 只能输入数字的 input 组件
 */

import React from 'react'
import { useEventTarget } from 'sharing-hooks'
import { Input, Button } from 'antd'

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    initialValue: '',
    transformer: (value: string) => value.replace(/[^\d]/g, '')
  })

  return (
    <div>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Only type number here"
      />
      <Button
        onClick={reset}
        style={{ marginTop: 10}}
      >
        reset
      </Button>
    </div>
  )
}
