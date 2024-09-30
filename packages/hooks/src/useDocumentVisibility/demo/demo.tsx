/**
 * title: 基础用法
 * desc: 监听 document 的可见状态
 */

import React, { useEffect } from 'react'
import { useDocumentVisibility } from 'sharing-hooks'
import { message } from 'antd'

export default () => {
  const documentVisibility = useDocumentVisibility()

  useEffect(() => {
    message.info(`Current document visibility state: ${documentVisibility}`)
  }, [documentVisibility])

  return <>Current document visibility state: {documentVisibility}</>
}
