
 import React, { useState, useRef } from 'react'
 import { useLongPress } from 'sharing-hooks'
 import { Button } from 'antd'
 
 export default () => {
   const [pressCount, setpressCount] = useState(0)
   const [clickCount, setClickCount] = useState(0)
   const ref = useRef(null)
 
   useLongPress(
    () => {
      setpressCount(c => c + 1)
    }, 
    ref,
    {
      onClick: () => {
        setClickCount((c) => c + 1)
      }
    }
  )
 
   return (
     <div>
       <Button ref={ref}>
         Press me
       </Button>
       <p>pressCount: { pressCount }</p>
       <p>clickCount: { clickCount }</p>
     </div>
   )
 }
 