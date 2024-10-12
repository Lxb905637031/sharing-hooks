/**
 * title: 确保实例不会被重复创建
 * desc: 点击 "Rerender" 按钮，触发组件的更新，但 Foo 的实例会保持不变
 */

import React, { useState } from 'react'
import { useCreation } from 'sharing-hooks'
import { Button } from 'antd'

class Foo {
  data: number

  constructor() {
    this.data = Math.random()
  }
}

export default function () {
  const foo = useCreation(() => new Foo(), [])
  const [, setFlag] = useState({})

  return (
    <>
      <p>{foo.data}</p>
      <Button
        onClick={() => {
          setFlag({})
        }}
      >
        Rerender
      </Button>
    </>
  )
}