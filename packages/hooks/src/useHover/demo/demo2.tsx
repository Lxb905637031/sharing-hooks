/**
 * title: 传入 DOM 元素
 * desc: 传入 function 并返回一个 dom 元素。
 */

import React from 'react'
import { useHover } from 'sharing-hooks'
import { message } from 'antd'

export default () => {
  const isHover = useHover(() => document.getElementById('hover-div'), {
    onEnter: () => {
      message.info('onEnter')
    },
    onLeave: () => {
      message.info('onLeave')
    },
    onChange:(isHover) => {
      message.info(`onChange: ${isHover}`)
    }
  })

  return (
    <div id="hover-div">
      { isHover ? 'hover' : 'leaveHover'}
    </div>
  )
}
