import { useSafeState } from 'sharing-hooks'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

const Child = () => {
  const [value, setValue] = useSafeState()

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server')
    }, 5000)
  }, [])

  return <div>{ value || 'Loading...' }</div>
}

export default () => {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <Button onClick={() => setVisible(false)} >unMount</Button>
      { visible && <Child /> }
    </div>
  )
}