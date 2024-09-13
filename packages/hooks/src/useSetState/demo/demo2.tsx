import React from 'react'
import { useSetState } from 'sharing-hooks'
import { Button } from 'antd'

interface State {
  hello: string;
  count: number;
}

export default () => {
  const [state, setState] = useSetState<State>({
    hello: 'world',
    count: 0
  })

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <Button onClick={() => {
          setState((prevState) => ({ count: prevState.count + 1 }))
        }}>
          count + 1
        </Button>
      </p>
    </div>
  )
}
