import { useUpdate } from 'sharing-hooks'
import { Button } from 'antd'
import React from 'react'

export default () => {
  const update = useUpdate()

  return (
    <>
      <div>Time: { Date.now() }</div>
      <Button style={{ marginTop: 8}} onClick={update}>
        update
      </Button>
    </>
  )
}
