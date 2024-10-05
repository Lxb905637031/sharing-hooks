/**
 * title: 基础用法
 * desc: 在组件首次渲染时，执行方法。
 */

import { useMount, useBoolean } from 'sharing-hooks'
import { message, Button } from 'antd'
import React from 'react'

const MyComponent = () => {
  useMount(() => {
    message.info('mount')
  })

  return <div>hello world</div>
}

export default () => {
  const [state, { toggle }] = useBoolean(false)

  return (
    <>
      <Button onClick={toggle}>{ state ? 'unmount' : 'mount' }</Button>
      { state && <MyComponent /> }
    </>
  )
}