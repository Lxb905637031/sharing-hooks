import React from 'react'
import { useResetState } from 'sharing-hooks'
import { Button } from 'antd'

interface State {
  hello: string;
  count: number;
}

export default () => {
  const [state, setState, resetState] = useResetState<State>({
    hello: '',
    count: 0
  })

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <Button
          style={{ marginRight: 8}}
          onClick={() => setState({ hello: 'world', count: Math.random()})}
        >
          set hello and count
        </Button>
        <Button
          style={{ marginRight: 8}}
          onClick={resetState}
        >
          resetState
        </Button>
      </p>
    </div>
  )
}
