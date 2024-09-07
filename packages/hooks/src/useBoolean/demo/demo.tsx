import React from 'react'
import { Button } from 'antd'

import { useBoolean } from 'sharing-hooks'

export default () => {

  const [state, { toggle, setTrue, setFalse }] = useBoolean(true)

  return (
    <div>
      <div>State: {`${state}`}</div>
      <br />
      <div>
        <Button onClick={toggle}>Toggle</Button>
        <Button onClick={setTrue} style={{margin: '0 10px'}}>Set true</Button>
        <Button onClick={setFalse}>Set false</Button>
      </div>
    </div>
  )
}
