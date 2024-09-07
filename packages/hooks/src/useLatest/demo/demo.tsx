import React, { useState, useEffect } from 'react'
import { useLatest } from 'sharing-hooks'

export default () => {
  const [count, setCount] = useState<number>(0)

  const latestCountRef = useLatest(count)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <span>count: { count }</span>
    </>
  )
}
