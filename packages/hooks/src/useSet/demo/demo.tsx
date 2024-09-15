import React from 'react'
import { useSet } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [set, { add, remove, reset }] = useSet(['hello'])

  return (
    <div>
      <Button onClick={() => {
        console.log(typeof String(Date.now()))
        add(String(Date.now()))
       }}>Add Timestamp</Button>
      <Button onClick={() => remove('hello')} disabled={!set.has('hello')} style={{ margin: '0 8px' }}>Remove hello</Button>
      <Button onClick={() => reset() } style={{ margin: '0 8px' }}>Reset</Button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  )

}
