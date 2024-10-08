import React, { useEffect } from 'react'
import { useRafState } from 'sharing-hooks'

export default () => {
  const [state, setState] = useRafState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const onResize = () => {
      setState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    }
    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  },[])

  return (
    <div>
      <p>Try to resize the window</p>
      current: {JSON.stringify(state)}
    </div>
  )
}
