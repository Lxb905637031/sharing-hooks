import React from 'react'
import { Button } from 'antd'

import { useToggle } from 'sharing-hooks'

export default () => {

  const [state, {toggle, setLeft, setRight}] = useToggle()

  return (
    <div>
      <div>State: {`${state}`}</div>
      <br />
      <div>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setLeft} style={{margin: '0 10px'}}>Toggle Left</Button>
        <Button onClick={setRight}>Toggle Right</Button>
      </div>
    </div>
  )
}
