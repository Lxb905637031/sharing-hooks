import React, { useState } from 'react'
import { useThrottle } from 'sharing-hooks'
import { Input } from 'antd'

export default () => {
  const [value, setValue] = useState('')
  const throttleVal = useThrottle(value, { wait: 500 })

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <p style={{ marginTop: 16 }}>throttleVal: { throttleVal }</p>
    </div>
  )
}
