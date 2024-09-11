import React, { useState } from 'react'
import { useDebounce } from 'sharing-hooks'
import { Input } from 'antd'

export default () => {
  const [value, setValue] = useState<string>('')
  const debounceVal = useDebounce(value, { wait: 500 })

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
      />
      <p style={{marginTop: 16}}>debounceVal: { debounceVal }</p>
    </div>
  )
}