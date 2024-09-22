/**
 * title: 存储数组或对象等复杂类型
 * desc: useLocalStorageState 会自动处理序列化和反序列化的操作。
 */

 import React from 'react'
 import { useLocalStorageState } from 'sharing-hooks'
 import { Button } from 'antd'

 export default () => {
  const [value, setValue] = useLocalStorageState(
    'useLocalStorageStateDemo2',
    {
      defaultValue: ['a', 'e', 'i', 'o', 'u']
    }
  )

  return (
    <>
      <p>{ value?.join('-') }</p>
      <Button
        style={{ marginRight: '16px' }}
        onClick={() => {
          setValue([
            ...value,
            new Date().getTime()
          ])
        }}
      >
        push random
      </Button>
      <Button
        onClick={() => {
          setValue([
            'a', 'e', 'i', 'o', 'u'
          ])
        }}
      >
        reset
      </Button>
    </>
  )
 }
