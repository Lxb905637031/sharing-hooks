/**
 * title.zh-CN: 基础用法
 */

import { useMutationObserver } from 'sharing-hooks'
import React, { useRef, useState } from 'react'
import { Button } from 'antd'

export default () => {
  const [width, setWidth] = useState(200)
  const [count, setCount] = useState(0)

  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(
    (mutationList) => {
      mutationList.forEach(() => {
        setCount(c => c + 1)
      })
    },
    ref,
    { attributes: true }
  )

  return (
    <div>
      <div
        ref={ref}
        style={{
          width,
          padding: 12,
          border: '1px solid #000', 
          marginBottom: 8
        }}
      >
        curren width: { width }
      </div>
      <Button
        onClick={() => setWidth(w => w + 10 )}
      >
        widening
      </Button>
      <p>Mutation count { count }</p>
    </div>
  )
}
