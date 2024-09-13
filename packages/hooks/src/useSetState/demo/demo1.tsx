/**
 * title: 基础用法
 * desc: 自动合并对象。
 */

import React from 'react'
import { useSetState } from 'sharing-hooks'
import { Button } from 'antd'

interface State {
  hello: string;
  [key: string]: any;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: ''
  })

  return (
    <div>
      <pre>{ JSON.stringify(state, null, 2) }</pre>
      <p>
        <Button onClick={() => setState({ hello: 'world'})}>set hello</Button>
        <Button style={{ marginLeft: 10 }} onClick={() => setState({ foo: 'bar' })}>set foo</Button>
      </p>
    </div>
  )
}

