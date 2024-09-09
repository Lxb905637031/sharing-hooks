import React, { useState, useCallback } from 'react'
import { message, Button } from 'antd'
import { useMemoizedFn } from 'sharing-hooks'

export default () => {
  const [count, setCount] = useState(0)

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`)
  }, [count])

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`)
  })

  return (
    <>
      <p>count: {count}</p>
      <Button onClick={() => { setCount((c) => c + 1) }}>
        Add Count
      </Button>
      <div style={{ marginTop: 8 }}>
        <Button
          onClick={callbackFn}
        >
          call callbackFn
        </Button>
        <Button 
          style={{ marginLeft: 8 }}
          onClick={memoizedFn}
        >
          call memoizedFn
        </Button>
      </div>
    </>
  )
}
