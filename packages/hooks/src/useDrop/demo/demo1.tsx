/**
 * title: 基础用法
 * desc: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */

import React, { useRef, useState } from 'react'
import { useDrop, useDrag } from 'sharing-hooks'
import { message } from 'antd'

const DragItem = ({ data }) => {
  const dragRef = useRef(null)

  const [dragging, setDragging] = useState(false)

  useDrag(data, dragRef, {
    onDragStart: () => {
      setDragging(true)
    },
    onDragEnd: () => {
      setDragging(false)
    }
  })

  return (
    <div
      ref={ dragRef }
      style={{
        border: '1px solid #e8e8e8',
        padding: 16,
        width: 80,
        textAlign: 'center',
        marginRight: 16,
      }}
    >
      { dragging ? 'dragging' : `box-${data}` }
    </div>
  )
}

export default () => {
  const [isHovering, setIsHoving] = useState(false)

  const dropRef = useRef(null)

  useDrop(dropRef, {
    onText: (text) => {
      message.info(`'text: ${text}' dropped`)
    },
    onDragEnter: () => {
      setIsHoving(true)
    },
    onDragLeave: () => {
      setIsHoving(false)
    }
  })

  return (
    <div>
      <div
        ref={dropRef}
        style={{
          border: '1px dashed #e8e8e8', 
          padding: 16, 
          textAlign: 'center'
        }}
      >
        {isHovering ? 'release here' : 'drop here'}
      </div>

      <div style={{
        display: 'flex',
        marginTop: 8
      }}>
        {
          [1, 2, 3, 4, 5].map((e) => {
            return (
              <DragItem
                key={ e }
                data={ e }
              />
            )
          })
        }
      </div>
    </div>
  )
}