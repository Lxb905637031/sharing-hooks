import React from 'react'
import { useMap } from 'sharing-hooks'
import { Button } from 'antd'

export default () => {
  const [
    map,
    {
      set,
      setAll,
      remove,
      reset,
      get
    }
  ] = useMap<string | number, string>([
    ['msg', 'hello world'],
    [123, 'number type']
  ])

  return (
    <div>
      <Button  onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </Button>
      <Button
        onClick={() => setAll([['text', 'this is a new Map']])}
        style={{ margin: '0 8px' }}
      >
        Set new Map
      </Button>
      <Button  onClick={() => remove('msg')} disabled={!get('msg')}>
        Remove 'msg'
      </Button>
      <Button  onClick={() => reset()} style={{ margin: '0 8px' }}>
        Reset
      </Button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
}