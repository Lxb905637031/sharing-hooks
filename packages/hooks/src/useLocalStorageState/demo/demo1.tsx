/**
 * title: 将 state 存储在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React from 'react'
import { useLocalStorageState } from 'sharing-hooks'
import { Input, Button } from 'antd'

export default () => {
  const [message, setMessage] = useLocalStorageState<string>('useLocalStorageStateDemo1', {
    defaultValue: 'hello world'
  })

  return (
    <>
      <Input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
       />
       <Button
          style={{
            margin: '8px'
          }}
          onClick={() => setMessage('hello world')}
       >
          Reset
       </Button>
       <Button
          style={{
            margin: '8px'
          }}
          onClick={() => setMessage(undefined)}
       >
          Clear
       </Button>
    </>
  )
}
