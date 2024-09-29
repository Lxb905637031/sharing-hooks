/**
 * title: 基础用法
 * desc: 使用 ref 设置需要监听的元素。
 */

import React, { useRef } from 'react'
import { useHover } from 'sharing-hooks'

export default () => {
  const ref = useRef(null)
  const isHoving = useHover(ref)
  return <div ref={ref}>
    { isHoving ? 'hover' : 'leaveHover'}
  </div>
}