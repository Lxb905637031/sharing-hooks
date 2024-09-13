/**
 * title: 基础用法
 * desc: 在组件卸载时，执行函数。
 */

import { useBoolean, useUnmount } from 'sharing-hooks'
import { message, Button } from 'antd'
import React from 'react'

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount')
  })

  return <p>Hello World </p>
}

export default () => {
  const [state, { toggle }] = useBoolean(true)

  return (
    <>
      <Button onClick={ toggle }>
        { state ? 'unmount' : 'mount' }
      </Button>
      { state && <MyComponent /> }
    </>
  )
}